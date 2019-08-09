import React from 'react'
import * as d3 from 'd3'
import EmptyList from '../EmptyList'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/styles'
import * as _isEqual from 'lodash.isequal'
import { CURRENCY, resolveCurrencyValue } from '../../../data/resolvers'


const style = theme => {
  const greyBorder = `1px solid ${theme.palette.grey[200]}`
  return {
    root: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      overflowX: 'hidden',
    },
    svg: {
      width: '100%',
      userSelect: 'none',
      backgroundColor: theme.palette.background.paper,
      borderTop: greyBorder,
      borderBottom: greyBorder,
      padding: theme.spacing(4,0),
      overflow: 'visible',
    },
    tickX: {
      fontSize: theme.spacing(2),
      color: theme.palette.text.secondary,
    },
    tick_noline: {
      '& line': {
        display: 'none',
      },
    },
    tick_notext: {
      '& text': {
        display: 'none',
      },
    },
    bar_group: {

    },
    bar: {
      fill: theme.palette.secondary.main,
    },
    bar_inactive: {
      fill: theme.palette.grey[200],
    },
    barInfo: {
      opacity: 0,
      userSelect: 'none',
    },
    barInfo_active: {
      opacity: 1,
    },
    barInfo_rect: {
      fill: 'rgba(0,0,0,.7)',
    },
    barInfo_text_top: {
      fill: theme.palette.grey[400],
      textAnchor: 'middle',
      alignmentBaseline: 'hanging',
    },
    barInfo_text_bot: {
      fill: theme.palette.common.white,
      textAnchor: 'middle',
      alignmentBaseline: 'baseline',
    },
    barOverlay: {
      fill: 'transparent',
    }
  }
};

class SummaryFigure extends React.Component {
  constructor(props){
    super(props);
    this.handleTouchStart = this.handleTouchStart.bind(this);
    this.handleTouchMove = this.handleTouchMove.bind(this);
    this.handleTouchEnd = this.handleTouchEnd.bind(this);
    this.handleTouchHold = this.handleTouchHold.bind(this);
  }
  // touch events config
  holdDuration = 300;
  // svg config
  ref = React.createRef();
  width = 600;
  height = 400;
  padding = 40;
  barPadding = 3
  barInfoUnit = 16;
  // getters
  get svg() {
    return this.ref.current;
  }
  get bars() {
    return Array.from(this.ref.current.querySelectorAll(`.${this.props.classes.bar}`));
  }
  get infos() {
    return Array.from(this.ref.current.querySelectorAll(`.${this.props.classes.barInfo}`));
  }
  get overlays() {
    return Array.from(this.ref.current.querySelectorAll(`.${this.props.classes.barOverlay}`));
  }
  getBarInfoConfig(xScale, yScale) {
    return {
      fontSize: this.barInfoUnit,
      width: xScale(5) - this.padding,
      height: this.barInfoUnit*4,
      arrowHeight: this.barInfoUnit*0.5,
      padding: this.barInfoUnit*0.8,
    }
  }
  getBarInfoPoints({xScale, yScale, config, barWidth, data}) {
    const c = config || this.getBarInfoConfig(xScale, yScale);
    const x = xScale(data.id)-(c.width * 0.5);
    const y = yScale(parseFloat(data.total)) - c.height - c.arrowHeight - 2;
    return {
      left: x,
      right: x+c.width,
      top: y,
      bottom: y+c.height,
      center: xScale(data.id),
      arrowLeft: xScale(data.id) - (barWidth*0.5),
      arrowRight: xScale(data.id) + (barWidth*0.5),
      arrowBottom: y+c.height+c.arrowHeight,
    }
  }
  // lifecycle
  componentDidMount(){
    if (this._dataIsValid()) this.renderFigure();
  }
  shouldComponentUpdate(nextProps){
    return !_isEqual(this.props.data, nextProps.data);
  }
  componentDidUpdate(){
    if (this._dataIsValid()) this.renderFigure();
  }
  // data validation
  _dataIsValid(){
    return this.props.data.groups.length > 0;
  }
  // handlers
  handleTouchStart(e){
    const coords = e.type === 'mouseover' ? getMouseCoords(e) : getTouchCoords(e);
    this.timer = setTimeout(()=>this.handleTouchHold(coords), this.holdDuration)
  }
  handleTouchMove(e){
    if (this.timer) clearTimeout(this.timer);
    if (!this.props.swipeable) this.selectBar(e.type === 'mousemove' ? getMouseCoords(e) : getTouchCoords(e));
  }
  handleTouchEnd(e){
    if (this.timer) clearTimeout(this.timer);
    if (!this.props.swipeable) this.props.setSwipeable(true);
    this.deselectBars();
  }
  handleTouchHold(coords){
    this.props.setSwipeable(false);
    this.selectBar(coords);
  }
  handleContextMenu(e){
    e.preventDefault();
    e.stopPropagation();
    return false;
  }
  selectBar(coords){
    const {x, y} = coords;
    const svgRect = this.svg.getBoundingClientRect();
    const bounds = {
      min: svgRect.left + this.padding,
      max: svgRect.right - this.padding,
    }
    if (x > bounds.max || x < bounds.min) return this.deselectBars();
    this.overlays.forEach(overlay => {
      const rect = overlay.getBoundingClientRect();
      const bar = this.bars.find(b => b.dataset.id === overlay.dataset.id)
      const info = this.infos.find(i => i.dataset.id === overlay.dataset.id);
      if ( x >= rect.x && x < rect.x+rect.width ) {
        bar.classList.remove(this.props.classes.bar_inactive);
        info.classList.add(this.props.classes.barInfo_active);
      } else {
        bar.classList.add(this.props.classes.bar_inactive);
        info.classList.remove(this.props.classes.barInfo_active);
      }
    })
  }
  deselectBars(){
    this.bars.forEach(b => {
      b.classList.remove(this.props.classes.bar_inactive);
    });
    this.infos.forEach(i => {
      i.classList.remove(this.props.classes.barInfo_active)
    })
  }

  // render d3
  renderFigure() {
    const svg = d3.select(this.svg);
    svg.selectAll('*').remove();
    // days of month
    const xMin = 0;
    const xMax = getDaysInMonth(this.props.data.id);
    // total expenses amounts per day
    const yMin = 0;
    const yMax = d3.max(this.props.data.groups, d => parseFloat(d.total));
    // scales
    const xScale = d3.scaleLinear()
                     .domain([xMin, xMax+1])
                     .range([this.padding, this.width-this.padding]);
    const yScale = d3.scaleLinear()
                     .domain([yMin, yMax])
                     .range([this.height-this.padding, this.padding]);
    // axes
    const xTicks = Array.from(Array(xMax+1).keys())
                        .map(i => i>0 ? [i, i+0.5] : [i])
                        .reduce((a,b)=>a.concat(b), []);
    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickValues(xTicks)
                    .tickPadding(12)
                    .tickSize(0)
                    .tickFormat((d,i)=>{
                      const v = Math.floor(d).toString();
                      return v.length < 2 ? '0'+v : v;
                    });
    // const yAxis = d3.axisLeft()
    //                 .scale(yScale)
    //                 .tickValues([
    //                   Math.floor(yMax*0.25),
    //                   Math.floor(yMax*0.5),
    //                   Math.floor(yMax*0.75),
    //                   Math.floor(yMax),
    //                 ])
    //                 .tickSize(0)

    // draw axes
    const xAxisNode = svg.append('g')
       .attr('id', 'x-axis-'+this.props.data.id)
       .attr('transform', `translate(0,${this.height-this.padding+1})`)
       .call(xAxis);
    // const yAxisNode = svg.append('g')
    //    .attr('id', 'y-axis-'+this.props.data.id)
    //    .attr('transform', `translate(${this.padding})`)
    //    .call(yAxis);

    // apply staggered display style to date ticks
    xAxisNode.selectAll('.tick')
      .style('font-size', '16px')
      .attr('class', (d,i) => (i===0 || (d+2)%3 !== 0) ? this.props.classes.tick_notext : this.props.classes.tickX)
    // yAxisNode.selectAll('.tick')
    //   .style('font-size', '16px')

    const groupData = this._fillEmptyIndices(xMax)
    const entry = svg.selectAll()
      .data(groupData)
      .enter()

    const barGroups = entry.append('g')
      .attr('class', this.props.classes.bar_group)

    const barWidth = (xScale(1)-this.padding)-(this.barPadding*2);
    const barGroupHalfWidth = xScale(0.5) - this.padding;

    // data bars
    barGroups.append('rect')
      .attr('class', this.props.classes.bar)
      .attr('x', d => xScale(d.id)+this.barPadding-barGroupHalfWidth)
      .attr('y', d => yScale(parseFloat(d.total)))
      .attr('height', d => yScale(0) - yScale(parseFloat(d.total)))
      .attr('width', barWidth)
      .attr('data-id', d => d.id)

    // data bars info
    const barInfoGroups = entry.append('g')
      .attr('class', this.props.classes.barInfo)
      .attr('data-id', d => d.id)

    const barInfoConfig = this.getBarInfoConfig(xScale, yScale);
    barInfoGroups.append('polygon')
      .attr('class', this.props.classes.barInfo_rect)
      .attr('points', d => {
        const p = this.getBarInfoPoints({ data: d, xScale, yScale, barWidth, config: barInfoConfig })
        return [
          crd(p.left, p.top),
          crd(p.left, p.bottom),
          crd(p.arrowLeft, p.bottom),
          crd(p.center, p.arrowBottom),
          crd(p.arrowRight, p.bottom),
          crd(p.right, p.bottom),
          crd(p.right, p.top),
        ].join(' ');
        function crd(x,y){
          return `${x},${y}`;
        }
      })
    barInfoGroups.append('text')
      .attr('class', this.props.classes.barInfo_text_top)
      .attr('x', d => xScale(d.id))
      .attr('y', d => {
        const p = this.getBarInfoPoints({ data: d, xScale, yScale, barWidth, config: barInfoConfig })
        return p.top + barInfoConfig.padding;
      })
      // .text(d => getDateStrMini(d.date))
      .text(d => getDateStrMini(d.date))
      .attr('font-size', this.barInfoUnit)
    barInfoGroups.append('text')
      .attr('class', this.props.classes.barInfo_text_bot)
      .attr('x', d => xScale(d.id))
      .attr('y', d => {
        const p = this.getBarInfoPoints({ data: d, xScale, yScale, barWidth, config: barInfoConfig })
        return p.bottom - barInfoConfig.padding;
      })
      .text(d => d.total)
      .attr('font-size', this.barInfoUnit*1.2)

    // user interaction bar overlays
    const barOverlay = {
      height: yScale(0)-yScale(yMax)+this.padding,
      width: xScale(1)-this.padding,
    }
    barGroups.append('rect')
      .attr('class', this.props.classes.barOverlay)
      .attr('x', d => xScale(d.id)-barGroupHalfWidth)
      .attr('y', yScale(yMax))
      .attr('height', barOverlay.height)
      .attr('width', barOverlay.width)
      .attr('data-id', d => d.id)

    // barGroups.append('text')
    //   .attr('x', (d,i) => xScale(d.id)+this.barPadding-barGroupHalfWidth)
    //   .attr('y', d => yScale(parseFloat(d.total)))
    //   .text(d=> d.total >= yMax ? d.id : '')
    //   .style('font-size', '16px')
  }

  render(){
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        {this._dataIsValid() ? (
          <svg
            ref={this.ref}
            viewBox={`0 0 ${this.width} ${this.height}`}
            preserveAspectRatio='xMidYMid meet'
            className={classes.svg}
            onTouchStart={this.handleTouchStart}
            onTouchMove={this.handleTouchMove}
            onTouchEnd={this.handleTouchEnd}
            onTouchCancel={this.handleTouchEnd}
            onMouseOver={this.handleTouchHold}
            onMouseMove={this.handleTouchMove}
            onMouseLeave={this.handleTouchEnd}
            onContextMenu={this.handleContextMenu}
          />
        ) : <EmptyList /> }
      </div>
    );
  }

  // internal helper
  _fillEmptyIndices(last){
    const data = this.props.data.groups.slice();
    const monthId = this.props.data.id.toString();
    const year = monthId.slice(0,4);
    const month = monthId.slice(4);
    for(let i=1; i<=last; i++){
      if (data.find(d => d.id===i)) continue;
      const date = new Date(year, month, i);
      data.push({
        id: i,
        total: resolveCurrencyValue(0, CURRENCY[this.props.user.currency].decimal),
        date,
      });
    }
    return data;
  }
}

// external helper
function getDaysInMonth(id){
  // id = yyyymm as number type
  const str = id.toString();
  const y = str.slice(0,4);
  const m = str.slice(4);
  const d = new Date(parseInt(y, 10), parseInt(m, 10)+1);
  d.setDate(d.getDate()-1);
  return d.getDate();
}
function getDateStrMini(d){
  return d.toDateString().split(' ').slice(1,3).join(' ');
}
function getTouchCoords(e){
  return {x: e.touches[0].clientX, y: e.touches[0].clientY}
}
function getMouseCoords(e){
  return {x: e.clientX, y: e.clientY}
}

export default withStyles(style)(SummaryFigure);

import React from 'react'
import * as d3 from 'd3'
import EmptyList from '../EmptyList'
import { withStyles } from '@material-ui/styles'
import * as _isEqual from 'lodash.isequal'

const style = theme => ({
  TimelineFigure_root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflowX: 'hidden',
  },
  svg: {
    width: '100%',
    userSelect: 'none',
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
    fill: theme.palette.primary.main,
    '&:hover': {
      fill: theme.palette.secondary.main,
    }
  }
});

class TimelineFigure extends React.Component {
  ref = React.createRef();
  // svg config
  width = 600;
  height = 400;
  padding = 40;
  barPadding = 3;

  componentDidMount(){
    if (this._dataIsValid()) this.renderFigure();
  }

  shouldComponentUpdate(nextProps){
    return !_isEqual(this.props.data, nextProps.data);
  }

  componentDidUpdate(){
    if (this._dataIsValid()) this.renderFigure();
  }

  _dataIsValid(){
    return this.props.data.groups.length > 0;
  }

  renderFigure() {
    const svg = d3.select(this.ref.current);
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
                        console.log(xTicks)
    const xAxis = d3.axisBottom()
                    .scale(xScale)
                    .tickValues(xTicks)
                    .tickPadding(4)
                    .tickSize(0)
                    .tickFormat((d,i)=>{
                      const v = Math.floor(d).toString();
                      return v.length < 2 ? '0'+v : v;
                    });
    const yAxis = d3.axisLeft()
                    .scale(yScale)
                    .tickValues([
                      Math.floor(yMax*0.25),
                      Math.floor(yMax*0.5),
                      Math.floor(yMax*0.75),
                      Math.floor(yMax),
                    ])
                    .tickSize(0)

    // draw axes
    const xAxisNode = svg.append('g')
       .attr('id', 'x-axis-'+this.props.data.id)
       .attr('transform', `translate(0,${this.height-this.padding})`)
       .call(xAxis);
    // const yAxisNode = svg.append('g')
    //    .attr('id', 'y-axis-'+this.props.data.id)
    //    .attr('transform', `translate(${this.padding})`)
    //    .call(yAxis);

    // apply staggered display style to date ticks
    xAxisNode.selectAll('.tick')
      .style('font-size', '16px')
      .attr('class', (d,i) => (i===0 || (d+2)%3 !== 0) ? this.props.classes.tick_notext : '')
    // yAxisNode.selectAll('.tick')
    //   .style('font-size', '16px')

    const barGroups = svg.selectAll(`.${this.props.classes.bar_group}`)
      .data(this.props.data.groups)
      .enter()
      .append('g')
      .attr('class', this.props.classes.bar_group)

    const barWidth = (xScale(1)-this.padding)-(this.barPadding*2);
    const barGroupHalfWidth = xScale(0.5) - this.padding;

    barGroups.append('rect')
      .attr('class', this.props.classes.bar)
      .attr('x', (d,i) => xScale(d.id)+this.barPadding-(barGroupHalfWidth))
      .attr('y', d => yScale(parseFloat(d.total)))
      .attr('height', d => yScale(0) - yScale(parseFloat(d.total)))
      .attr('width', barWidth)

    // barGroups.append('text')
    //   .attr('x', (d,i) => xScale(d.id)+this.barPadding-barGroupHalfWidth)
    //   .attr('y', d => yScale(parseFloat(d.total)))
    //   .text(d=> d.total >= yMax ? d.id : '')
    //   .style('font-size', '16px')
  }

  render(){
    return (
      <div className={this.props.classes.TimelineFigure_root}>
        {this._dataIsValid() ? (
          <svg
            ref={this.ref}
            viewBox={`0 0 ${this.width} ${this.height}`}
            preserveAspectRatio='xMidYMid meet'
            className={this.props.classes.svg}
          />
        ) : <EmptyList /> }
      </div>
    );
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
  return d.getUTCDate();
}

export default withStyles(style)(TimelineFigure);

import React from 'react'
import * as d3 from 'd3'
import EmptyList from '../EmptyList'
import { makeStyles } from '@material-ui/styles'
import { useTheme } from '@material-ui/core/styles'

const useStyles = theme => ({
  TimelineFigure_root: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

class TimelineFigure extends React.Component {
  ref = React.createRef();
  // svg config
  width = 600;
  height = 400;

  componentDidMount(){
    if (this._dataIsValid()) this.renderFigure();
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
    svg.append('circle')
      .attr('cx', Math.floor(Math.random()*this.width))
      .attr('cy', Math.floor(Math.random()*this.height))
      .attr('r', Math.floor(Math.random()*50))
      .style('fill', `hsl(${Math.floor(Math.random()*256)},80%,80%)`)
  }

  render(){
    const styles = {
      root: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        overflowX: 'hidden',
      },
      svg: {
        width: '100%',
        maxWidth: '100%',
        border: '1px solid black'
      }
    }
    return (
      <div style={styles.root}>
        {this._dataIsValid() ? (
          <svg
            ref={this.ref}
            viewBox={`0 0 ${this.width} ${this.height}`}
            preserveAspectRatio='xMidYMid meet'
            style={styles.svg}
          />
        ) : <EmptyList /> }
      </div>
    );
  }
}

// external helper
function getDaysInMonth(month){
  const date = new Date(month);
  date.setDate(date.getDate()-1);
  return date.getUTCDate();
}

export default TimelineFigure;

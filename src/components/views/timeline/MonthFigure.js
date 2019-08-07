import React from 'react'
import d3 from 'd3'

class MonthFigure extends React.Component {

  ref = React.createRef();

  width = 800;
  height = 500;

  componentDidMount(){
  }

  render(){
    <svg
      ref={this.ref}
      style={{width: '100%'}}
    />
  }

}

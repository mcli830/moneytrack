import React from 'react'
import PropTypes from 'prop-types'
import Loader from './Loader'

class AsyncLoader extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
    }
  }

  componentDidMount(){
    setTimeout(()=>{
      this.props.operation();
      this.setState({ loading: false })
    }, 200)
  }

  render(){
    return this.state.loading ? <Loader /> : this.props.children;
  }
}

AsyncLoader.propTypes = {
  operation: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
}

export default AsyncLoader;

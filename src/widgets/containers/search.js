import React, { Component } from 'react'
import Search from '../components/search'
import { connect } from 'react-redux'
import * as actions from '../../actions'
import { bindActionCreators } from 'redux';

class SearchContainer extends Component {
  state = {
    value: 'Luis fonsi'
  }
  handleSubmit = (event) => {
    event.preventDefault()
    this.props.actions.searchAsyncEntities(this.input.value)
  }
  handleInputChange = (event) => {
    this.setState({
      value: event.target.value.replace(' ', '-') // this.input
    })
  }
  setInputRef = element => {
    this.input = element
  }
  render () {
    return (
      <Search 
        setRef={this.setInputRef}
        handleSubmit={this.handleSubmit}
        handleChange={this.handleInputChange}
        value={this.state.value}
      />
    )
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(null, mapDispatchToProps)(SearchContainer)

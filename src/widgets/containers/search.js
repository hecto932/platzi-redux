import React, { Component } from 'react'
import Search from '../components/search'
import { connect } from 'react-redux'

class SearchContainer extends Component {
  state = {
    value: 'Luis fonsi'
  }
  handleSubmit = (event) => {
    event.preventDefault()
    console.log(this.input.value, 'submit')
    this.props.dispatch({
      type: 'SEARCH_SONG',
      payload: {
        query: this.input.value
      }
    })
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

export default conect()(SearchContainer)

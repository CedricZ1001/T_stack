import React, { Component } from 'react'

export default class ClassConponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      date: new Date()
    }
  }

  componentDidMount () {
    this.timer = setInterval(() => {
      this.setState({
        date: new Date()
      })
    }, 1000)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    const { date } = this.state
    return (
      <div>
        <div>ClassConponent</div>
        <p>{date.toLocaleTimeString()}</p>
      </div>
    )
  }
}


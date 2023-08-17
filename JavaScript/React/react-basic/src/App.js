import React, { createRef } from "react"
import "./App.css"

class Counter extends React.Component {
  msgRef = createRef()


  getValue () {
    console.log(this.msgRef.current.value)
  }

  render () {
    return (
      <>
        <input
          type="text"
          ref={this.msgRef}
        />
        <button onClick={() => this.getValue()}>click</button>
      </>
    )
  }
}

function App () {
  return (
    <div className="App">
      <Counter />
    </div>
  )
}

export default App

import React, { useState, useEffect } from 'react'

export default function FunctionComponent () {
  const [date, setDate] = useState(new Date())

  useEffect(() => {
    console.log("useEffect")
    const timer = setInterval(() => {
      setDate(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])



  return (
    <div>
      <h3>FunctionComponent</h3>
      <p>{date.toLocaleTimeString()}</p>
    </div>
  )
}

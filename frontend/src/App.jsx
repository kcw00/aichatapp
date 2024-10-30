import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function App() {
  const [count, setCount]= useState(0)

  return (
    <>
      <div className="containter">
        <h1>Open AI Developer API integration</h1>
      </div>
    </>
  )
}

export default App
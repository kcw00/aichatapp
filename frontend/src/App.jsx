import { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

function App() {
  const [question, setQuestion]= useState("");

  return (
    <>
      <div className="containter">
        <h1>Open AI Developer API integration</h1>
        <form>
          <label className='form-label' htmlFor='txtQuestion'>Please Enter Your Question</label>
          <input className='form-control' type='text' id='txtQuestion' name='txtQuestion' onChange={(evt) => setQuestion(evt.target.value)} />
        </form>
        <span>{question}</span>
      </div>
    </>
  )
}

export default App
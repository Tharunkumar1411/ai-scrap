import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [inputText, setInputText] = useState('')
  const [submittedText, setSubmittedText] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setSubmittedText(inputText)
    console.log('Submitted text:', inputText)
    setInputText('')
  }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      
      {/* New form section */}
      <div className="card">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter some text..."
            style={{ 
              padding: '8px 12px', 
              marginRight: '8px',
              borderRadius: '4px',
              border: '1px solid #ccc'
            }}
          />
          <button type="submit">Submit</button>
        </form>
        {submittedText && (
          <p style={{ marginTop: '16px' }}>
            You submitted: <strong>{submittedText}</strong>
          </p>
        )}
      </div>

      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
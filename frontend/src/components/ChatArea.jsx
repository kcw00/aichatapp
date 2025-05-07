import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './SideBar'

const ChatArea = () => {
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [answer, setAnswer] = useState('') // State to hold the answer from the API
  const [isCollapsed, setIsCollapsed] = useState(true)

  const switchMode = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
  const togglable = isCollapsed ? "collapsed" : ""


  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    document.body.className = togglable
  }, [isCollapsed])


  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  useEffect(() => {
    document.body.className = switchMode
  }, [isDarkMode])


  const handleSubmit = async (event) => {
    event.preventDefault() // Prevent default form submission behavior
    if (input.trim()) {
      // Add user message to messages array
      setMessages([...messages, { text: input, sender: 'user' }])
      setInput('')

      try {
        const response = await axios.post(`http://localhost:3000/${input}`) // Use input as the question
        console.log(JSON.stringify(response.data))
        setAnswer(response.data) // the API returns the answer directly

        // Simulate bot response
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: response.data, sender: 'bot' }, // Display the bot response
          ]);
        }, 500)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
  }


  return (
    <div className={`main-container d-flex vh-100 ${switchMode}`}>
      <Sidebar isCollapsed={togglable} theme={switchMode} />
      <div className="content">

        <div className="d-flex flex-column flex-grow-1">
          <header className="py-3 d-flex justify-content-between align-items-center px-3">
            <button className="toggler-btn" onClick={toggleSidebar}>
              <i class="bi bi-layout-text-sidebar"></i>
            </button>
            <button onClick={toggleTheme} className="btn btn-secondary ms-auto">
              {isDarkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </header>
        </div>
        <div className="chat-area">
          {/* Message List */}
          <div className="message-list flex-grow-1 overflow-auto p-3">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`message ${message.sender === 'user' ? 'text-end' : 'text-start'}`}
              >
                <div className={`p-2 rounded ${message.sender === 'user' ? 'bg-primary text-light' : 'bg-secondary text-light'}`}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Container */}
          <form
            className={`input-container p-3 d-flex ${switchMode}`}
            onSubmit={handleSubmit}>
            <input
              type="text"
              className={`form-control me-2 ${switchMode}`}
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} // Call handleSubmit on Enter
            />
            <button type="submit" className="btn btn-primary d-flex align-items-center">
              <i className="bi bi-arrow-right-circle-fill me-1"></i>
            </button>
          </form>
        </div>

      </div>

    </div>
  )
}

export default ChatArea
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Sidebar from './Sidebar'
import Markdown from './Markdown/Markdown'

const ChatArea = () => {
    const [isDarkMode, setIsDarkMode] = useState(false)
    const [messages, setMessages] = useState([])
    const [input, setInput] = useState('')
    const [isCollapsed, setIsCollapsed] = useState(true)

    const switchMode = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'
    const togglable = isCollapsed ? "collapsed" : ""
    const themeMode = isDarkMode ? "dark" : ""


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
                const response = await axios.post(`/api/${input}`) // Use input as the question
                // console.log(JSON.stringify(response.data))
                const rawText = response.data

                // Optional: unescape if response is JSON-stringified string
                const parsedText = typeof rawText === 'string'
                    ? rawText.replace(/\\n/g, '\n').replace(/\\"/g, '"')
                    : rawText

                // Simulate bot response
                setTimeout(() => {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        { text: parsedText, sender: 'bot' }, // Display the bot response
                    ]);
                }, 500)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }
    }


    return (
        <div className={`main-container d-flex vh-100 overflow-y-scroll ${switchMode}`}>

            <Sidebar isCollapsed={togglable} theme={themeMode} toggleTheme={toggleTheme} />

            <div className="content">

                <div className="d-flex flex-column flex-grow-1">
                    <header className="py-3 d-flex justify-content-between align-items-center px-3">
                        <button className="toggler-btn" onClick={toggleSidebar}>
                            {isCollapsed ? <i className="bi bi-layout-sidebar fs-3"></i> : <i className="bi bi-layout-split fs-3"></i>}
                        </button>
                    </header>
                </div>

                <div className="chat-area">
                    {/* Message List */}
                    <div className="message-list flex-grow-1 overflow-auto p-3">
                        {messages.map((message, index) => (
                            <div
                                key={index}
                                className={`message d-flex ${message.sender === 'user' ? 'justify-content-end' : 'justify-content-start'} mb-2`}
                            >
                                {message.sender === 'bot' && (
                                    <i className="bi bi-robot fs-5 me-2 align-self-center text-secondary"></i>
                                )}

                                <div
                                    className={`message-bubble px-3 py-2 position-relative ${message.sender === 'user' ? 'user-bubble' : 'bot-bubble'} ${themeMode}`}
                                >
                                    {message.sender === 'bot' ? (
                                        <Markdown
                                            content={message.text}
                                            isDarkMode={isDarkMode}
                                        />
                                    ) : (
                                        message.text
                                    )}
                                </div>

                                {message.sender === 'user' && (
                                    <i className="bi-person-fill fs-5 ms-2 align-self-center text-primary"></i>
                                )}
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

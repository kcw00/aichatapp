import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap-icons/font/bootstrap-icons.css';
import axios from 'axios'
import './index.css'

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [answer, setAnswer] = useState(''); // State to hold the answer from the API

  // Toggle theme
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    document.body.className = isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark';
  }, [isDarkMode]);

  async function handleSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior
    if (input.trim()) {
      // Add user message to messages array
      setMessages([...messages, { text: input, sender: 'user' }]);
      setInput('');

      try {
        const response = await axios.post(`http://localhost:3000/${input}`); // Use input as the question
        console.log(JSON.stringify(response.data));
        setAnswer(response.data); // Assuming the API returns the answer directly

        // Simulate bot response
        setTimeout(() => {
          setMessages(prevMessages => [
            ...prevMessages,
            { text: response.data, sender: 'bot' }, // Display the bot response
          ]);
        }, 500);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

  };


  return (
    <div className={`app-container d-flex flex-column vh-100 ${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
      <header className="py-3 d-flex justify-content-between align-items-center px-3">
        <button onClick={toggleTheme} className="btn btn-secondary visible">
          {isDarkMode ? 'Light Mode' : 'Dark Mode'}
        </button>
      </header>

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
      <form className="input-container p-3 bg-light d-flex" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSubmit(e)} // Call handleSubmit on Enter
        />
        <button type="submit" className="btn btn-primary btn-lg d-flex align-items-center">
          <i className="bi bi-arrow-right-circle-fill me-1"></i> {/* Bootstrap arrow icon */}
        </button>
      </form>
    </div>
  );
}

export default App
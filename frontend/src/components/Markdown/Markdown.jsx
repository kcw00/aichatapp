import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

import './markdown.css'

const Markdown = ({ content, isDarkMode }) => {
  const [copiedCode, setCopiedCode] = useState(null)

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    setTimeout(() => setCopiedCode(null), 1000)
  }

  return (
    <ReactMarkdown
      children={content}
      remarkPlugins={[remarkGfm]}
      components={{
        code({ node, inline, className, children, ...props }) {
          const languageMatch = /language-(\w+)/.exec(className || '')
          const language = languageMatch ? languageMatch[1] : null
          const code = String(children).trim()


          return ( !inline && languageMatch ? (
            <div className="code-wrapper">
              {language && (
                <span className={`language-label ${isDarkMode ? 'dark' : 'light'}`}>
                  {language.charAt(0).toUpperCase() + language.slice(1)}
                </span>
              )}

              <SyntaxHighlighter
                language={language}
                style={oneDark}
                PreTag="div"
                customStyle={{ padding: '1rem', paddingTop: '2.2rem' }}
                {...props}
              >
                {code}
              </SyntaxHighlighter>

              <button
                className={`copy-btn ${isDarkMode ? 'dark' : 'light'}`}
                onClick={() => handleCopy(code)}
              >
                {copiedCode === code ? 'Copied!' : 'Copy'}
              </button>
            </div>) : (
              <span className={'inline-code'}>
                {code}
              </span>
            )
          )
        }
      }}
    />
  )
}

export default Markdown

import React from 'react'
import ReactDOM from "react-dom/client"
import App from "./App.jsx"


const entryPoint = document.getElementById("root");
ReactDOM.createRoot(entryPoint).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)

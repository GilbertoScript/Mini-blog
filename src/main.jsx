import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import ReactGA from "react-ga4";
ReactGA.initialize("G-DC9KD9LWL2");

// Send pageview with a custom path
ReactGA.send({ hitType: "pageview", page: window.location.pathname, title: "Custom Title" });

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)

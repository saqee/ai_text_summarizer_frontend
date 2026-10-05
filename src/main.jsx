import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"
import { SummaryProvider } from "./context/SummaryContext"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SummaryProvider>
      <App />
    </SummaryProvider>
  </React.StrictMode>,
)

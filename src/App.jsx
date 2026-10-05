import { useContext, useState } from "react"
import { SummaryContext } from "./context/SummaryContext"

function App() {
  const [inputText, setInputText] = useState("")
  const [currentSummary, setCurrentSummary] = useState("")
  const { history, loading, summarizeText } = useContext(SummaryContext)

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const result = await summarizeText(inputText)
    if (result) {
      setCurrentSummary(result)
      setInputText("")
    }
  }

  return (
    <div
      style={{
        maxWidth: "800px",
        margin: "30px auto",
        padding: "20px",
        fontFamily: "sans-serif",
      }}
    >
      <h2>MERN AI Text Summarizer</h2>

      {/* Input Form */}
      <form onSubmit={handleSubmit}>
        <textarea
          rows="6"
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            boxSizing: "border-box",
          }}
          placeholder="Paste your long text here..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <br />
        <button
          type="submit"
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#2563eb",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {loading ? "Summarizing..." : "Summarize Text"}
        </button>
      </form>

      {/* Current Summary Output */}
      {currentSummary && (
        <div
          style={{
            marginTop: "25px",
            background: "#f1f5f9",
            padding: "15px",
            borderRadius: "8px",
          }}
        >
          <h3>Latest Summary:</h3>
          <p>{currentSummary}</p>
        </div>
      )}

      {/* History Section from Database */}
      <div style={{ marginTop: "40px" }}>
        <h3>Previous Summaries</h3>
        {history.length === 0 ? <p>No history found.</p> : null}
        {history.map((item) => (
          <div
            key={item._id}
            style={{
              border: "1px solid #cbd5e1",
              padding: "12px",
              borderRadius: "6px",
              marginBottom: "12px",
            }}
          >
            <p>
              <strong>Original (preview):</strong>{" "}
              {item.originalText.slice(0, 100)}...
            </p>
            <p>
              <strong>Summary:</strong> {item.summaryText}
            </p>
            <small style={{ color: "#64748b" }}>
              Date: {new Date(item.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App

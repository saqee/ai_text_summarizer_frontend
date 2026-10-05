import axios from "axios"
import { createContext, useEffect, useState } from "react"

export const SummaryContext = createContext()

export const SummaryProvider = ({ children }) => {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(false)
  const API_BASE = "https://ai-text-summarizer-backend-0vfv.onrender.com"
  useEffect(() => {
    let isMounted = true

    const fetchHistory = async () => {
      try {
        const res = await axios.get(`${API_BASE}/api/history`)
        if (isMounted) {
          setHistory(res.data)
        }
      } catch (err) {
        console.error("Failed to load history", err)
      }
    }

    fetchHistory()

    return () => {
      isMounted = false
    }
  }, [])

  const summarizeText = async (text) => {
    setLoading(true)
    try {
      const res = await axios.post(`${API_BASE}/api/summarize`, {
        text,
      })
      setHistory((prev) => [res.data, ...prev])
      setLoading(false)
      return res.data.summaryText
    } catch (err) {
      setLoading(false)
      alert("Error generating summary")
      return null
    }
  }

  return (
    <SummaryContext.Provider value={{ history, loading, summarizeText }}>
      {children}
    </SummaryContext.Provider>
  )
}

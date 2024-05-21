import React, { useState } from "react"

const PreEventForm = ({ onNewEntry }) => {
  const [formData, setFormData] = useState({
    userId: 1,  // Assuming a logged in user with id 1 for simplicity
    entryType: "pre-event",
    content: "",
    confidence: "",
    calm: ""
  })

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData({
      ...formData,
      [name]: value
    })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    try {
      const response = await fetch("/api/v1/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      })
      if (response.ok) {
        const newEntry = await response.json()
        onNewEntry(newEntry.entry)
        setFormData({
          content: "",
          confidence: "",
          calm: ""
        })
      } else {
        console.error("Error creating entry")
      }
    } catch (error) {
      console.error("Error creating entry:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Content:
        <input type="text" name="content" value={formData.content} onChange={handleInputChange} />
      </label>
      <label>
        Confidence:
        <input type="number" name="confidence" value={formData.confidence} onChange={handleInputChange} />
      </label>
      <label>
        Calm:
        <input type="number" name="calm" value={formData.calm} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit Pre-Event Entry</button>
    </form>
  )
}

export default PreEventForm
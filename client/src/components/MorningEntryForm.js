import React, { useState } from "react"

const MorningForm = ({ onNewEntry }) => {
  const [formData, setFormData] = useState({
    userId: 1,  // Assuming a logged in user with id 1 for simplicity
    entryType: "morning",
    content: "",
    sleepQuality: "",
    gratitude: ""
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
          sleepQuality: "",
          gratitude: ""
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
        Sleep Quality:
        <input type="number" name="sleepQuality" value={formData.sleepQuality} onChange={handleInputChange} />
      </label>
      <label>
        Gratitude:
        <input type="number" name="gratitude" value={formData.gratitude} onChange={handleInputChange} />
      </label>
      <button type="submit">Submit Morning Entry</button>
    </form>
  )
}

export default MorningForm
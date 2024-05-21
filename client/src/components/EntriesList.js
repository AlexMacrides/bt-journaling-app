import React, { useState, useEffect } from "react"
import MorningForm from "./MorningForm"
import PreEventForm from "./PreEventForm"
import PostEventForm from "./PostEventForm"
import NightForm from "./NightForm"

const EntriesList = () => {
  const [entries, setEntries] = useState([])

  const fetchEntries = async () => {
    try {
      const response = await fetch("/api/v1/entries")
      if (response.ok) {
        const fetchedEntries = await response.json()
        setEntries(fetchedEntries.entries)
      }
    } catch (error) {
      console.error("Error fetching entries:", error)
    }
  }

  useEffect(() => {
    fetchEntries()
  }, [])

  const handleNewEntry = (entry) => {
    setEntries([...entries, entry])
  }

  return (
    <div>
      <h1>Entries</h1>
      <MorningForm onNewEntry={handleNewEntry} />
      <PreEventForm onNewEntry={handleNewEntry} />
      <PostEventForm onNewEntry={handleNewEntry} />
      <NightForm onNewEntry={handleNewEntry} />
      <ul>
        {entries.map(entry => (
          <li key={entry.id}>
            <h2>{entry.entryType} Entry</h2>
            <p>{entry.content}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default EntriesList
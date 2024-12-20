'use client'

import { useState } from 'react'

interface Destination {
  location: string
  dates: string
}

export default function TripPlanner() {
  const [destinations, setDestinations] = useState<Destination[]>([])
  const [newDestination, setNewDestination] = useState('')
  const [date, setDate] = useState('')

  const handleAddDestination = () => {
    if (newDestination && date) {
      setDestinations([...destinations, { location: newDestination, dates: date }])
      setNewDestination('')
      setDate('')
    }
  }

  return (
    <div className="trip-planner">
      <h2><i className="fas fa-map-marked-alt"></i> Trip Planner</h2>
      <div className="destination-form">
        <input
          type="text"
          className="destination-input"
          placeholder="Add destination..."
          value={newDestination}
          onChange={(e) => setNewDestination(e.target.value)}
        />
        <input
          type="date"
          className="date-picker"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button className="download-btn" onClick={handleAddDestination}>Add</button>
      </div>
      <div className="destinations-list">
        {destinations.map((dest, index) => (
          <div key={index} className="destination-card">
            <span>{dest.location}</span>
            <span>{dest.dates}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
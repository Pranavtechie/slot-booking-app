import React, { useState } from "react";
import "./App.css";
import Slot from "./Slot";

function App() {
    const [showSlot, setShowSlot] = useState(false)
    const [bookedSlots, setBookedSlots] = useState([])

    function setValues(event){
        event.preventDefault();
        setShowSlot(true);
        const reason = event.target[0].value;
        const date = event.target[1].value;
        const startTime = event.target[2].value;
        const endTime = event.target[3].value;
        setBookedSlots(oldSlots => {
            return [...oldSlots,{reason: reason, date: date, startTime: startTime, endTime: endTime}]
        })
    }

  return (
    <div className="App">
      <h2>Slot Booking App</h2>

      <form onSubmit={(event)=> setValues(event)}>
        <div>
          <label htmlFor="reason">Reason: </label>
          <input
            id="reason"
            type="text"
            placeholder="Product Discussion"
            name="reason"
            required
          />
        </div>
        <div>
          <label htmlFor="date">Date: </label>
          <input id="date" type="date" name="date" required />
        </div>
        <div>
          <label htmlFor="startTime">From: </label>
          <input id="startTime" type="time" name="startTime" required />
        </div>
        <div>
          <label htmlFor="endTime">To: </label>
          <input id="endTime" type="time" name="endTime" required />
        </div>
        <button type="submit">Book the slot</button>
      </form>

      <hr />

      <h2>List of Booked Slots</h2>

      {showSlot && <Slot props={{bookedSlots}} />}
    </div>
  );
}

export default App;

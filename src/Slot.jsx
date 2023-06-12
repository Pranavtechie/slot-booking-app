import React from "react";

export default function Slot(props) {
    const {bookedSlots} = props.props

  return <div id='booked-lists-container'>
        {bookedSlots.map((slot,index)=>{
            const {reason, date, startTime, endTime} = slot

            return <section className='slot' key={index}>
                <h5 className='reason'>{reason}</h5>
                <time className='date'>{date}</time>
                <time className='start-time'>{startTime}</time>
                <time className='end-time'>{endTime}</time>
            </section>
        })}
  </div>;
}

// components/BookingWidget.js
'use client';
import { useState } from 'react';

export default function BookingWidget({ professional }) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  return (
    <div className="booking-widget">
      <h3>Reservar servicio</h3>
      <div className="calendar-picker">
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="time-picker">
        <select value={time} onChange={(e) => setTime(e.target.value)}>
          {professional.availableTimes.map(t => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <StripeButton />
    </div>
  );
}
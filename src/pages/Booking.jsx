import React, { useState } from "react";
// import "./Booking.css";

export default function Booking() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    service: "Portrait Session",
    date: "",
    time: "",
  });

  const dates = [18, 19, 20, 23, 24, 25, 26, 30];
  const slots = [
    "10:00 AM",
    "11:30 AM",
    "1:00 PM",
    "2:30 PM",
    "4:00 PM",
    "5:30 PM",
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Booking Confirmed!");
  };

  return (
    <div className="booking-page">
      <div className="booking-container">
        {/* Calendar Section */}
        <div className="calendar-card">
          <h2>1. Select a Date & Time</h2>

          <div className="calendar-box">
            <div className="month-header">
              <span>❮</span>
              <h3>OCTOBER 2023</h3>
              <span>❯</span>
            </div>

            <div className="dates-grid">
              {dates.map((date) => (
                <button
                  key={date}
                  className={`date-btn ${formData.date === date ? "active" : ""
                    }`}
                  onClick={() =>
                    setFormData({ ...formData, date })
                  }
                >
                  {date}
                </button>
              ))}
            </div>
          </div>

          <h3 className="slot-title">Available Time Slots</h3>

          <div className="slots-grid">
            {slots.map((slot) => (
              <button
                key={slot}
                className={`slot-btn ${formData.time === slot ? "active" : ""
                  }`}
                onClick={() =>
                  setFormData({ ...formData, time: slot })
                }
              >
                {slot}
              </button>
            ))}
          </div>
        </div>

        {/* Form Section */}
        <div className="form-card">
          <h2>2. Booking Details</h2>

          <form onSubmit={handleSubmit}>
            <label>Customer Name</label>
            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  name: e.target.value,
                })
              }
            />

            <label>Phone Number</label>
            <input
              type="tel"
              placeholder="Phone Number"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  phone: e.target.value,
                })
              }
            />

            <label>Email Address</label>
            <input
              type="email"
              placeholder="Email Address"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  email: e.target.value,
                })
              }
            />

            <label>Photography Service</label>
            <select
              onChange={(e) =>
                setFormData({
                  ...formData,
                  service: e.target.value,
                })
              }
            >
              <option>Portrait Session</option>
              <option>Wedding Shoot</option>
              <option>Event Photography</option>
              <option>Pre-Wedding</option>
            </select>

            <div className="summary">
              {formData.date || "Select Date"} |{" "}
              {formData.time || "Select Time"} |{" "}
              {formData.service}
            </div>

            <button type="submit" className="confirm-btn">
              CONFIRM BOOKING
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
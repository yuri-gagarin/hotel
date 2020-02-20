import React, { useState } from "react";
import { useTranslation } from "react-i18next";
 
const BookingForm = (props) => {

  const [guests, setGuestCount] = useState(1);
  const [children, setChildrenCount] = useState(0);
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [todaysDate, setTodaysDate] = useState(null);
  const [t, i18n] = useTranslation();

  const handleGuestChange = (e) => {
    const guestNumber = (e.target[e.target.selectedIndex].getAttribute("data-value"));
    setGuestCount(guestNumber);
  };
  const handleChildrenChange = (e) => {
    const childNumber = (e.target[e.target.selectedIndex].getAttribute("data-value"));
    setChildrenCount(childNumber);
  };
  const handleCheckInChange = (e) => {

  };
  const handleCheckoutChange = (e) => {

  };
  const submitReservationInfo = (e) => {
    console.info(e);
    console.info({
      guests: guests,
      children: children
    });
  }

  return (
    <div id="booking" className="section">
      <div className="section-center">
        <div className="container">
          <div className="row">
            <div className="booking-cta">
              <h1>{t("checkAvail")}</h1>
            </div>
            <div className="booking-form">
              <form>
                <div className="row">
                <div className="col-md-2">
                  <div className="form-group">
                    <span className="form-label">{t("guestCount")}</span>
                    <select className="form-control" onChange={handleGuestChange}>
                      <option data-value="1">1</option>
                      <option data-value="2">2</option>
                      <option data-value="3">3</option>
                      <option data-value="4">4</option>
                      <option data-value="5">5</option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>
                </div>
                <div className="col-md-2">
                  <div className="form-group">
                    <span className="form-label">{t("kidCount")}</span>
                    <select className="form-control" onChange={handleChildrenChange}>
                      <option data-value="0">0</option>
                      <option data-value="1">1</option>
                      <option data-value="2">2</option>
                      <option data-value="3">3</option>
                      <option data-value="4">4</option>
                      <option data-value="5">5</option>
                    </select>
                    <span className="select-arrow"></span>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <span className="form-label">{t("checkIn")}</span>
                    <input className="form-control" type="date" onChange={handleCheckInChange} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <span className="form-label">{t("checkOut")}</span>
                    <input className="form-control" type="date" onChange={handleCheckoutChange} required />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-btn">
                    <button className="submit-btn" onClick={submitReservationInfo}>{t("checkAvail")}</button>
                  </div>
                </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
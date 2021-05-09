// @flow
import * as React from "react";
import Calendar from 'react-calendar';
import { useTranslation } from "react-i18next";
// style and css //
import 'react-calendar/dist/Calendar.css';
import styles from "./css/bookingForm.module.css";
// helpers //
import { formatDate } from "../../helpers/dateHelpers";
 
type LocalState = {
  checkinDateString: string;
  checkoutDateString: string;
  checkinDateObj: Date | null;
  checkoutDateObj: Date | null;
  // these are minimums for calendar //
  minCheckoutDateObj: Date;
  minCheckInDateObj: Date;
  // visibility for calendar //
  checkinCalVisible: boolean;
  checkoutCalVisible: boolean;
};


const BookingForm = (): React.Node => {

  const [guests, setGuestCount] = React.useState(1);
  const [children, setChildrenCount] = React.useState(0);
  const [checkInDate, setCheckInDate] = React.useState(null);
  const [checkOutDate, setCheckOutDate] = React.useState(null);
  const [todaysDate, setTodaysDate] = React.useState(null);
  const [t, i18n] = useTranslation();
  const [ localState, setLocalState ] = React.useState<LocalState>({ 
    checkinDateString: "", 
    checkoutDateString: "", 
    checkinDateObj: null, 
    checkoutDateObj: null, 
    minCheckInDateObj: new Date(),
    minCheckoutDateObj: new Date(formatDate(new Date().toISOString(), { nextDay: true })),
    checkinCalVisible: false, 
    checkoutCalVisible: false 
  });

  const handleGuestChange = (e) => {
    const guestNumber = (e.target[e.target.selectedIndex].getAttribute("data-value"));
    setGuestCount(guestNumber);
  };
  const handleChildrenChange = (e) => {
    const childNumber = (e.target[e.target.selectedIndex].getAttribute("data-value"));
    setChildrenCount(childNumber);
  };
  const handleCheckInChange = (value): void => {
    const date = new Date(value);
    const stringInputDate = formatDate(date.toISOString(), { ddmmyyyy: true });
    setLocalState({ ...localState, checkinDateString: stringInputDate, checkinDateObj: date, checkinCalVisible: false });
  };
  const getMinCheckoutDate = (): string => {
    if (localState.checkinDateObj) {
      return formatDate(localState.checkinDateObj.toISOString(), { nextDay: true });
    } else {
      return formatDate(new Date().toISOString(), { nextDay: true });
    }
  }
  const handleCheckoutChange = (value) => {
    if (!localState.checkinDateObj) return;
    const date = new Date(value);
    const stringInputDate = formatDate(date.toISOString(), { ddmmyyyy: true });
    setLocalState({ ...localState, checkoutDateString: stringInputDate, checkoutDateObj: date, checkoutCalVisible: false });
  };
  const submitReservationInfo = (e) => {
    console.info(e);
    console.info({
      guests: guests,
      children: children
    });
  };
  const handleInputChange = () => {

  }
  const toggleCheckinCalendar = () => {
    setLocalState({ ...localState, checkinCalVisible: !localState.checkinCalVisible });
  };
  const toggleCheckoutCalendar = () => {
    setLocalState({ ...localState, checkoutCalVisible: !localState.checkoutCalVisible });
  };
  const tileDisabled = ({ activeStartDate, date }) => {
    return activeStartDate > date;
  }

  // lifecycle hoooks //
  React.useEffect(() => {
    const { checkinDateObj } = localState
    if (checkinDateObj) {
      const nextDay = new Date(formatDate(checkinDateObj.toISOString(), {nextDay: true }));
      setLocalState({ ...localState, minCheckoutDateObj: nextDay });
    }
  }, [ localState.checkinDateObj ]);

  React.useEffect(() => {
    const { checkinDateObj, checkoutDateObj } = localState;
    if (checkinDateObj && checkoutDateObj) {
      if (checkoutDateObj.getTime() <= checkinDateObj.getTime()) {
        const nextDay = new Date(formatDate(checkinDateObj.toISOString(), { nextDay: true } ));
        setLocalState({ ...localState, checkoutDateString: "", checkoutDateObj: null, minCheckoutDateObj: nextDay });
      }
    }
  }, [ localState.checkinDateObj, localState.checkoutDateObj ]);

  return (
    <div id="booking" className={`section ${styles.bookingHomeSection}`}>
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
                  {
                    localState.checkinCalVisible
                    ?
                    <Calendar 
                      className={ styles.checkinCal } 
                      view="month"
                      minDate={ localState.minCheckInDateObj }
                      prev2Label={ null }
                      next2Label= {null }
                      onClickDay={ handleCheckInChange }
                    />
                    :
                    null
                  }
                  <div className="form-group">
                    <span className="form-label">{t("checkIn")}</span>
                    <input className="form-control" onFocus={ toggleCheckinCalendar } onChange={ handleInputChange } value={ localState.checkinDateString } placeholder="...check-in date" />
                  </div>
                </div>
                <div className="col-md-4">
                {
                    localState.checkoutCalVisible
                    ?
                    <Calendar 
                      className={ styles.checkinCal } 
                      view="month"
                      minDate={ localState.minCheckoutDateObj }
                      prev2Label={ null }
                      next2Label= {null }
                      onClickDay={ handleCheckoutChange }
                    />
                    :
                    null
                  }
                  <div className="form-group">
                    <span className="form-label">{t("checkOut")}</span>
                    <input className="form-control" onFocus={ toggleCheckoutCalendar } onChange={ handleInputChange } value={ localState.checkoutDateString } placeholder="...check-out date" disabled={ localState.checkinDateObj ? false : true } />
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
// helpers //
function addZero(number) {
  if(number < 10) {
    number = "0" + number;
  }
  return number;
};
function formatAMPM(options) {
  let minutes = addZero(options.minutes);
  let hour = options.hour;
  if(hour < 12) {
    if(hour === 0) {
      return `12:${minutes} AM`;
    }
    else {
      return `${hour}:${minutes} AM`;
    }
  }
  else {
    if(hour === 12) {
      return `12:${minutes} PM`;
    }
    else {
      hour = hour - 12;
      return `${hour}:${minutes} PM`;
    }
  }
};

/**
 * Converts an ISO date string into a readable format.
 * @param {string} date - "A string in ISO date format".
 * @param {Object} options - "An options object".
 * @param {boolean} options.military - "An option for a 24hr format".
 * @returns {string} - A readable format for a post.
 */
export const formatDate = (date, options) => {
  if(!date) {
    return "";
  }
  if(typeof date !== "string") {
    throw new TypeError(`Expected a ISO date string instead saw ${typeof date}`);
  }
  const dateObj = new Date(date);
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth() + 1;
  let day = dateObj.getDate();
  let hour = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  if(options.military) {
    hour = addZero(hour);
    minutes = addZero(minutes);
    return `${month}-${day}-${year}, ${hour}:${minutes}`;
  }
  else {
    let timeOfDay = formatAMPM({hour: hour, minutes: minutes});
    return  `${month}-${day}-${year}, ${timeOfDay}`;
  }
};
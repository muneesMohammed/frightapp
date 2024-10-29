import React, { useEffect, useState } from 'react';

const TimeConverter = ({ utcTime }) => {
  const [localTime, setLocalTime] = useState('');

  // Function to convert UTC time to local time
  const convertToLocalTime = (utcTime) => {
    // Get the user's time zone using the Intl API
    // const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;

    // Create a Date object from the UTC time string
    const dateObj = new Date(utcTime);

    // Get individual date and time components
    const year = dateObj.getFullYear();
    const month = (`0${dateObj.getMonth() + 1}`).slice(-2); // Ensure 2-digit month
    const day = (`0${dateObj.getDate()}`).slice(-2);        // Ensure 2-digit day
    const hours = (`0${dateObj.getHours()}`).slice(-2);      // Ensure 2-digit hours
    const minutes = (`0${dateObj.getMinutes()}`).slice(-2);  // Ensure 2-digit minutes
    // const seconds = (`0${dateObj.getSeconds()}`).slice(-2);  // Ensure 2-digit seconds

    // Format as YYYY-MM-DD HH:MM:SS
    const localTimeStr = `${hours}:${minutes}, ${day}-${month}-${year}`;

    

    return localTimeStr;
  };

  useEffect(() => {
    // Convert and set the local time when the component mounts
    const convertedTime = convertToLocalTime(utcTime);
    setLocalTime(convertedTime);
  }, [utcTime]);

  return (
    <div>
      <p>{localTime}</p>
    </div>
  );
};

export default TimeConverter;

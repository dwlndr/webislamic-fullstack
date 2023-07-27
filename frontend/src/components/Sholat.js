import React, { useEffect, useState } from "react";
import axios from "axios";
import './css/sholat/sholat.css';

import Navbar from "./Navbar";

const Sholat = () => {
  const [prayerTimes, setPrayerTimes] = useState({});
  const [currentDate, setCurrentDate] = useState("");

  useEffect(() => {
    const getUserLocation = () => {
      if (!navigator.geolocation) {
        alert('Geolocation tidak didukung, gunakan browser lain');
      } else {
        navigator.geolocation.getCurrentPosition(success, error);
      }
    };

    const getPrayerTimes = (latitude, longitude) => {
      fetch(
        `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=4`
      )
        .then((res) => res.json())
        .then(function (res) {
          let date = new Date();
          let today = date.getDate() - 1;
          let data = res.data[today].timings;
          setPrayerTimes(data);
        });
    };

    const getCurrentDate = () => {
      let date = new Date();
      let options = { year: 'numeric', month: 'long', day: 'numeric' };
      let formattedDate = date.toLocaleDateString(undefined, options);
      let hours = String(date.getHours()).padStart(2, '0');
      let minutes = String(date.getMinutes()).padStart(2, '0');
      let seconds = String(date.getSeconds()).padStart(2, '0');
      let formattedTime = `${hours}:${minutes}:${seconds}`;
      setCurrentDate(`${formattedDate} - ${formattedTime}`);
    };

    const success = (position) => {
      getPrayerTimes(
        position.coords.latitude,
        position.coords.longitude
      );
    };

    const error = () => {
      getPrayerTimes('-7.007328320843076' , '110.44175439116859');
    };

    getUserLocation();

    getCurrentDate(); // Initial call to set the current date and time

    const interval = setInterval(() => {
      getCurrentDate(); // Update the current date and time every second
    }, 1000);

    return () => {
      clearInterval(interval); // Clean up the interval when the component is unmounted
    };
  }, []);

  return (
    <div>
      <Navbar />
      <section id="hero-sholat" className="hero is-fullheight is-fullwidth">
        <h1>Prayer Times</h1>
        <div id="tanggalini">{currentDate}</div>
        <div className="table-sholat">
          <table className="table mt-5">
            <tbody>
              <tr>
                <th width="500px">Prayer Time</th>
                <th width="200px">Time</th>
              </tr>
              {Object.entries(prayerTimes).map(([name, time], index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>{time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default Sholat;

import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');

  useEffect(() => {
    // Define the OTPLESS callback function
    const callback = (otplessUser) => {
      try {
        const emailMap = otplessUser.identities.find(
          (item) => item.identityType === "EMAIL"
        );

        const mobileMap = otplessUser.identities.find(
          (item) => item.identityType === "MOBILE"
        )?.identityValue;

        const token = otplessUser.token;

        const email = emailMap?.identityValue;

        const mobile = mobileMap?.identityValue;

        const name = emailMap?.name || mobileMap?.name;

        console.log(otplessUser);

        // Implement your custom logic here.
      } catch (error) {
        console.error('Error handling user info:', error);
      }
    };

    // Initialize OTPLESS SDK with the defined callback.
    window.OTPlessSignin = new window.OTPless(callback);
  }, []);

  const phoneAuth = () => {
    try {
      window.OTPlessSignin.initiate({
        channel: "PHONE",
        phone: mobile,
        countryCode: "+91",
      });
    } catch (error) {
      console.error('Error initiating phone authentication:', error);
    }
  };

  const verifyOTP = () => {
    try {
      console.log('Verifying OTP:', otp);
      window.OTPlessSignin.verify({
        channel: "PHONE",
        phone: mobile,
        otp,
        countryCode: "+91",
      });
    } catch (error) {
      console.error('Error verifying OTP:', error);
    }
  };
  return (
    <div className="container">
    <h1>Hello</h1>
    <div>
      <input 
        id="mobile-input" 
        placeholder="Enter mobile number" 
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
      />
      <button onClick={phoneAuth}>Request OTP</button>
    </div>
    <div id="otp-section">
      <input 
        id="otp-input" 
        placeholder="Enter OTP" 
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button onClick={verifyOTP}>Verify OTP</button>
    </div>
  </div>
  );
}

export default App;

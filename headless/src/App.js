import React, { useState, useEffect } from 'react';

const App = () => {
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSection, setOtpSection] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const callback = (otplessUser) => {
      try {
        const emailMap = otplessUser.identities.find(
          (item) => item.identityType === "EMAIL"
        );

        const mobileMap = otplessUser.identities.find(
          (item) => item.identityType === "MOBILE"
        )?.identityValue;

        setUser(otplessUser);
        setOtpSection(false); // Hide OTP section if user is successfully authenticated

        console.log(otplessUser, "User DATA");
      } catch (error) {
        console.error('Error handling user info:', error);
      }
    };

    // Check if OTPLESS SDK is loaded
    if (window.OTPless) {
      window.OTPlessSignin = new window.OTPless(callback);
      setSdkLoaded(true);
    } else {
      console.error('OTPless SDK not found');
    }
  }, []);

  const phoneAuth = () => {
    try {
      if (!sdkLoaded) {
        console.error('OTPless SDK not initialized');
        return;
      }

      window.OTPlessSignin.initiate({
        channel: "PHONE",
        phone: mobile,
        countryCode: "+91",
      });

      setOtpSection(true); // Show OTP section after initiating phone authentication
    } catch (error) {
      console.error('Error initiating phone authentication:', error);
    }
  };

  const verifyOTP = () => {
    try {
      if (!sdkLoaded) {
        console.error('OTPless SDK not initialized');
        return;
      }

      console.log('Verifying OTP:', otp);
      window.OTPlessSignin.verify({
        channel: "PHONE",
        phone: mobile,
        otp,
        countryCode: "+91",
      });

      // Handle success/failure of OTP verification here
    } catch (error) {
      console.error('Error verifying OTP:', error.message);
    }
  };

  return (
    <div className="container">
      <h2 style={{ color: "White", backgroundColor: "black", textAlign: "center" }}>React Headless OTPLESS integration</h2>
      <div style={{ marginLeft: "30%" }}>
        <input
          id="mobile-input"
          placeholder="Enter mobile number"
          value={mobile}
          onChange={(e) => setMobile(e.target.value)}
          style={{ marginRight: "14px" }}
        />
        <button onClick={phoneAuth}>Request OTP</button>
      </div>
      {otpSection && (
        <div id="otp-section" style={{ marginLeft: "30%" ,marginTop:"1%"}}>
          <input
            id="otp-input"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{ marginRight: "14px" }}
          />
          <button onClick={verifyOTP}>Verify OTP</button>
        </div>
      )}
      {user && (
        <div>
          <h2>User Information:</h2>
          <pre>{JSON.stringify(user, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default App;

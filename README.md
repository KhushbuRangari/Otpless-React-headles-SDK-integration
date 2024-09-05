# Otpless-React-integration
**1.** Imports and Component Definition
jsx


import React, { useState, useEffect } from 'react';

const App = () => {
  // State variables
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState("");
  const [otpSection, setOtpSection] = useState(false);
  const [sdkLoaded, setSdkLoaded] = useState(false);
  const [user, setUser] = useState({});

  
Imports: React and hooks (useState, useEffect) are imported from the react library.
State Variables:
mobile: Stores the mobile number input by the user.
otp: Stores the OTP input by the user.
otpSection: A boolean to control whether the OTP input section is visible or not.
sdkLoaded: A boolean to track if the OTPLESS SDK is loaded.
user: An object to store user information after successful authentication.


**2.** Effect Hook for SDK Initialization
jsx

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
  
useEffect Hook: Runs once when the component mounts.
Callback Function:
Purpose: This function is called by the OTPLESS SDK when user authentication is successful.
otplessUser: Contains user data, including identities (email, mobile).
setUser: Updates the state with user data.
setOtpSection(false): Hides the OTP section after successful authentication.
Error Handling: Logs any errors encountered when processing the user information.
SDK Initialization:
Checks if the OTPLESS SDK (window.OTPless) is available.
Initializes the SDK with the callback function and updates the sdkLoaded state.


**3.** Phone Authentication Function
jsx

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
phoneAuth Function:
Purpose: Initiates phone authentication via OTP.
Checks if the SDK is loaded before making the request.
window.OTPlessSignin.initiate: Calls the SDK method to start phone authentication with the provided mobile number and country code.
setOtpSection(true): Shows the OTP input section after initiating authentication.
Error Handling: Logs any errors that occur during initiation.

**4.**Verify OTP Function
jsx

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
      console.error('Error verifying OTP Or OTP Expired:', error);
    }
  };
verifyOTP Function:
Purpose: Verifies the OTP entered by the user.
Checks if the SDK is loaded before making the request.
window.OTPlessSignin.verify: Calls the SDK method to verify the OTP.
Error Handling: Logs any errors that occur during verification.
5. Render the Component
jsx

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


JSX Layout:
Mobile Input: An input field for the user to enter their mobile number.
Request OTP Button: Triggers the phoneAuth function.
OTP Section: Conditionally renders if otpSection is true, showing the OTP input field and verify button.
User Information: Conditionally renders if user contains data, displaying the user information in JSON format.

import "./App.css";
import { useState, useRef } from "react";

function App() {
  const [showPopup, setShowPopup] = useState(false);
  const inputRefs = useRef([]);

  const handleGetOTPClick = () => {
    setShowPopup(true);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleInputChange = (index, e) => {
    const nextIndex = index + 1;

    // If the entered value is not a number, don't do anything
    if (isNaN(e.target.value)) {
      return;
    }

    // Update the input value
    inputRefs.current[index].value = e.target.value;

    // Move focus to the next input field if available
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    }
  };

  // This function is for the arrow key functionality
  const handleInputKeyDown = (index, e) => {
    if (e.key === "Backspace") {
      if (index > 0) {
        inputRefs.current[index-1].focus();
      } else {
        inputRefs.current[index].value = "";
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1].focus();
    } else if (e.key === "ArrowRight" && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  return (
    <div className="App">
      <button className="main__button__otp" onClick={handleGetOTPClick}>
        GET OTP
      </button>

      {/* Modal Section begins here */}
      {showPopup && (
        <div className="popup__overlay">
          <div className="popup">
            <p onClick={closePopup} className="close__popup">
              X
            </p>
            <h2>Phone Verification</h2>
            <div>
              <p className="instuctions__to__enter__otp">
                Enter the OTP received on 89206-6XXX
              </p>
              {[...Array(6)].map((_, index) => (
                <input
                  key={index}
                  type="number"
                  maxLength="1"
                  ref={(ref) => (inputRefs.current[index] = ref)}
                  onChange={(e) => handleInputChange(index, e)}
                  onKeyDown={(e) => handleInputKeyDown(index, e)}
                />
              ))}
            </div>

            <div className="resend__change__otp">
              <p>Change Number</p>
              <p>Re-send OTP</p>
            </div>

            <div className="verify__div">
              <button
                className="verify__button"
              >
                Verify Phone Number
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

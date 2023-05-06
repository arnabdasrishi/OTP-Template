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

  const handleInputNext = (index, e) => {
    const nextIndex = index + 1;
  
    if (isNaN(e.target.value)) {
      return;
    }
  

    inputRefs.current[index].value = e.target.value;
  

    if (e.target.value.length === 6 && index === 0) {
      const otp = e.target.value.split("");
      otp.forEach((digit, i) => {
        inputRefs.current[i].value = digit;
      });
    }
  
    if (nextIndex < inputRefs.current.length) {
      inputRefs.current[nextIndex].focus();
    }
  };
  

  // This function is for the arrow key functionality and backspace
  const handleArrowKey = (index, e) => {
    if (e.key === "Backspace") {
      if (inputRefs.current[index].value === "") {

        if (index > 0) {
          inputRefs.current[index - 1].value = "";
          inputRefs.current[index - 1].focus();
        }
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
              ❌
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
                  onChange={(e) => handleInputNext(index, e)}
                  onKeyDown={(e) => handleArrowKey(index, e)}
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

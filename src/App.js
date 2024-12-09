import { useEffect, useState } from "react";
import Lazy from "../src/Route/Lazy";
// import nointernetImg from "../src/assets/images/nointernet.png";
import nointernetImg from "../src/assets/images/noInternet1.png";
// import "../src/assets/css/style.css";
import "../src/assets/css/app.css";
import "../src/assets/css/app.min.css";
import "../src/assets/css/app.min.css.map";
import "../src/assets/css/style.css";
import { AttendanceProvider } from "./AttendanceContext";

function App() {
  // state variable holds the state of the internet connection
  const [isOnline, setOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    function handleOnline() {
      setOnline(true);
    }

    function handleOffline() {
      setOnline(false);
    }
    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  return (
    <div className="App">
      {isOnline ? (
        <AttendanceProvider>
          <Lazy />
        </AttendanceProvider>
      ) : (
        <div className="home-page">
          <div className="container-fluid main-container">
            {/* <div className="row library-row center-me padding-top-40-percent">
              
              <div className="col-12 center-me">
              <div className="errorimagediv center-me">
                <img src={nointernetImg} alt="nointernet" className="errorimage" />
              </div>
                <h1 className="text-white text-center heading-error">
                  Internet Connection Error
                </h1>
                <p className="mb-4 text-white">
                  Please check your connection and try again.
                </p>
              </div>
            </div> */}
            <div className="row justify-content-center align-items-center vh-100">
              <div className="col-md-6 text-center">
                <h1 className="text-center modal-text-que gilroysemibold fw-bold">
                  Something went wrong
                </h1>
                <p className="text-center modal-text-que gilroyregular mb-4">
                  Couldn&apos;t fetch the widget.try again
                </p>
                <img
                  src={nointernetImg}
                  className="img-fluid"
                  alt="Image"
                  style={{ height: "90px", width: "90px" }}
                />

                <br />
                {/* <button
                  type="button"
                  className="btn consumerCard px-5 sign-up-button-color text-white gilroysemibold float-center mt-4"
                  id="plalist-button-yes"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                >
                  Close
                </button> */}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

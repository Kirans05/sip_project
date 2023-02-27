import React, { useState, useEffect } from "react";
import { RxCross2 } from "react-icons/rx";

function Alert({ message, duration, type }) {
  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);
    return () => clearTimeout(timer);
  }, [duration]);

  return showAlert ? (
    <div className="absolute bottom-14 left-3 w-1/2 md:w-1/4">
      {type == "success" ? (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 flex items-center justify-between"
          role="alert"
        >
          <div>
            <p className="font-bold">Success!</p>
            <p>{message}</p>
          </div>
          <RxCross2
            className="text-2xl hover:cursor-pointer"
            onClick={() => setShowAlert(false)}
          />
        </div>
      ) : (
        <div
          className="bg-yellow-200 border-l-4 border-yellow-500 text-yellow-700 p-4 flex items-center justify-between"
          role="alert"
        >
          <div>
            <p className="font-bold">Warning!</p>
            <p>{message}</p>
          </div>
          <RxCross2
            className="text-2xl hover:cursor-pointer"
            onClick={() => setShowAlert(false)}
          />
        </div>
      )}
    </div>
  ) : null;
}

export default Alert;

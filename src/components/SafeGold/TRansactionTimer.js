import React, { useEffect, useState } from "react";

const TRansactionTimer = ({ timerExpired }) => {
  const [counter, setCounter] = React.useState(540);
  React.useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);

    if (counter == 0) {
      clearInterval(timer);
      timerExpired();
    }

    return () => clearInterval(timer);
  }, [counter]);
  return (
    <div>
      <h1>{counter} seconds</h1>
    </div>
  );
};

export default TRansactionTimer;

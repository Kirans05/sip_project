import { useState } from 'react';

export default function Camera() {
  const [stream, setStream] = useState(null);
  const [error, setError] = useState(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(stream);
    } catch (error) {
      setError(error);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
  };

  return (
    <>
      {stream ? (
        <video srcObject={stream} autoPlay />
      ) : (
        <button onClick={startCamera}>Start Camera</button>
      )}
      {error && <p>{error.message}</p>}
      {stream && <button onClick={stopCamera}>Stop Camera</button>}
    </>
  );
}

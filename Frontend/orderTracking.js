import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const OrderTracking = ({ orderId }) => {
  const [status, setStatus] = useState("Pending");

  useEffect(() => {
    socket.emit("track-order", orderId);

    socket.on("order-update", (data) => {
      if (data.orderId === orderId) {
        setStatus(data.status);
      }
    });

    return () => socket.disconnect();
  }, [orderId]);

  return <h3>Order Status: {status}</h3>;
};

export default OrderTracking;

"use client";

import { useState } from "react";

import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage } = useSocket();

  const [message, setMessage] = useState("");

  return (
    <div>
      <div>
        <h2>All messages will appear here</h2>
      </div>
      <div>
        <input
          placeholder="Message..."
          onChange={(e) => setMessage(e.target.value)}
          className={classes["chat-input"]}
        />
        <button
          onClick={() => sendMessage(message)}
          className={classes["button"]}
        >
          Send
        </button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";

import { useSocket } from "../context/SocketProvider";
import classes from "./page.module.css";

export default function Page() {
  const { sendMessage, messages } = useSocket();

  const [message, setMessage] = useState("");

  return (
    <div>
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

      <div>
        {messages.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
import { usePubSub } from "@/hooks/usePubSub";
import React, { useEffect, useState } from "react";

const Publisher = ({ publish }) => {
  const [message, setMessage] = useState("");

  const sendMessage = () => {
    if (!message.trim()) return;
    publish("govind", message);
    setMessage("");
  };

  return (
    <div className="p-4 border border-gray-500 rounded">
      <h3 className="font-bold mb-2">I will notify everyone</h3>
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border p-2 mr-2 rounded-md"
        placeholder="Type message..."
      />
      <button onClick={sendMessage} className="bg-blue-500 text-white px-4 py-2 rounded-md">
        Send
      </button>
      <Button
        onClick={() => {
          publish("alert");
        }}
      >
        Alert button
      </Button>
    </div>
  );
};

const Subscribers = ({ name, subscribe, eventName = "govind", unsubscribe }) => {
  const [messages, setMessages] = useState([]);

  const appendCallbackFN = (newMSG) => {
    setMessages((prev) => [...prev, newMSG]);
  };

  const showAleert = () => {
    window.alert(`hey alert from ${name}`);
  };
  useEffect(() => {
    subscribe("govind", appendCallbackFN);
    if (eventName === "alert") {
      subscribe(eventName, showAleert);
    }

    return () => {
      unsubscribe(eventName, appendCallbackFN);
      if (eventName === "alert") {
        unsubscribe(eventName, showAleert);
      }
    };
  }, []);

  console.log("subsss comp");

  return (
    <div className="p-4 border border-gray-600 rounded mt-4">
      <h3 className="font-bold mb-2">Subscriber {name}</h3>
      <ul>
        {messages.map((msg, idx) => (
          <li key={idx} className="py-1">
            {msg}
          </li>
        ))}
      </ul>
    </div>
  );
};

const PubSub = () => {
  const { publish, subscribe, unsubscribe } = usePubSub();

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-xl font-bold mb-4">Functional Pub/Sub Demo</h2>
      <Publisher publish={publish} />
      <Subscribers name="A" subscribe={subscribe} unsubscribe={unsubscribe} eventName="alert" />
      <Subscribers name="B" subscribe={subscribe} unsubscribe={unsubscribe} />
      <Subscribers name="C" subscribe={subscribe} unsubscribe={unsubscribe} eventName="alert" />
    </div>
  );
};

export default PubSub;

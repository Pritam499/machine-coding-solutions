import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:4000');

export default function Chat({ username }) {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const chatBoxRef = useRef(null);

  useEffect(() => {
    socket.on('message', (msg) => {
      setChat((prev) => [...prev, msg]);
    });

    return () => {
      socket.off('message');
    };
  }, []);

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chat]);

  const sendMessage = () => {
    if (!message.trim()) return;
    // Send message with username
    socket.emit('message', { user: username, text: message });
    setMessage('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div>
      <h2>Simple Chat - User: {username}</h2>
      <div ref={chatBoxRef} style={{ height: 250, overflowY: 'auto', border: '1px solid black' }}>
        {chat.length === 0 ? (
          <p>No messages yet</p>
        ) : (
          chat.map((msg, i) => (
            <div key={i}>
              <b>{msg.user}:</b> {msg.text}
            </div>
          ))
        )}
      </div>
      <input
        type="text"
        value={message}
        placeholder="Type a message"
        onChange={(e) => setMessage(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}



// import React, { useState, useEffect, useRef } from 'react';
// import { io } from 'socket.io-client';

// const socket = io('http://localhost:4000');

// export default function Chat() {
//   const [message, setMessage] = useState('');
//   const [chat, setChat] = useState([]);

//   const chatBoxRef = useRef(null);

//   useEffect(() => {
//     socket.on('message', (msg) => {
//       setChat((prev) => [...prev, msg]);
//     });

//     return () => {
//       socket.off('message');
//     };
//   }, []);

//   useEffect(() => {
//     if (chatBoxRef.current) {
//       chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
//     }
//   }, [chat]);

//   const sendMessage = () => {
//     if (!message.trim()) return;
//     socket.emit('message', message);
//     setMessage('');
//   };

//   const handleKeyPress = (e) => {
//     if (e.key === 'Enter') sendMessage();
//   };

//   return (
//     <div>
//       <h2>Simple Chat</h2>
//       <div ref={chatBoxRef} style={{ height: 250, overflowY: 'auto', border: '1px solid black' }}>
//         {chat.length === 0 ? (
//           <p>No messages yet</p>
//         ) : (
//           chat.map((msg, i) => <div key={i}>{msg}</div>)
//         )}
//       </div>
//       <input
//         type="text"
//         value={message}
//         placeholder="Type a message"
//         onChange={(e) => setMessage(e.target.value)}
//         onKeyPress={handleKeyPress}
//       />
//       <button onClick={sendMessage}>Send</button>
//     </div>
//   );
// }

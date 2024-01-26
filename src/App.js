import React, { useState } from 'react';
import ChatList from './components/ChatList/ChatList';
import ChatInput from './components/ChatInput/ChatInput';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);

  const handleNewMessages = (newMessages) => {
    setMessages(newMessages);
  };


  return (
    <div className="App">
      <div className="App-sidebar">
        <ChatInput onNewMessages={handleNewMessages} />
      </div>
      <div className="App-main">
        <ChatList messages={messages}  />
      </div>
    </div>
  );
}

export default App;

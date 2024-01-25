import React from 'react';
import './ChatList.css';


function MyComponent({ highlightedText }) {
  return (
    <span className="chat-message" dangerouslySetInnerHTML={{ __html: highlightedText }} />
  );
}

function ChatList({ messages }) {
  // Assuming 'chats' is the state that holds chat data
  function formatDateTime(dateTimeStr) {
    const date = new Date(dateTimeStr);
  
    // 월과 일을 구합니다. getMonth()는 0부터 시작하므로 1을 더해줍니다.
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    // 시간과 분을 구합니다.
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0'); // 분이 한 자리일 경우 앞에 0을 추가
  
    // 원하는 형식으로 문자열을 반환합니다.
    return `${month}/${day} ${hours}:${minutes}`;
  }

  
  return (
    <section className="chat-list">
      {[...messages].reverse().map((msg) => (
        <div key={msg._id} className="chat-item">
          <span className="chat-time">{formatDateTime(msg.timeStamp)}</span>
          <span className="chat-name">{msg.userName}</span>
          <MyComponent highlightedText={msg.content} />
        </div>
      ))}
    </section>
  );
}

export default ChatList;
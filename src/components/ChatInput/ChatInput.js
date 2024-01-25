import React, { useState } from 'react';
import './ChatInput.css'; // 여기에 CSS 스타일을 정의합니다.

function ChatInput({ onNewMessages }) {

  function highlightKeyword(content, keyword) {
    if (!keyword) return content; // 키워드가 없으면 원본 내용을 반환
  
    const regex = new RegExp(`(${keyword})`, 'gi');
    return content.replace(regex, `<span style="color: yellow;">$1</span>`);
  }
  


  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [nicknameSearch, setNicknameSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [optionSearch, setOptionSearch] = useState('');

  // 이벤트 핸들러 함수들
  const handleNicknameDuplicateChange = (e) => {
    setIsNicknameDuplicate(e.target.checked);
  };

  const handleNicknameSearchChange = (e) => {
    setNicknameSearch(e.target.value);
  };

  const handleItemSearchChange = (e) => {
    setItemSearch(e.target.value);
  };

  const handleOptionSearchChange = (e) => {
    setOptionSearch(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // 데이터를 서버로 보내는 함수
    try {
      if (itemSearch === ""){
        return 
      }

      const response = await fetch('http://localhost:8000/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: itemSearch,
          userName: nicknameSearch
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();

      data.map((msg) =>{
        msg.content = highlightKeyword(msg.content,itemSearch);
      })
      
      onNewMessages(data)
      
      //console.log(data); // 여기에 검색 결과 처리 로직을 추가할 수 있습니다.

    } catch (error) {
      console.error('검색 요청 실패:', error);
    }
  };
  

  return (
    <section className='leftSection'>
      <div className="chatInput">
        <h1 style={{ color: 'rgb(61, 213, 109)' }}>디코 채팅 검색하기</h1>
        <div>
          <label>닉네임 포함 검색</label>
          <input
            type="text"
            value={nicknameSearch}
            onChange={handleNicknameSearchChange}
            placeholder="닉네임 입력"
          />
        </div>
        <div>
          <label>아이템 검색</label>
          <input
            type="text"
            value={itemSearch}
            onChange={handleItemSearchChange}
            placeholder="노우"
          />
        </div>
        <div>
          <label>옵션1 검색</label>
          <input
            type="text"
            value={optionSearch}
            onChange={handleOptionSearchChange}
            placeholder="1상,2상"
          />
        </div>
        <button onClick={handleSubmit}>검색</button>
        <div className='notice'>
          <div className='text'>
            중복된 채팅은 한번만 노출됩니다.
          </div>
          <div className='text'>
            기타문의 : hereokay88@gmail.com
          </div>
          <div className='text'>
            개발 초기 UI입니다. 빠르게 개선하겠습니다
          </div>
        </div>
        <div>
        <div>
          사용방법
        </div>
        <div>
            1 : 원하는 아이템 or 채팅 검색 
          </div>
          <div>
            2 : 사용자 이름 클릭
          </div>
          <div>
            3 : 디스코드 - 다이렉트 메시지 - 대화찾기 또는 시작하기
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatInput;

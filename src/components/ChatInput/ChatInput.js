import React, { useState } from 'react';
import './ChatInput.css'; // 여기에 CSS 스타일을 정의합니다.

function ChatInput({ onNewMessages }) {

  function highlightKeyword(content, keyword, option) {
    // 키워드와 옵션이 없으면 원본 내용을 반환
    if (!keyword && !option) return content;

    let highlightedContent = content;

    // 키워드를 공백으로 나누어 배열 생성
    if (keyword) {
        const keywords = keyword.split(" ");
        keywords.forEach(word => {
            const keywordRegex = new RegExp(`(${word})`, 'gi');
            highlightedContent = highlightedContent.replace(keywordRegex, `<span style="color: yellow;">$1</span>`);
        });
    }

    // 옵션 처리  
    if (option) {
        const optionRegex = new RegExp(`(${option})`, 'gi');
        highlightedContent = highlightedContent.replace(optionRegex, `<span style="color: green;">$1</span>`);
    }

    return highlightedContent;
}



  const [isNicknameDuplicate, setIsNicknameDuplicate] = useState(false);
  const [nicknameSearch, setNicknameSearch] = useState('');
  const [itemSearch, setItemSearch] = useState('');
  const [optionSearch, setOptionSearch] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isChecked, setIsChecked] = useState(false); // 체크박스 상태 관리
  const [isLoading, setIsLoading] = useState(false);



  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked); // 체크박스 상태 업데이트
  };

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
    if (isLoading){
      return;
    }
    e.preventDefault();
  
    // 데이터를 서버로 보내는 함수
    try {
      setIsLoading(true)
      window.scrollTo({
        top: 0, // 맨 위로 이동
        behavior: 'smooth' // 부드러운 스크롤 효과
      });
    
      const address = process.env.REACT_APP_ADDRESS;
      const response = await fetch(address, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          content: itemSearch,
          userName: nicknameSearch,
          optionSearch:optionSearch,
          macro:isChecked
        })
      });
  
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      
      data.map((msg) =>{
        msg.content = highlightKeyword(msg.content,itemSearch,optionSearch);
      })
      
      
      
      onNewMessages(data)
      setErrorMessage(null);
      setIsLoading(false);
      //console.log(data); // 여기에 검색 결과 처리 로직을 추가할 수 있습니다.

    } catch (error) {
      setIsLoading(false);
      setErrorMessage(`검색 요청 실패: ${error.message}`);
      onNewMessages([])
    }
  };
  

  return (
    <section className='leftSection'>
      <div className='h1-text' style={{ color: 'rgb(61, 213, 109)' }}>디코 채팅 검색</div>
      <div className="chatInput">
        <div>
          <label>닉네임 포함 검색</label>
          <input
            type="text"
            value={nicknameSearch}
            onChange={handleNicknameSearchChange}
            placeholder="닉네임"
          />
        </div>
        <div>
          <label>채팅 검색</label>
          <input
            type="text"
            value={itemSearch}
            onChange={handleItemSearchChange}
            placeholder="노우, 잠쩔"
          />
        </div>
        <div>
        <button className='searchButton' onClick={handleSubmit}>{isLoading ? '쿼리중' : '채팅검색'}</button>
        {errorMessage && <div className="error-message">검색할 채팅이 2글자 이상인지 확인해주세요</div>}
        <div className='macro'>
          <input className='macro-btn'
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          />
            <div className='macro-text'>
              매크로 필터링
            </div>
          </div>
        </div>
        <div className='notice'>
          <div style={{ color: 'rgb(61, 213, 109)' }}> 
            기능
          </div>
          <div>
            - 중복채팅 제거
          </div>
          <div>
            - 매크로 필터
          </div>
          <div>
            - 이름 클릭시 디코 메시지로 이동
          </div>
        </div>
      </div>
    </section>
  );
}

export default ChatInput;

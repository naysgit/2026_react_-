import React from 'react';
import './StartScreen.css';

// 프로그램 시작 버튼 클릭 시 실행
const StartScreen = ({ onStart }) => {
  return(
  
    <div className="start-container">
      <div 
        className="overlay">
      </div>
      <div className="content-box">
        <div className="title-section">
          <h1 className="main-title">AI 기반 윤리 시뮬레이터</h1>
          <div 
            className="title-underline">
          </div>
        </div>
        
        <p className="description">
          우리는 일상에서 수많은 선택의 갈림길에 마주합니다.<br />
          트롤리딜레마부터 죄수의 딜레마까지 4가지의 윤리적 실험을 통해<br />
          당신만의 가치관을 확인해보세요.
        </p>

        {/* onStart 호출로 App currentStep을 1로 변경 */}
        <button className="start-button" onClick={onStart}>
          시뮬레이션 시작하기
          <span className="arrow">→</span>
        </button>
      </div>

      <footer className="start-footer">
        © 2026 파이썬프로그래밍 리액트 프로젝트 | 2026200110 나윤서
      </footer>
    </div>
  );
};

export default StartScreen;
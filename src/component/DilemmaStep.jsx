import React from 'react';
import './DilemmaStep.css';

//각 딜레마 화면에 필요한 데이터 props로 전달받기
const DilemmaStep = ({ step, totalSteps, title, description, icon, themeColor, situation, options, onOptionSelect }) => {
  // 현재 단계 기준으로 바 너비를 %로 계산
  const progressWidth = (step / totalSteps) * 100;
  
  return(
    <div className="step-container">
      <div className="progress-container">
        <div 
          className="progress-bar" style={{ width: `${progressWidth}%`, backgroundColor: themeColor }}>
        </div>
        <span 
          className="step-text">Step {step} / {totalSteps}
        </span>
      </div>

      <div className="step-content">
        {/* 딜레마 제목 */}
        <div className="icon-wrapper" style={{ color: themeColor }}>
          {icon}
        </div>
        <h2 
          className="step-title">{title}
        </h2>
        <p 
          className="step-description">{description}
        </p>

        {/* 딜레마 상황 설명 카드박스 */}
        <div className="situation-box">
          <span className="situation-label">📋 상황</span>
          <p className="situation-text">{situation}</p>
        </div>

        {/* 선택지 카드 목록 렌더링 */}
        <div className="options-container">
          {options.map((option) => (
            <button
              key={option.id}
              className="option-card"
              style={{ '--theme-color': themeColor }}
              onClick={() => onOptionSelect(option.id)}
            >
              <div className="option-header">
                <span className="option-badge" style={{ backgroundColor: themeColor }}>
                  선택 {option.id}
                </span>
                <span className="option-label">{option.label}</span>
              </div>
              {/* 선택 시 예상 결과 표시 */}
              <div className="option-result">
                <span className="result-arrow">→</span>
                <span className="result-text">{option.result}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DilemmaStep;

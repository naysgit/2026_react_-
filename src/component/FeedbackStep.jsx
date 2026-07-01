import React from 'react';
import './FeedbackStep.css';

// step: 현재 단계 / dilemma: 현재 딜레마 데이터 / choice: 사용자 선택지 데이터
const FeedbackStep = ({ step, totalSteps, dilemma, choice, onNext }) => {
  // 선택한 choice에서 딜레마선택(피드백) 데이터 추출
  const feedback = choice.feedback;
  // 마지막 단계 여부에 따라 버튼 텍스트 변경
  const isLastStep = step === totalSteps;

  return (
    <div className="feedback-container">
      <div className="feedback-content">
        {/* 딜레마 제목 및 선택 성향 표시 */}
        <div className="feedback-header">
          <span className="feedback-icon">{dilemma.icon}</span>
          <div>
            <p className="feedback-dilemma-name">{dilemma.title}</p>
            <h2 className="feedback-stance" style={{ color: feedback.color }}>
              {feedback.icon} {feedback.stance}
            </h2>
          </div>
        </div>

        {/* 선택한 내용 */}
        <div className="chosen-option">
          <span className="chosen-label">당신의 선택</span>
          <span className="chosen-text">
            {dilemma.options.find(o => o.id === choice.choiceId)?.label}
          </span>
        </div>

        {/* 윤리 이론 */}
        <div className="theory-box" style={{ borderColor: feedback.color }}>
          <div className="theory-meta">
            <span className="theory-name">{feedback.theory}</span>
            <span className="theory-by">— {feedback.theorist}</span>
          </div>
          <p className="theory-description">{feedback.description}</p>
        </div>

        {/* 반대 관점 제시 */}
        <div className="counterpoint-box">
          <span className="counterpoint-label">다른 관점에서 보면</span>
          <p className="counterpoint-text">{feedback.counterpoint}</p>
        </div>

        {/* 마지막 단계면 결과 화면으로, 아니면 다음 딜레마 화면으로 이동 */}
        <button
          className="next-button"
          style={{ backgroundColor: feedback.color }}
          onClick={onNext}
        >
          {isLastStep ? '결과 분석 보기 ->' : `다음 딜레마로 (${step + 1}/${totalSteps}) →`}
        </button>
      </div>
    </div>
  );
};

export default FeedbackStep;

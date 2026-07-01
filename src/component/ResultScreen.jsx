import React from 'react';
import './ResultScreen.css';

// 사용자 선택 패턴에 따라 윤리 성향 분석 및 반환
const analyzeChoices = (choices) => {
  // 각 선택의 stance 키워드로 성향 카운트
  // 공리주의 계열 or 의무론 계열 선택 횟수 카운트
  let utilitarian = 0;
  let deontological = 0;

  //각 선택의 stance 키워드 체크하여 분류
  choices.forEach(c => {
    const stance = c.feedback.stance || '';
    if (stance.includes('공리주의') || stance.includes('결과주의') || stance.includes('게임이론')) {
      utilitarian++;
    } else {
      deontological++;
    }
  });

  // 카운트 결과에 따라 성향 분류
  if (utilitarian === 4) {
    return { label: '순수 공리주의자', desc: '당신은 언제나 결과를 중심으로 판단합니다. 최대 다수의 행복을 위해 어려운 선택도 마다하지 않는 실용적인 윤리관을 지녔습니다.', color: '#e11d48', icon: '⚖️' };
  } else if (deontological === 4) {
    return { label: '일관된 원칙주의자', desc: '당신은 결과보다 행동 자체의 도덕성을 중시합니다. 어떤 상황에서도 원칙을 지키려는 강한 의지를 가지고 있습니다.', color: '#7c3aed', icon: '📜' };
  } else if (utilitarian === 3) {
    return { label: '온건한 공리주의자', desc: '당신은 대체로 결과를 중심으로 판단하지만, 때로는 원칙도 중요하게 여깁니다. 유연하면서도 실용적인 윤리관을 가지고 있습니다.', color: '#f59e0b', icon: '🔆' };
  } else if (deontological === 3) {
    return { label: '온건한 원칙주의자', desc: '당신은 대체로 원칙을 우선하지만, 상황에 따라 결과도 고려할 줄 압니다. 균형 잡힌 도덕적 감수성을 지녔습니다.', color: '#6366f1', icon: '🌿' };
  } else {
    return { label: '균형 잡힌 실용주의자', desc: '당신은 공리주의와 의무론 사이에서 균형을 잡습니다. 상황에 따라 유연하게 판단하는 성숙한 윤리관을 가지고 있습니다.', color: '#10b981', icon: '🤝' };
  }
};

// 딜레마별 테마 색상 매핑
const themeColorMap = {
  '트롤리 딜레마': '#e11d48',
  '우는 아기 딜레마': '#f59e0b',
  '자율주행 알고리즘': '#3b82f6',
  '죄수의 딜레마': '#10b981',
};

// choices: 사용자의 전체 선택 기록 배열 , onRestart: 처음으로 돌아가는 함수
const ResultScreen = ({ choices, onRestart }) => {
  // 선택 기록 분석해서 성향 데이터 추출
  const tendency = analyzeChoices(choices);
  return (
    <div className="result-container">
      <div className="result-content">

        {/* 성향분석 헤더 */}
        <div className="result-header">
          <p className="result-label">시뮬레이션 완료</p>
          <div className="tendency-icon">{tendency.icon}</div>
          <h1 className="result-tendency" style={{ color: tendency.color }}>
            {tendency.label}
          </h1>
          <p className="tendency-desc">{tendency.desc}</p>
        </div>

        {/* 4번의 선택 기록 카드 */}
        <div className="choices-section">
          <h3 className="section-title">📋 나의 선택 기록</h3>
          <div className="choices-list">
            {choices.map((c, i) => (
              <div key={i} className="choice-record">
                <div className="choice-record-left">
                  <span className="choice-num">0{i + 1}</span>
                  <div>
                    <p className="choice-dilemma">
                      <span className="choice-dilemma-icon">{c.dilemmaIcon}</span>
                      {c.dilemmaTitle}
                    </p>
                    <p className="choice-selected">
                      선택한 관점: <strong>{c.feedback.stance}</strong>
                    </p>
                  </div>
                </div>

                {/* 이론명 간략  표시 */}
                <div
                  className="choice-theory-badge"
                  style={{ borderColor: themeColorMap[c.dilemmaTitle] || '#334155', color: themeColorMap[c.dilemmaTitle] || '#94a3b8' }}
                >
                  {c.feedback.theory.split('(')[0].trim()}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 윤리 관점 비율 바 시각화 */}
        <div className="dist-section">
          <h3 className="section-title">🧭 윤리 관점 분포</h3>
          {[
            { label: '공리주의 / 결과주의', count: choices.filter(c => c.feedback.stance.includes('공리주의') || c.feedback.stance.includes('결과주의') || c.feedback.stance.includes('게임이론')).length, color: '#e11d48' },
            { label: '의무론 / 원칙주의', count: choices.filter(c => c.feedback.stance.includes('의무론') || c.feedback.stance.includes('원칙') || c.feedback.stance.includes('계약론') || c.feedback.stance.includes('협력')).length, color: '#7c3aed' },
          ].map((item, i) => (
            <div key={i} className="dist-row">
              <span className="dist-label">{item.label}</span>
              <div className="dist-track">
                <div
                  className="dist-fill"
                  style={{ width: `${(item.count / choices.length) * 100}%`, backgroundColor: item.color }}
                ></div>
              </div>
              <span className="dist-count">{item.count} / {choices.length}</span>
            </div>
          ))}
        </div>

        {/* 다시 하기 */}
        <button className="restart-button" onClick={onRestart}>
          🔄 다시 시작하기
        </button>
      </div>
    </div>
  );
};

export default ResultScreen;

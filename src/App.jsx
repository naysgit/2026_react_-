import { useState } from 'react'
import StartScreen from './component/StartScreen'
import DilemmaStep from './component/DilemmaStep'
import FeedbackStep from './component/FeedbackStep'
import ResultScreen from './component/ResultScreen'

const dilemmaData = [
  {
    title: "트롤리 딜레마",
    description: "다수를 위해 소수를 희생해도 될까요?",
    icon: "🚊",
    themeColor: "#e11d48",
    situation: "당신 앞에 폭주하는 트롤리가 있습니다. 직진하면 선로 위의 5명이 죽고, 레버를 당기면 선로가 바뀌어 1명이 죽습니다. 당신은 레버 옆에 서 있습니다.",
    options: [
      {
        id: 'A',
        label: "레버를 당긴다",
        result: "선로가 바뀌어 1명이 사망합니다. 5명은 살아남습니다."
      },
      {
        id: 'B',
        label: "레버를 당기지 않는다",
        result: "트롤리는 그대로 직진하고 5명이 사망합니다."
      }
    ],
    feedback: {
      A: {
        stance: "공리주의적 선택",
        color: "#e11d48",
        icon: "⚖️",
        theory: "공리주의 (Utilitarianism)",
        theorist: "제레미 벤담 · 존 스튜어트 밀",
        description: "당신은 '최대 다수의 최대 행복'을 선택했습니다. 공리주의는 결과의 총합으로 행위의 옳고 그름을 판단합니다. 5명을 살리기 위해 1명을 희생하는 것은 전체 고통의 양을 최소화하는 합리적 선택입니다.",
        counterpoint: "단, 당신은 직접 누군가의 죽음을 '선택'했습니다. 이 능동적 개입이 도덕적으로 허용되는가에 대한 논쟁은 여전히 존재합니다."
      },
      B: {
        stance: "의무론적 선택",
        color: "#7c3aed",
        icon: "📜",
        theory: "의무론 (Deontology)",
        theorist: "임마누엘 칸트",
        description: "당신은 '행동의 결과보다 행동 자체의 도덕성'을 중시했습니다. 칸트의 의무론에 따르면 타인을 수단으로 이용해서는 안 됩니다. 레버를 당기지 않음으로써 당신은 직접적인 해악 행위를 거부했습니다.",
        counterpoint: "하지만 행동하지 않는 것도 하나의 선택입니다. 5명의 죽음에 대한 도덕적 책임에서 완전히 자유로울 수 있을까요?"
      }
    }
  },
  {
    title: "우는 아기 딜레마",
    description: "모두를 위해 침묵을 강요할 수 있나요?",
    icon: "👶",
    themeColor: "#f59e0b",
    situation: "전시 상황, 적군이 바로 옆을 지나고 있습니다. 피난민 수십 명이 숨죽이고 있는 지하실, 당신 품 안의 아기가 울음을 터뜨립니다. 발각되면 전원 사망입니다.",
    options: [
      {
        id: 'A',
        label: "아기의 입을 막는다",
        result: "아기가 질식할 위험이 있지만, 피난민 전체가 살아남을 수 있습니다."
      },
      {
        id: 'B',
        label: "아기를 그냥 둔다",
        result: "아기는 살지만, 울음소리로 적군에게 발각되어 전원이 위험에 처합니다."
      }
    ],
    feedback: {
      A: {
        stance: "공리주의적 선택",
        color: "#f59e0b",
        icon: "⚖️",
        theory: "결과주의 (Consequentialism)",
        theorist: "피터 싱어",
        description: "당신은 전체의 생존을 위해 한 생명을 희생하는 결과주의적 판단을 내렸습니다. 공리주의 관점에서는 최소의 희생으로 최다를 살리는 이 선택이 도덕적으로 정당화될 수 있습니다.",
        counterpoint: "하지만 당신의 손으로 무고한 생명을 직접 해친다는 사실은 돌이킬 수 없는 심리적·도덕적 무게를 남깁니다. 이 트라우마와 죄책감은 어떻게 감당할 수 있을까요?"
      },
      B: {
        stance: "의무론적 선택",
        color: "#7c3aed",
        icon: "📜",
        theory: "신성불가침의 원칙 (Inviolability of Life)",
        theorist: "임마누엘 칸트 · 자연법 윤리학",
        description: "당신은 무고한 생명을 직접 해치는 행위는 절대적으로 금지된다는 원칙을 따랐습니다. 결과가 어떻든 타인을 수단으로 이용해서는 안 된다는 칸트의 정언명령에 부합하는 선택입니다.",
        counterpoint: "행동하지 않음으로써 더 많은 사람을 위험에 빠뜨린 결과, 당신은 그 책임에서 자유롭다고 할 수 있을까요? 부작위도 하나의 도덕적 선택입니다."
      }
    }
  },
  {
    title: "자율주행 알고리즘",
    description: "사고의 순간, 당신의 선택은?",
    icon: "🚗",
    themeColor: "#3b82f6",
    situation: "자율주행차의 브레이크가 고장났습니다. 직진하면 횡단보도의 보행자 3명이 사망합니다. 방향을 틀면 탑승자인 당신이 벽에 충돌해 사망합니다. AI는 0.1초 안에 결정을 내려야 합니다.",
    options: [
      {
        id: 'A',
        label: "탑승자를 보호하도록 설계",
        result: "차량이 방향을 유지하고 보행자 3명이 사망합니다. 탑승자는 생존합니다."
      },
      {
        id: 'B',
        label: "보행자를 보호하도록 설계",
        result: "차량이 방향을 틀어 벽에 충돌하고 탑승자가 사망합니다. 보행자는 생존합니다."
      }
    ],
    feedback: {
      A: {
        stance: "계약론적 관점",
        color: "#3b82f6",
        icon: "🤝",
        theory: "사회계약론 (Social Contract Theory)",
        theorist: "존 롤스 · 토마스 홉스",
        description: "탑승자 보호 설계는 '제품 구매자와의 계약'을 우선시하는 시장 논리와 맞닿아 있습니다. 소비자는 안전을 기대하며 차량을 구매하고, 제조사는 그 신뢰에 응답해야 한다는 관점입니다.",
        counterpoint: "하지만 이 알고리즘이 공개된다면 보행자들은 자율주행차 앞에서 더 큰 위험에 노출됩니다. 사회 전체의 신뢰와 안전을 무너뜨릴 수 있습니다."
      },
      B: {
        stance: "공리주의적 관점",
        color: "#f59e0b",
        icon: "⚖️",
        theory: "최대다수의 최대행복 + 도덕적 운 (Moral Luck)",
        theorist: "토마스 네이글 · 피터 싱어",
        description: "더 많은 생명을 구하는 알고리즘은 공리주의적으로 정당화됩니다. 또한 보행자는 사고에 아무런 책임이 없다는 점에서, 무고한 다수를 보호하는 것이 윤리적으로 우선될 수 있습니다.",
        counterpoint: "이 알고리즘이 적용된 차를 알면서 탑승할 사람이 있을까요? 실제 상용화를 위해서는 사회적 합의와 법적 책임 구조가 반드시 선행되어야 합니다."
      }
    }
  },
  {
    title: "죄수의 딜레마",
    description: "나의 이익 vs 우리의 신뢰",
    icon: "🤝",
    themeColor: "#10b981",
    situation: "당신과 공범이 각각 격리된 취조실에 있습니다. 서로 연락은 불가능합니다. 둘 다 침묵 → 각 1년형 / 둘 다 자백 → 각 3년형 / 나만 자백, 상대 침묵 → 나는 석방, 상대 10년형.",
    options: [
      {
        id: 'A',
        label: "자백한다 (배신)",
        result: "상대가 침묵하면 나는 석방. 상대도 자백하면 둘 다 3년형."
      },
      {
        id: 'B',
        label: "침묵한다 (협력)",
        result: "상대도 침묵하면 둘 다 1년형. 상대가 자백하면 나만 10년형."
      }
    ],
    feedback: {
      A: {
        stance: "게임이론적 합리성",
        color: "#10b981",
        icon: "🎯",
        theory: "우월 전략 (Dominant Strategy)",
        theorist: "존 폰 노이만 · 존 내시",
        description: "게임이론에서 자백은 '우월 전략'입니다. 상대방이 어떤 선택을 하든, 자백이 항상 나에게 유리한 결과를 가져옵니다. 합리적 개인이라면 자백을 선택하는 것이 논리적입니다.",
        counterpoint: "그러나 두 사람 모두 이 '합리적 선택'을 하면 각 3년형이라는 최악에 가까운 결과를 맞이합니다. 개인의 합리성이 집단의 비합리성을 낳는 역설, 이것이 죄수의 딜레마의 핵심입니다."
      },
      B: {
        stance: "협력과 신뢰의 윤리",
        color: "#6366f1",
        icon: "🌱",
        theory: "덕 윤리학 · 반복 게임 이론",
        theorist: "아리스토텔레스 · 로버트 액설로드",
        description: "침묵(협력)은 상대방에 대한 신뢰와 공동체 의식을 전제합니다. 반복 게임 이론에서 '눈에는 눈(Tit-for-Tat)' 전략이 증명하듯, 장기적으로 협력은 배신보다 더 큰 이익을 가져옵니다.",
        counterpoint: "하지만 단 한 번의 상호작용에서 상대가 배신한다면 당신은 10년형이라는 최악의 결과를 감수해야 합니다. 신뢰는 리스크입니다."
      }
    }
  }
];

function App() {
  // 현재 진행 단계 (0 : 시작 화면 / 1~4: 딜레마 선택 화면 / 5: 결과화면)
  const [currentStep, setCurrentStep] = useState(0);
  // 각 단계 페이즈: dilemma: 딜레마 선택 화면 / feedback: 딜레마 결과(해설)화면
  const [phase, setPhase] = useState('dilemma');
  // 사용자 선택 기록 배열
  const [choices, setChoices] = useState([]); // {step, choiceId, dilemmaTitle} 배열

  // 선택지 클릭 시 선택지 내용 choices에 추가 후 딜레마 결과(해설) 화면으로 이동
  const handleOptionSelect = (choiceId) => {
    const current = dilemmaData[currentStep - 1];
    setChoices(prev => [...prev, {
      step: currentStep,
      choiceId,
      dilemmaTitle: current.title,
      dilemmaIcon: current.icon,
      feedback: current.feedback[choiceId]
    }]);
    setPhase('feedback');
  };

  //딜레마 결과 확인 후 다음 단계 딜레마로 이동
  const handleFeedbackNext = () => {
    setPhase('dilemma');
    setCurrentStep(prev => prev + 1);
  };

  return (
    <div className="App">
      {/* 0단계: 시작화면 */}
      {currentStep === 0 && (
        <StartScreen onStart={() => setCurrentStep(1)} />
      )}

        {/* 1~4단계: 딜레마 선택화면 */}
      {currentStep > 0 && currentStep <= dilemmaData.length && phase === 'dilemma' && (
        <DilemmaStep
          step={currentStep}
          totalSteps={dilemmaData.length}
          {...dilemmaData[currentStep - 1]} //현재 단계 선택 데이터 전달
          onOptionSelect={handleOptionSelect}
        />
      )}

      {/* 1~4단계: 각 딜레마 선택 후 윤리 해설 화면 */}
      {currentStep > 0 && currentStep <= dilemmaData.length && phase === 'feedback' && (
        <FeedbackStep
          step={currentStep}
          totalSteps={dilemmaData.length}
          dilemma={dilemmaData[currentStep - 1]}
          choice={choices[choices.length - 1]} //가장 최근 선택 데이터 전달
          onNext={handleFeedbackNext}
        />
      )}

      {/* 5단계: 최종 결과 화면 */}
      {currentStep > dilemmaData.length && (
        <ResultScreen
          choices={choices}
          onRestart={() => {
            //다시 시작
            // 모든 상태 초기값으로 리셋
            setCurrentStep(0);
            setChoices([]);
            setPhase('dilemma');
          }}
        />
      )}
    </div>
  );
}
export default App;

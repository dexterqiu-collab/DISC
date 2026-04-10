
import { DISCDimension, Question, PersonalityAnalysis } from './types';

export const QUESTIONS: Question[] = [
  // D (Dominance) - 提取自原卷 Q1, Q5, Q9, Q13, Q17
  { id: 1, text: "在意見不同時，我通常是那個最終拍板定案的「決定者」。", dimension: DISCDimension.D },
  { id: 2, text: "我認為自己非常果敢，且樂於接受各種未知的挑戰。", dimension: DISCDimension.D },
  { id: 3, text: "在與人溝通時，我傾向直接了當，甚至帶有一點權威感。", dimension: DISCDimension.D },
  { id: 4, text: "我做事不在乎他人觀感，只要能快速達到成功的目標即可。", dimension: DISCDimension.D },
  { id: 5, text: "我天生喜歡掌握並支配周遭環境，以及影響他人的決策。", dimension: DISCDimension.D },
  
  // I (Influence) - 提取自原卷 Q2, Q6, Q10, Q14, Q18
  { id: 6, text: "在購物或做決定時，我很容易受到友善氛圍與好感受的影響。", dimension: DISCDimension.I },
  { id: 7, text: "我認為做事的重點在於「誰來做」，非常在意過程中的感受。", dimension: DISCDimension.I },
  { id: 8, text: "在會議或團體提案中，我習慣扮演居中「協調者」的角色。", dimension: DISCDimension.I },
  { id: 9, text: "我是一個很熱心的人，非常享受與他人共同工作的樂趣。", dimension: DISCDimension.I },
  { id: 10, text: "我喜歡幫助他人，追求團隊中相親相愛、充滿感情的相處方式。", dimension: DISCDimension.I },

  // S (Steadiness) - 提取自原卷 Q3, Q7, Q11, Q15, Q19
  { id: 11, text: "我擁有非常固定的消費習慣，不喜歡生活中有太大的變化。", dimension: DISCDimension.S },
  { id: 12, text: "與同事發生意見衝突時，我通常會選擇退讓，以和為貴。", dimension: DISCDimension.S },
  { id: 13, text: "我不喜歡在團體中強出頭，寧可擔任後補或支援的角色。", dimension: DISCDimension.S },
  { id: 14, text: "我具備高度的團體意識，習慣順著群眾的意願行動。", dimension: DISCDimension.S },
  { id: 15, text: "我對事情沒有太多要求，喜歡靜靜地、有耐心地完成工作。", dimension: DISCDimension.S },

  // C (Compliance) - 提取自原卷 Q4, Q8, Q12, Q16, Q20
  { id: 16, text: "身邊的朋友常形容我是一個追求「要求完美」的人。", dimension: DISCDimension.C },
  { id: 17, text: "我非常看重工作品質與效率，且具備極強的成本與價值觀念。", dimension: DISCDimension.C },
  { id: 18, text: "在做任何決定前，我會花大量時間研究事務與人的各種細節。", dimension: DISCDimension.C },
  { id: 19, text: "我是一個自我約束力極強、守紀律且凡事依計畫行事的人。", dimension: DISCDimension.C },
  { id: 20, text: "我很少加入閒聊，傾向於找尋更多數據資料來進行外交策略。", dimension: DISCDimension.C },
];

export const ANALYSIS_DATA: Record<string, PersonalityAnalysis> = {
  [DISCDimension.D]: {
    type: "Dominance",
    animal: "老虎",
    title: "開拓領航者",
    color: "#E11D48",
    gradient: "from-rose-500 to-red-600",
    keywords: ["決斷力", "效率至上", "直率"],
    description: "天生的行動派。你渴望成功，勇於承擔風險，在挑戰面前從不退縮。你的直接與高效是推動團隊前進的引擎。",
    workStyle: "高壓、快速、結果導向。你討厭拖泥帶水，喜歡用實力說話。",
    jobs: ["企業家", "高階主管", "專案經理", "法律顧問"]
  },
  [DISCDimension.I]: {
    type: "Influence",
    animal: "孔雀",
    title: "靈感點火者",
    color: "#F59E0B",
    gradient: "from-amber-400 to-orange-500",
    keywords: ["魅力", "樂觀", "影響力"],
    description: "社交舞台上的明星。你具備極強的說服力，總能用熱情感染身邊的人。你的人際網路是你最大的資源。",
    workStyle: "靈活、有趣、充滿互動。你在需要創意與溝通的環境中如魚得水。",
    jobs: ["市場營銷", "公關專員", "培訓講師", "創意總監"]
  },
  [DISCDimension.S]: {
    type: "Steadiness",
    animal: "無尾熊",
    title: "和諧守護者",
    color: "#10B981",
    gradient: "from-emerald-400 to-teal-500",
    keywords: ["包容", "穩定", "誠信"],
    description: "團隊的精神支柱。你溫和、耐心，是極佳的傾聽者。你追求環境的穩定與人際的和諧，是大家的避風港。",
    workStyle: "有節奏、有系統、協作性強。你喜歡按部就班地完成任務，是可信賴的基石。",
    jobs: ["人力資源", "行政專家", "諮詢顧問", "教育工作者"]
  },
  [DISCDimension.C]: {
    type: "Compliance",
    animal: "貓頭鷹",
    title: "精密分析師",
    color: "#2563EB",
    gradient: "from-blue-500 to-indigo-600",
    keywords: ["精確", "邏輯", "嚴謹"],
    description: "邏輯與理性的化身。你天生對數據敏感，追求完美與準確。在採取行動前，你總能洞察隱藏的風險。",
    workStyle: "有序、結構化、專業。你偏好數據支撐的決策，是質量控管的最佳人選。",
    jobs: ["軟體工程師", "數據分析師", "財務審核", "研發人員"]
  },
  "Chameleon": {
    type: "Balanced",
    animal: "變色龍",
    title: "全能協調者",
    color: "#7C3AED",
    gradient: "from-violet-500 to-purple-600",
    keywords: ["適應", "中道", "靈活"],
    description: "人格特質極為平衡。你具備極強的環境適應力，能根據情境隨時切換角色。你是溝通的最佳橋樑。",
    workStyle: "彈性極大。你可以在不同風格的團隊中游刃有餘地切換。",
    jobs: ["外交官", "戰略顧問", "運營總監", "跨國專案管理"]
  }
};

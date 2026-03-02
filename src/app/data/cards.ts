export type Suit = "wands" | "cups" | "swords" | "pentacles";
export type Arcana = "major" | "minor";
export type CourtRank = "page" | "knight" | "queen" | "king";

export interface TarotCard {
  id: string;
  arcana: Arcana;
  name: string;
  number: number;
  suit?: Suit;
  courtRank?: CourtRank;
  keywords: string[];
  uprightMeaning: string;
  reversedMeaning: string;
  primaryColor: string;
  secondaryColor: string;
}

const major: TarotCard[] = [
  { id: "major-00", arcana: "major", name: "愚者",       number: 0,  keywords: ["始まり", "純粋", "自発性"],      uprightMeaning: "新たな始まり、楽観主義、人生への信頼",     reversedMeaning: "無謀さ、リスク、方向性の欠如",           primaryColor: "#f4d03f", secondaryColor: "#85c1e9" },
  { id: "major-01", arcana: "major", name: "魔術師",     number: 1,  keywords: ["意志力", "欲望", "創造"],         uprightMeaning: "力、技術、集中力、行動",                   reversedMeaning: "操作、狡猾さ、未開発の才能",             primaryColor: "#e74c3c", secondaryColor: "#f39c12" },
  { id: "major-02", arcana: "major", name: "女教皇",     number: 2,  keywords: ["直感", "神秘", "内なる知"],       uprightMeaning: "直感、神秘、潜在意識",                     reversedMeaning: "隠れた意図、知識の乱用",                 primaryColor: "#1a5276", secondaryColor: "#a9cce3" },
  { id: "major-03", arcana: "major", name: "女帝",       number: 3,  keywords: ["豊穣", "自然", "豊かさ"],         uprightMeaning: "女性性、美、自然、育み",                   reversedMeaning: "創造の阻害、他者への依存",               primaryColor: "#1e8449", secondaryColor: "#a9dfbf" },
  { id: "major-04", arcana: "major", name: "皇帝",       number: 4,  keywords: ["権威", "構造", "統制"],           uprightMeaning: "父性、権威、安定、法",                     reversedMeaning: "支配、硬直性、規律の欠如",               primaryColor: "#c0392b", secondaryColor: "#cd6155" },
  { id: "major-05", arcana: "major", name: "法王",       number: 5,  keywords: ["伝統", "従順", "霊的知恵"],       uprightMeaning: "伝統、信仰体系、従順",                     reversedMeaning: "反抗、破壊的行動、新しいアプローチ",     primaryColor: "#9b59b6", secondaryColor: "#d7bde2" },
  { id: "major-06", arcana: "major", name: "恋人",       number: 6,  keywords: ["愛", "結合", "選択"],             uprightMeaning: "愛、調和、人間関係、価値観",               reversedMeaning: "不和、アンバランス、方向性のズレ",       primaryColor: "#f39c12", secondaryColor: "#f9e79f" },
  { id: "major-07", arcana: "major", name: "戦車",       number: 7,  keywords: ["統制", "意志力", "勝利"],         uprightMeaning: "統制、意志力、成功、行動",                 reversedMeaning: "統制の欠如、方向性の欠如",               primaryColor: "#2471a3", secondaryColor: "#7fb3d3" },
  { id: "major-08", arcana: "major", name: "力",         number: 8,  keywords: ["勇気", "説得", "忍耐"],           uprightMeaning: "強さ、勇気、忍耐、統制",                   reversedMeaning: "弱さ、自己不信、規律の欠如",             primaryColor: "#d35400", secondaryColor: "#f0b27a" },
  { id: "major-09", arcana: "major", name: "隠者",       number: 9,  keywords: ["内省", "魂の探求", "知恵"],       uprightMeaning: "魂の探求、内省、孤独",                     reversedMeaning: "孤立、孤独、引きこもり",                 primaryColor: "#717d7e", secondaryColor: "#d5d8dc" },
  { id: "major-10", arcana: "major", name: "運命の輪",   number: 10, keywords: ["幸運", "運命", "変化"],           uprightMeaning: "幸運、カルマ、生命の循環、運命",           reversedMeaning: "不運、統制の欠如、執着",                 primaryColor: "#8e44ad", secondaryColor: "#d2b4de" },
  { id: "major-11", arcana: "major", name: "正義",       number: 11, keywords: ["公正", "真実", "法"],             uprightMeaning: "正義、公正さ、真実、因果",                 reversedMeaning: "不公正、無責任",                         primaryColor: "#2e86c1", secondaryColor: "#aed6f1" },
  { id: "major-12", arcana: "major", name: "吊られた男", number: 12, keywords: ["停止", "制限", "手放し"],         uprightMeaning: "停止、制限、手放し、犠牲",                 reversedMeaning: "殉教、優柔不断、遅延",                   primaryColor: "#1e8449", secondaryColor: "#82e0aa" },
  { id: "major-13", arcana: "major", name: "死神",       number: 13, keywords: ["終わり", "変化", "変容"],         uprightMeaning: "終わり、変化、変容、転換",                 reversedMeaning: "変化への抵抗、個人的な変容",             primaryColor: "#1c2833", secondaryColor: "#5d6d7e" },
  { id: "major-14", arcana: "major", name: "節制",       number: 14, keywords: ["バランス", "節度", "忍耐"],       uprightMeaning: "バランス、節度、忍耐、目的",               reversedMeaning: "不均衡、過剰、自己癒し",                 primaryColor: "#1a5276", secondaryColor: "#f0b27a" },
  { id: "major-15", arcana: "major", name: "悪魔",       number: 15, keywords: ["影の自己", "執着", "依存"],       uprightMeaning: "影の自己、執着、依存、物質主義",           reversedMeaning: "制限的な信念の解放、暗い思考の探求",     primaryColor: "#922b21", secondaryColor: "#1c2833" },
  { id: "major-16", arcana: "major", name: "塔",         number: 16, keywords: ["突然の変化", "激変", "混乱"],     uprightMeaning: "突然の変化、激変、混乱、啓示",             reversedMeaning: "個人的変容、変化への恐れ",               primaryColor: "#784212", secondaryColor: "#d35400" },
  { id: "major-17", arcana: "major", name: "星",         number: 17, keywords: ["希望", "信念", "再生"],           uprightMeaning: "希望、信念、目的、刷新、霊性",             reversedMeaning: "信念の欠如、絶望、自己信頼",             primaryColor: "#1a5276", secondaryColor: "#f4d03f" },
  { id: "major-18", arcana: "major", name: "月",         number: 18, keywords: ["幻想", "恐れ", "潜在意識"],       uprightMeaning: "幻想、恐れ、潜在意識、混乱",               reversedMeaning: "恐れの解放、抑圧された感情",             primaryColor: "#154360", secondaryColor: "#aab7b8" },
  { id: "major-19", arcana: "major", name: "太陽",       number: 19, keywords: ["前向き", "楽しみ", "温かみ"],     uprightMeaning: "前向きさ、楽しみ、温かみ、成功、活力",     reversedMeaning: "内なる子、落ち込み、過度の楽観",         primaryColor: "#f39c12", secondaryColor: "#f7dc6f" },
  { id: "major-20", arcana: "major", name: "審判",       number: 20, keywords: ["審判", "再誕", "内なる呼び声"],   uprightMeaning: "内省、審判、覚醒、赦免",                   reversedMeaning: "自己を許せないこと、自己不信",           primaryColor: "#922b21", secondaryColor: "#f4d03f" },
  { id: "major-21", arcana: "major", name: "世界",       number: 21, keywords: ["完成", "統合", "達成"],           uprightMeaning: "完成、統合、達成",                         reversedMeaning: "個人的な完結の追求、遅延",               primaryColor: "#1a5276", secondaryColor: "#1e8449" },
];

const SUIT_COLORS: Record<Suit, [string, string]> = {
  wands:     ["#c0392b", "#f39c12"],
  cups:      ["#1a5276", "#5dade2"],
  swords:    ["#5d6d7e", "#aab7b8"],
  pentacles: ["#1e8449", "#f4d03f"],
};

const SUIT_KEYWORDS: Record<Suit, string[]> = {
  wands:     ["火", "情熱", "創造"],
  cups:      ["水", "感情", "直感"],
  swords:    ["風", "思考", "葛藤"],
  pentacles: ["地", "物質", "労働"],
};

const SUIT_LABELS_JA: Record<Suit, string> = {
  wands:     "ワンド",
  cups:      "カップ",
  swords:    "ソード",
  pentacles: "ペンタクル",
};

const COURT: Array<{ rank: CourtRank; label: string }> = [
  { rank: "page",   label: "ペイジ"   },
  { rank: "knight", label: "ナイト"   },
  { rank: "queen",  label: "クイーン" },
  { rank: "king",   label: "キング"   },
];

function buildMinor(): TarotCard[] {
  const cards: TarotCard[] = [];
  const suits: Suit[] = ["wands", "cups", "swords", "pentacles"];

  for (const suit of suits) {
    const [pc, sc] = SUIT_COLORS[suit];
    const kw = SUIT_KEYWORDS[suit];
    const suitLabel = SUIT_LABELS_JA[suit];

    // Pip cards 1-10
    for (let n = 1; n <= 10; n++) {
      const rankLabel = n === 1 ? "エース" : String(n);
      cards.push({
        id: `minor-${suit}-${n}`,
        arcana: "minor",
        name: `${suitLabel}の${rankLabel}`,
        number: n,
        suit,
        keywords: kw,
        uprightMeaning: `${suitLabel}のエネルギー`,
        reversedMeaning: `${suitLabel}のエネルギーの停滞`,
        primaryColor: pc,
        secondaryColor: sc,
      });
    }

    // Court cards
    for (const { rank, label } of COURT) {
      cards.push({
        id: `minor-${suit}-${rank}`,
        arcana: "minor",
        name: `${suitLabel}の${label}`,
        number: 11 + COURT.findIndex((c) => c.rank === rank),
        suit,
        courtRank: rank,
        keywords: kw,
        uprightMeaning: `${label}の${suitLabel}的資質`,
        reversedMeaning: `未熟な${suitLabel}のエネルギー`,
        primaryColor: pc,
        secondaryColor: sc,
      });
    }
  }
  return cards;
}

export const FULL_DECK: TarotCard[] = [...major, ...buildMinor()];

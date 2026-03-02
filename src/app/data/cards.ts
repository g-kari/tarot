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
  { id: "major-00", arcana: "major", name: "The Fool", number: 0, keywords: ["beginnings", "innocence", "spontaneity"], uprightMeaning: "New beginnings, optimism, trust in life", reversedMeaning: "Recklessness, risk-taking, lack of direction", primaryColor: "#f4d03f", secondaryColor: "#85c1e9" },
  { id: "major-01", arcana: "major", name: "The Magician", number: 1, keywords: ["willpower", "desire", "creation"], uprightMeaning: "Power, skill, concentration, action", reversedMeaning: "Manipulation, cunning, untapped talents", primaryColor: "#e74c3c", secondaryColor: "#f39c12" },
  { id: "major-02", arcana: "major", name: "The High Priestess", number: 2, keywords: ["intuition", "mystery", "inner knowledge"], uprightMeaning: "Intuition, mystery, subconscious mind", reversedMeaning: "Hidden agendas, misuse of knowledge", primaryColor: "#1a5276", secondaryColor: "#a9cce3" },
  { id: "major-03", arcana: "major", name: "The Empress", number: 3, keywords: ["fertility", "nature", "abundance"], uprightMeaning: "Femininity, beauty, nature, nurturing", reversedMeaning: "Creative block, dependence on others", primaryColor: "#1e8449", secondaryColor: "#a9dfbf" },
  { id: "major-04", arcana: "major", name: "The Emperor", number: 4, keywords: ["authority", "structure", "control"], uprightMeaning: "Fatherhood, authority, stability, law", reversedMeaning: "Domination, rigidity, lack of discipline", primaryColor: "#c0392b", secondaryColor: "#cd6155" },
  { id: "major-05", arcana: "major", name: "The Hierophant", number: 5, keywords: ["tradition", "conformity", "spiritual wisdom"], uprightMeaning: "Tradition, belief systems, conformity", reversedMeaning: "Rebellion, subversiveness, new approaches", primaryColor: "#9b59b6", secondaryColor: "#d7bde2" },
  { id: "major-06", arcana: "major", name: "The Lovers", number: 6, keywords: ["love", "union", "choice"], uprightMeaning: "Love, harmony, relationships, values", reversedMeaning: "Disharmony, imbalance, misalignment", primaryColor: "#f39c12", secondaryColor: "#f9e79f" },
  { id: "major-07", arcana: "major", name: "The Chariot", number: 7, keywords: ["control", "willpower", "victory"], uprightMeaning: "Control, willpower, success, action", reversedMeaning: "Lack of control, lack of direction", primaryColor: "#2471a3", secondaryColor: "#7fb3d3" },
  { id: "major-08", arcana: "major", name: "Strength", number: 8, keywords: ["courage", "persuasion", "patience"], uprightMeaning: "Strength, courage, patience, control", reversedMeaning: "Weakness, self-doubt, lack of discipline", primaryColor: "#d35400", secondaryColor: "#f0b27a" },
  { id: "major-09", arcana: "major", name: "The Hermit", number: 9, keywords: ["introspection", "soul-searching", "wisdom"], uprightMeaning: "Soul searching, introspection, being alone", reversedMeaning: "Isolation, loneliness, withdrawal", primaryColor: "#717d7e", secondaryColor: "#d5d8dc" },
  { id: "major-10", arcana: "major", name: "Wheel of Fortune", number: 10, keywords: ["luck", "fate", "change"], uprightMeaning: "Good luck, karma, life cycles, destiny", reversedMeaning: "Bad luck, lack of control, clinging to control", primaryColor: "#8e44ad", secondaryColor: "#d2b4de" },
  { id: "major-11", arcana: "major", name: "Justice", number: 11, keywords: ["fairness", "truth", "law"], uprightMeaning: "Justice, fairness, truth, cause and effect", reversedMeaning: "Unfairness, lack of accountability", primaryColor: "#2e86c1", secondaryColor: "#aed6f1" },
  { id: "major-12", arcana: "major", name: "The Hanged Man", number: 12, keywords: ["suspension", "restriction", "letting go"], uprightMeaning: "Suspension, restriction, letting go, sacrifice", reversedMeaning: "Martyrdom, indecision, delay", primaryColor: "#1e8449", secondaryColor: "#82e0aa" },
  { id: "major-13", arcana: "major", name: "Death", number: 13, keywords: ["endings", "change", "transformation"], uprightMeaning: "Endings, change, transformation, transition", reversedMeaning: "Resistance to change, personal transformation", primaryColor: "#1c2833", secondaryColor: "#5d6d7e" },
  { id: "major-14", arcana: "major", name: "Temperance", number: 14, keywords: ["balance", "moderation", "patience"], uprightMeaning: "Balance, moderation, patience, purpose", reversedMeaning: "Imbalance, excess, self-healing", primaryColor: "#1a5276", secondaryColor: "#f0b27a" },
  { id: "major-15", arcana: "major", name: "The Devil", number: 15, keywords: ["shadow self", "attachment", "addiction"], uprightMeaning: "Shadow self, attachment, addiction, materialism", reversedMeaning: "Releasing limiting beliefs, exploring dark thoughts", primaryColor: "#922b21", secondaryColor: "#1c2833" },
  { id: "major-16", arcana: "major", name: "The Tower", number: 16, keywords: ["sudden change", "upheaval", "chaos"], uprightMeaning: "Sudden change, upheaval, chaos, revelation", reversedMeaning: "Personal transformation, fear of change", primaryColor: "#784212", secondaryColor: "#d35400" },
  { id: "major-17", arcana: "major", name: "The Star", number: 17, keywords: ["hope", "faith", "rejuvenation"], uprightMeaning: "Hope, faith, purpose, renewal, spirituality", reversedMeaning: "Lack of faith, despair, self-trust", primaryColor: "#1a5276", secondaryColor: "#f4d03f" },
  { id: "major-18", arcana: "major", name: "The Moon", number: 18, keywords: ["illusion", "fear", "subconscious"], uprightMeaning: "Illusion, fear, the subconscious, confusion", reversedMeaning: "Release of fear, repressed emotion", primaryColor: "#154360", secondaryColor: "#aab7b8" },
  { id: "major-19", arcana: "major", name: "The Sun", number: 19, keywords: ["positivity", "fun", "warmth"], uprightMeaning: "Positivity, fun, warmth, success, vitality", reversedMeaning: "Inner child, feeling down, overly optimistic", primaryColor: "#f39c12", secondaryColor: "#f7dc6f" },
  { id: "major-20", arcana: "major", name: "Judgement", number: 20, keywords: ["judgment", "rebirth", "inner calling"], uprightMeaning: "Reflection, reckoning, awakening, absolution", reversedMeaning: "Inability to forgive yourself, self-doubt", primaryColor: "#922b21", secondaryColor: "#f4d03f" },
  { id: "major-21", arcana: "major", name: "The World", number: 21, keywords: ["completion", "integration", "accomplishment"], uprightMeaning: "Completion, integration, accomplishment", reversedMeaning: "Seeking personal closure, delays", primaryColor: "#1a5276", secondaryColor: "#1e8449" },
];

const SUIT_COLORS: Record<Suit, [string, string]> = {
  wands:     ["#c0392b", "#f39c12"],
  cups:      ["#1a5276", "#5dade2"],
  swords:    ["#5d6d7e", "#aab7b8"],
  pentacles: ["#1e8449", "#f4d03f"],
};

const SUIT_KEYWORDS: Record<Suit, string[]> = {
  wands:     ["fire", "passion", "creativity"],
  cups:      ["water", "emotion", "intuition"],
  swords:    ["air", "mind", "conflict"],
  pentacles: ["earth", "material", "work"],
};

const COURT: Array<{ rank: CourtRank; label: string }> = [
  { rank: "page",   label: "Page"   },
  { rank: "knight", label: "Knight" },
  { rank: "queen",  label: "Queen"  },
  { rank: "king",   label: "King"   },
];

function buildMinor(): TarotCard[] {
  const cards: TarotCard[] = [];
  const suits: Suit[] = ["wands", "cups", "swords", "pentacles"];

  for (const suit of suits) {
    const [pc, sc] = SUIT_COLORS[suit];
    const kw = SUIT_KEYWORDS[suit];
    const suitLabel = suit.charAt(0).toUpperCase() + suit.slice(1);

    // Pip cards 1-10
    for (let n = 1; n <= 10; n++) {
      const rankLabel = n === 1 ? "Ace" : String(n);
      cards.push({
        id: `minor-${suit}-${n}`,
        arcana: "minor",
        name: n === 1 ? `Ace of ${suitLabel}` : `${n} of ${suitLabel}`,
        number: n,
        suit,
        keywords: kw,
        uprightMeaning: `${rankLabel} of ${suitLabel} energy`,
        reversedMeaning: `Blocked ${suitLabel.toLowerCase()} energy`,
        primaryColor: pc,
        secondaryColor: sc,
      });
    }

    // Court cards
    for (const { rank, label } of COURT) {
      cards.push({
        id: `minor-${suit}-${rank}`,
        arcana: "minor",
        name: `${label} of ${suitLabel}`,
        number: 11 + COURT.findIndex((c) => c.rank === rank),
        suit,
        courtRank: rank,
        keywords: kw,
        uprightMeaning: `${label} ${suitLabel.toLowerCase()} qualities`,
        reversedMeaning: `Immature ${suitLabel.toLowerCase()} energy`,
        primaryColor: pc,
        secondaryColor: sc,
      });
    }
  }
  return cards;
}

export const FULL_DECK: TarotCard[] = [...major, ...buildMinor()];

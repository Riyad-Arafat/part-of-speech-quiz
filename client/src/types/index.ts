export interface WordList {
  id: number;
  word: string;
  pos: "noun" | "verb" | "adjective" | "adverb";
}

export interface Rank {
  rank: number;
}

export interface Feedback {
  correct: boolean;
  answer: WordList["pos"];
}

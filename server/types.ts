export interface Data {
  wordList: WordList[];
  scoresList: number[];
}

export interface WordList {
  id: number;
  word: string;
  pos: string;
}

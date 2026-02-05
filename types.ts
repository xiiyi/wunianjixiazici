
export enum GameType {
  MATCH = 'match',
  TYPO = 'typo',
  FILL = 'fill'
}

export enum GameState {
  HOME = 'home',
  LEVEL_SELECT = 'level_select',
  PLAYING = 'playing',
  RESULT = 'result'
}

export interface LevelData {
  id: string;
  question: string;
  answer: string;
  options?: string[];
  pinyin?: string;
  wrong?: string;
}

export interface MatchCard {
  id: string;
  content: string;
  type: 'char' | 'pinyin';
  matchId: string;
}

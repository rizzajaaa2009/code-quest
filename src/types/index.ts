export type ArcId = 'html-kingdom' | 'css-city' | 'js-laboratory' | 'fullstack-citadel';

export type ItemType = 'hint' | 'insight' | 'debug' | 'retry' | 'skip' | 'cosmetic';

export type QuestStatus = 'locked' | 'available' | 'in_progress' | 'completed' | 'mastered';

export type ChallengeState = 'idle' | 'attempting' | 'success' | 'failed' | 'locked';

export interface User {
  id: string;
  username: string;
  level: number;
  xp: number;
  gold: number;
  currentArc: ArcId;
  hintTokens: number;
  createdAt: string;
}

export interface Quest {
  id: string;
  arcId: ArcId;
  order: number;
  title: string;
  storyContext: string;
  learningObjective: string;
  conceptExplanation: string;
  syntaxPreview: string;
  taskInstruction: string;
  successCriteria: string[];
  xpReward: number;
  goldReward: number;
  bossQuest: boolean;
}

export interface Challenge {
  id: string;
  questId: string;
  order: number;
  title: string;
  description: string;
  initialCode: string;
  targetOutput: string;
  validationRules: ValidationRule[];
  xpReward: number;
  attempts: number;
  maxAttempts: number;
}

export interface ValidationRule {
  type: 'contains' | 'matches' | 'not_contains' | 'attribute_present' | 'element_count';
  value: string;
  message: string;
}

export interface UserProgress {
  userId: string;
  questId: string;
  status: QuestStatus;
  completedChallenges: string[];
  attemptsRemaining: number;
  score: number;
}

export interface ShopItem {
  id: string;
  name: string;
  description: string;
  type: ItemType;
  price: number;
  effect: string;
  icon: string;
}

export interface UserInventory {
  userId: string;
  itemId: string;
  quantity: number;
}

export interface Arc {
  id: ArcId;
  name: string;
  theme: string;
  description: string;
  bossName: string;
  unlocks: ArcId | null;
  totalQuests: number;
  icon: string;
}

export interface GameState {
  user: User | null;
  currentQuest: Quest | null;
  currentChallenge: Challenge | null;
  challengeState: ChallengeState;
  attemptCount: number;
  showShop: boolean;
  showInventory: boolean;
  message: string | null;
  messageType: 'success' | 'error' | 'info' | null;
}

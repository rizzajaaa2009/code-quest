import { useState, useCallback } from 'react';
import type { Quest, Challenge, ChallengeState } from '../types';
import { quests, challenges } from '../data/gameData';

const STORAGE_KEY = 'codequest_state';

export interface LocalUser {
  id: string;
  username: string;
  level: number;
  xp: number;
  gold: number;
  currentArc: string;
  hintTokens: number;
  completedQuests: string[];
  inventory: Record<string, number>;
  questProgress: Record<string, { status: string; attempts: number }>;
}

const defaultUser: LocalUser = {
  id: 'local-user',
  username: 'Code Apprentice',
  level: 1,
  xp: 0,
  gold: 50,
  currentArc: 'html-kingdom',
  hintTokens: 3,
  completedQuests: [],
  inventory: {},
  questProgress: {}
};

function loadState(): LocalUser {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...defaultUser, ...JSON.parse(saved) };
    }
  } catch {
    // ignore
  }
  return defaultUser;
}

function saveState(user: LocalUser) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export function useGameState() {
  const [user, setUser] = useState<LocalUser>(() => loadState());
  const [currentQuest, setCurrentQuest] = useState<Quest | null>(null);
  const [currentChallenge, setCurrentChallenge] = useState<Challenge | null>(null);
  const [challengeState, setChallengeState] = useState<ChallengeState>('idle');
  const [attemptCount, setAttemptCount] = useState(0);
  const [showShop, setShowShop] = useState(false);
  const [showInventory, setShowInventory] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' | 'info' } | null>(null);

  const showMessage = useCallback((text: string, type: 'success' | 'error' | 'info') => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  }, []);

  const updateUser = useCallback((updates: Partial<LocalUser>) => {
    setUser(prev => {
      const next = { ...prev, ...updates };
      saveState(next);
      return next;
    });
  }, []);

  const startQuest = useCallback((questId: string) => {
    const quest = quests.find(q => q.id === questId);
    if (!quest) return;

    const status = user.questProgress[questId]?.status;
    if (status === 'locked' && quest.order > 1) {
      showMessage('This quest is locked. Complete previous quests first.', 'error');
      return;
    }

    setCurrentQuest(quest);
    const challengeList = challenges.filter(c => c.questId === questId);
    if (challengeList.length > 0) {
      setCurrentChallenge(challengeList[0]);
      setAttemptCount(user.questProgress[questId]?.attempts ?? challengeList[0].maxAttempts);
      setChallengeState('attempting');
    }
  }, [user.questProgress, showMessage]);

  const submitCode = useCallback((code: string): boolean => {
    if (!currentChallenge) return false;

    const results = currentChallenge.validationRules.map(rule => {
      switch (rule.type) {
        case 'contains':
          return { passed: code.includes(rule.value), message: rule.message };
        case 'matches':
          return { passed: new RegExp(rule.value).test(code), message: rule.message };
        case 'not_contains':
          return { passed: !code.includes(rule.value), message: rule.message };
        case 'attribute_present':
          return { passed: code.includes(rule.value), message: rule.message };
        case 'element_count': {
          const [element, count] = rule.value.split(':');
          const regex = new RegExp(`<${element}[\\s>]`, 'gi');
          const matches = code.match(regex);
          return { passed: (matches?.length ?? 0) >= parseInt(count), message: rule.message };
        }
        default:
          return { passed: true, message: '' };
      }
    });

    const failed = results.filter(r => !r.passed);

    if (failed.length === 0) {
      setChallengeState('success');
      const xpGain = currentChallenge.xpReward;
      const goldGain = Math.floor(currentChallenge.xpReward / 3);

      updateUser({
        xp: user.xp + xpGain,
        gold: user.gold + goldGain,
        level: Math.floor((user.xp + xpGain) / 100) + 1,
        completedQuests: [...new Set([...user.completedQuests, currentChallenge.questId])]
      });

      showMessage(`Challenge complete! +${xpGain} XP, +${goldGain} Gold`, 'success');
      return true;
    } else {
      setAttemptCount(prev => {
        const next = prev - 1;
        if (next <= 0) {
          setChallengeState('failed');
          showMessage('No attempts remaining. Use a Retry Charm or visit the shop.', 'error');
        }
        return next;
      });

      showMessage(failed[0].message, 'error');
      return false;
    }
  }, [currentChallenge, user, updateUser, showMessage]);

  const consumeHintToken = useCallback((): string | null => {
    if (user.hintTokens <= 0) {
      showMessage('No hint tokens remaining. Purchase more from the shop.', 'error');
      return null;
    }

    updateUser({ hintTokens: user.hintTokens - 1 });

    if (currentQuest) {
      return currentQuest.syntaxPreview;
    }
    return 'Focus on the core elements needed.';
  }, [user.hintTokens, currentQuest, updateUser, showMessage]);

  const purchaseItem = useCallback((itemId: string, price: number): boolean => {
    if (user.gold < price) {
      showMessage('Not enough gold!', 'error');
      return false;
    }

    updateUser({
      gold: user.gold - price,
      inventory: {
        ...user.inventory,
        [itemId]: (user.inventory[itemId] || 0) + 1
      }
    });

    showMessage(`Purchased successfully!`, 'success');
    return true;
  }, [user, updateUser, showMessage]);

  const useItem = useCallback((itemId: string): boolean => {
    const quantity = user.inventory[itemId] || 0;
    if (quantity <= 0) {
      showMessage('Item not in inventory!', 'error');
      return false;
    }

    let effect = '';
    switch (itemId) {
      case 'retry-charm':
        if (currentChallenge) {
          setAttemptCount(currentChallenge.maxAttempts);
          setChallengeState('attempting');
          effect = 'Attempts restored!';
        }
        break;
      case 'hint-token':
        return consumeHintToken() !== null;
      default:
        effect = 'Item used!';
    }

    updateUser({
      inventory: {
        ...user.inventory,
        [itemId]: quantity - 1
      }
    });

    showMessage(effect, 'info');
    return true;
  }, [user.inventory, currentChallenge, updateUser, showMessage, consumeHintToken]);

  const resetChallenge = useCallback(() => {
    if (!currentChallenge) return;
    const savedAttempts = user.questProgress[currentChallenge.questId]?.attempts;
    setAttemptCount(savedAttempts ?? currentChallenge.maxAttempts);
    setChallengeState('attempting');
  }, [currentChallenge, user.questProgress]);

  const exitQuest = useCallback(() => {
    setCurrentQuest(null);
    setCurrentChallenge(null);
    setChallengeState('idle');
    setAttemptCount(0);
  }, []);

  return {
    user,
    currentQuest,
    currentChallenge,
    challengeState,
    attemptCount,
    showShop,
    showInventory,
    message,
    setShowShop,
    setShowInventory,
    startQuest,
    submitCode,
    consumeHintToken,
    purchaseItem,
    useItem,
    resetChallenge,
    exitQuest,
    updateUser
  };
}

export type GameStateHook = ReturnType<typeof useGameState>;

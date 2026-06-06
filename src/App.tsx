import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { WorldMap } from './components/WorldMap';
import { QuestBriefing } from './components/QuestBriefing';
import { CodeEditor } from './components/CodeEditor';
import { Shop } from './components/Shop';
import { Inventory } from './components/Inventory';
import { Toast } from './components/Toast';
import { useGameState } from './hooks/useGameState';
import { quests } from './data/gameData';
import type { ArcId } from './types';

function App() {
  const {
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
    exitQuest
  } = useGameState();

  const [showBriefing, setShowBriefing] = useState(false);
  const [selectedQuestId, setSelectedQuestId] = useState<string | null>(null);

  const selectedQuest = useMemo(() => {
    if (currentQuest) return currentQuest;
    return quests.find(q => q.id === selectedQuestId) || null;
  }, [currentQuest, selectedQuestId]);

  const handleQuestSelect = (questId: string) => {
    setSelectedQuestId(questId);
    setShowBriefing(true);
  };

  const handleStartQuest = () => {
    if (selectedQuestId) {
      startQuest(selectedQuestId);
      setShowBriefing(false);
    }
  };

  const handleExitQuest = () => {
    exitQuest();
    setSelectedQuestId(null);
  };

  const handleUseHint = () => {
    const hint = consumeHintToken();
    if (hint) {
      alert(`Hint: ${hint}`);
    }
  };

  if (currentChallenge && currentQuest) {
    return (
      <div className="min-h-screen bg-quest-dark">
        <CodeEditor
          challenge={currentChallenge}
          quest={currentQuest}
          attemptCount={attemptCount}
          onSubmit={submitCode}
          onExit={handleExitQuest}
          onReset={resetChallenge}
          onHint={consumeHintToken}
          challengeState={challengeState}
        />
        {message && (
          <Toast message={message.text} type={message.type} onClose={() => {}} />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-quest-dark">
      <Header
        user={user}
        onOpenShop={() => setShowShop(true)}
        onOpenInventory={() => setShowInventory(true)}
      />

      <WorldMap
        currentArc={user.currentArc as ArcId}
        completedQuests={user.completedQuests}
        onQuestSelect={handleQuestSelect}
      />

      {showBriefing && selectedQuestId && selectedQuest && (
        <QuestBriefing
          quest={selectedQuest}
          onStart={handleStartQuest}
          onBack={() => setShowBriefing(false)}
        />
      )}

      {showShop && (
        <Shop
          gold={user.gold}
          onClose={() => setShowShop(false)}
          onPurchase={purchaseItem}
        />
      )}

      {showInventory && (
        <Inventory
          user={user}
          onClose={() => setShowInventory(false)}
          onUseItem={useItem}
          onUseHint={handleUseHint}
        />
      )}

      {message && (
        <Toast message={message.text} type={message.type} onClose={() => {}} />
      )}
    </div>
  );
}

export default App;

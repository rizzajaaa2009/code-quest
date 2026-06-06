import { Scroll, Palette, Cpu, Castle, Lock, CheckCircle, Sword } from 'lucide-react';
import type { ArcId } from '../types';
import { arcs, quests } from '../data/gameData';

interface WorldMapProps {
  currentArc: ArcId;
  completedQuests: string[];
  onQuestSelect: (questId: string) => void;
}

const arcIcons = {
  'Scroll': Scroll,
  'Palette': Palette,
  'Cpu': Cpu,
  'Castle': Castle
};

export function WorldMap({ currentArc, completedQuests, onQuestSelect }: WorldMapProps) {
  const currentArcIndex = arcs.findIndex(a => a.id === currentArc);

  return (
    <div className="min-h-screen bg-gradient-world pt-20 pb-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="font-quest text-3xl font-bold text-quest-text mb-2 text-glow-violet">
            The Digital Kingdom
          </h1>
          <p className="text-quest-muted">Choose your path and restore the broken world</p>
        </div>

        <div className="space-y-6">
          {arcs.map((arc, arcIndex) => {
            const IconComponent = arcIcons[arc.icon as keyof typeof arcIcons];
            const isLocked = arcIndex > currentArcIndex;
            const isCurrent = arc.id === currentArc;
            const arcQuests = quests.filter(q => q.arcId === arc.id);

            return (
              <div
                key={arc.id}
                className={`relative border-gradient rounded-xl overflow-hidden transition-all duration-300 ${
                  isLocked ? 'opacity-50' : 'hover:border-quest-violet/60'
                }`}
              >
                <div className="card-surface p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                      isLocked
                        ? 'bg-quest-purple/50'
                        : isCurrent
                          ? 'bg-gradient-to-br from-quest-violet to-quest-purple glow-violet'
                          : 'bg-gradient-to-br from-quest-gold/30 to-quest-purple'
                    }`}>
                      {isLocked ? (
                        <Lock className="w-6 h-6 text-quest-muted" />
                      ) : (
                        <IconComponent className={`w-6 h-6 ${isCurrent ? 'text-quest-gold' : 'text-quest-text'}`} />
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h2 className="font-quest text-xl font-semibold text-quest-text">
                          {arc.name}
                        </h2>
                        {arcIndex < currentArcIndex && (
                          <CheckCircle className="w-5 h-5 text-quest-gold" />
                        )}
                      </div>
                      <p className="text-sm text-quest-muted mb-1">{arc.theme}</p>
                      <p className="text-sm text-quest-text/80">{arc.description}</p>
                      {isCurrent && (
                        <p className="text-xs text-quest-violet mt-2 flex items-center gap-1">
                          <Sword className="w-3 h-3" /> Current Arc
                        </p>
                      )}
                    </div>
                  </div>

                  {!isLocked && (
                    <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-2 mt-4">
                      {arcQuests.map((quest, questIndex) => {
                        const isCompleted = completedQuests.includes(quest.id);
                        const questLocked = arcIndex < currentArcIndex ? false : questIndex > 0 && !completedQuests.includes(arcQuests[questIndex - 1].id);

                        return (
                          <button
                            key={quest.id}
                            onClick={() => !questLocked && onQuestSelect(quest.id)}
                            disabled={questLocked}
                            className={`relative aspect-square rounded-lg flex flex-col items-center justify-center p-2 transition-all duration-300 ${
                              questLocked
                                ? 'bg-quest-purple/30 cursor-not-allowed opacity-50'
                                : isCompleted
                                  ? 'bg-quest-gold/20 border border-quest-gold/40 hover:border-quest-gold'
                                  : 'bg-quest-violet/10 border border-quest-violet/30 hover:border-quest-violet hover:bg-quest-violet/20 cursor-pointer'
                            }`}
                            title={quest.bossQuest ? `Boss: ${quest.title}` : quest.title}
                          >
                            {quest.bossQuest && (
                              <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-quest-gold flex items-center justify-center">
                                <Sword className="w-2.5 h-2.5 text-quest-dark" />
                              </div>
                            )}
                            {isCompleted ? (
                              <CheckCircle className="w-5 h-5 text-quest-gold" />
                            ) : questLocked ? (
                              <Lock className="w-4 h-4 text-quest-muted" />
                            ) : (
                              <span className="text-xs text-quest-text font-mono">{questIndex + 1}</span>
                            )}
                            <span className="text-[10px] text-quest-muted mt-1 text-center line-clamp-1">
                              {quest.title}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  )}

                  {isLocked && (
                    <div className="text-center py-4">
                      <p className="text-sm text-quest-muted">Complete previous arcs to unlock</p>
                    </div>
                  )}
                </div>

                {arc.bossName && isCurrent && (
                  <div className="absolute bottom-2 right-2 text-xs text-quest-violet/60">
                    Boss: {arc.bossName}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

import { Map, Target, BookOpen, Code, CheckCircle, Sword, ArrowRight } from 'lucide-react';
import type { Quest } from '../types';

interface QuestBriefingProps {
  quest: Quest;
  onStart: () => void;
  onBack: () => void;
}

export function QuestBriefing({ quest, onStart, onBack }: QuestBriefingProps) {
  return (
    <div className="fixed inset-0 z-50 bg-quest-dark/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full border-gradient rounded-2xl overflow-hidden animate-fade-in">
        <div className="card-surface p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
              quest.bossQuest
                ? 'bg-gradient-to-br from-quest-gold/30 to-quest-purple glow-gold'
                : 'bg-gradient-to-br from-quest-violet to-quest-purple glow-violet'
            }`}>
              {quest.bossQuest ? (
                <Sword className="w-6 h-6 text-quest-gold" />
              ) : (
                <Map className="w-6 h-6 text-quest-text" />
              )}
            </div>
            <div>
              <h2 className="font-quest text-2xl font-bold text-quest-text">
                {quest.title}
              </h2>
              {quest.bossQuest && (
                <span className="text-xs text-quest-gold font-medium">Boss Quest</span>
              )}
            </div>
          </div>

          <div className="space-y-5">
            <div className="bg-quest-purple/30 rounded-lg p-4 border border-quest-violet/20">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen className="w-4 h-4 text-quest-violet" />
                <h3 className="font-semibold text-quest-text">Story Context</h3>
              </div>
              <p className="text-sm text-quest-muted leading-relaxed">{quest.storyContext}</p>
            </div>

            <div className="bg-quest-purple/20 rounded-lg p-4 border border-quest-violet/10">
              <div className="flex items-center gap-2 mb-2">
                <Target className="w-4 h-4 text-quest-gold" />
                <h3 className="font-semibold text-quest-text">Learning Objective</h3>
              </div>
              <p className="text-sm text-quest-text">{quest.learningObjective}</p>
            </div>

            <div className="bg-quest-surface/50 rounded-lg p-4">
              <h3 className="font-semibold text-quest-text mb-2">Concept Explanation</h3>
              <p className="text-sm text-quest-text/90 leading-relaxed">{quest.conceptExplanation}</p>
            </div>

            <div className="code-editor-bg rounded-lg p-4">
              <div className="flex items-center gap-2 mb-3">
                <Code className="w-4 h-4 text-quest-violet" />
                <h3 className="font-semibold text-quest-text text-sm">Syntax Preview</h3>
              </div>
              <pre className="font-mono text-sm text-quest-text/80 whitespace-pre-wrap overflow-x-auto">
                {quest.syntaxPreview}
              </pre>
            </div>

            <div className="bg-quest-dark/50 rounded-lg p-4 border border-quest-violet/10">
              <h3 className="font-semibold text-quest-text mb-3 flex items-center gap-2">
                <Code className="w-4 h-4 text-quest-violet" />
                Task Instruction
              </h3>
              <p className="text-sm text-quest-text mb-4">{quest.taskInstruction}</p>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-quest-muted uppercase tracking-wide">Success Criteria</h4>
                <ul className="space-y-1">
                  {quest.successCriteria.map((criterion, index) => (
                    <li key={index} className="flex items-start gap-2 text-sm text-quest-text">
                      <CheckCircle className="w-4 h-4 text-quest-gold flex-shrink-0 mt-0.5" />
                      <span>{criterion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-quest-violet/20">
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1 text-quest-gold">
                  <span className="font-mono">+{quest.xpReward}</span>
                  <span className="text-quest-muted">XP</span>
                </div>
                <div className="flex items-center gap-1 text-quest-gold">
                  <span className="font-mono">+{Math.floor(quest.xpReward / 3)}</span>
                  <span className="text-quest-muted">Gold</span>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={onBack}
                  className="px-4 py-2 rounded-lg text-quest-muted hover:text-quest-text hover:bg-quest-purple/30 transition-colors cursor-pointer"
                >
                  Back
                </button>
                <button
                  onClick={onStart}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-lg bg-gradient-to-r from-quest-violet to-quest-purple text-quest-text font-semibold hover:opacity-90 transition-opacity cursor-pointer glow-violet"
                >
                  Begin Quest
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

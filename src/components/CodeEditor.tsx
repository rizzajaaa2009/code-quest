import { useState, useRef } from 'react';
import { Play, RotateCcw, Lightbulb, ArrowLeft, CheckCircle, XCircle, Lock, Loader2 } from 'lucide-react';
import type { Challenge, Quest } from '../types';

interface CodeEditorProps {
  challenge: Challenge;
  quest: Quest;
  attemptCount: number;
  onSubmit: (code: string) => boolean;
  onExit: () => void;
  onReset: () => void;
  onHint: () => string | null;
  challengeState: 'idle' | 'attempting' | 'success' | 'failed' | 'locked';
}

export function CodeEditor({
  challenge,
  quest,
  attemptCount,
  onSubmit,
  onExit,
  onReset,
  onHint,
  challengeState
}: CodeEditorProps) {
  const [code, setCode] = useState(challenge.initialCode);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const previewContent = code;

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onSubmit(code);
    setIsSubmitting(false);
  };

  const handleReset = () => {
    setCode(challenge.initialCode);
    onReset();
  };

  const handleHint = () => {
    const hint = onHint();
    if (hint) {
      alert(hint);
    }
  };

  const getTabColor = (index: number) => {
    if (index === challenge.order) return 'bg-quest-violet/30 border-quest-violet text-quest-text';
    return 'bg-quest-purple/20 border-transparent text-quest-muted';
  };

  return (
    <div className="fixed inset-0 z-50 bg-quest-dark/95 backdrop-blur-md flex flex-col pt-16">
      <div className="border-b border-quest-violet/20 bg-quest-dark/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onExit}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-quest-muted hover:text-quest-text hover:bg-quest-purple/30 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back to Map</span>
            </button>

            <div className="h-6 w-px bg-quest-violet/20" />

            <div>
              <h2 className="font-quest text-lg font-semibold text-quest-text">{challenge.title}</h2>
              <p className="text-xs text-quest-muted">{quest.title}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-quest-purple/30 border border-quest-violet/20">
              {Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-2 h-2 rounded-full ${
                    i < attemptCount ? 'bg-quest-gold' : 'bg-quest-violet/30'
                  }`}
                />
              ))}
              <span className="ml-2 text-xs text-quest-muted">{attemptCount} attempts</span>
            </div>

            <button
              onClick={handleHint}
              disabled={challengeState === 'success'}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-quest-gold/10 border border-quest-gold/30 text-quest-gold hover:bg-quest-gold/20 transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Lightbulb className="w-4 h-4" />
              <span className="text-sm">Hint</span>
            </button>
          </div>
        </div>

        <p className="text-sm text-quest-muted mt-2">{challenge.description}</p>
      </div>

      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col">
          <div className="flex items-center border-b border-quest-violet/20">
            <div className={`px-4 py-2 border-b-2 ${getTabColor(1)}`}>
              <span className="text-sm font-medium">Editor</span>
            </div>
            <div className="px-4 py-2 text-sm text-quest-muted">
              Quest {challenge.order}
            </div>
          </div>

          <div className="flex-1 relative">
            <div className="absolute inset-0 flex">
              <div className="w-12 bg-quest-purple/20 border-r border-quest-violet/20 flex-shrink-0 py-4 text-right">
                {code.split('\n').map((_, i) => (
                  <div key={i} className="px-2 text-xs text-quest-muted font-mono h-6 leading-6">
                    {i + 1}
                  </div>
                ))}
              </div>

              <textarea
                ref={textareaRef}
                value={code}
                onChange={e => setCode(e.target.value)}
                spellCheck="false"
                disabled={challengeState === 'success' || challengeState === 'failed'}
                className="flex-1 bg-quest-dark/80 font-mono text-sm text-quest-text p-4 resize-none focus:outline-none disabled:opacity-75"
                style={{
                  lineHeight: '1.5rem',
                  caretColor: '#FFD84D'
                }}
                placeholder="Write your code here..."
              />
            </div>
          </div>
        </div>

        <div className="w-1/2 border-l border-quest-violet/20 flex flex-col">
          <div className="flex items-center px-4 py-2 border-b border-quest-violet/20 bg-quest-purple/10">
            <span className="text-sm font-medium text-quest-text">Preview</span>
          </div>

          <div className="flex-1 bg-white/50 overflow-auto p-4">
            <iframe
              srcDoc={previewContent}
              title="Preview"
              className="w-full h-full border-0 bg-white"
              sandbox="allow-scripts"
            />
          </div>

          <div className="border-t border-quest-violet/20 bg-quest-purple/10 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm text-quest-muted">
                {challengeState === 'success' && (
                  <div className="flex items-center gap-2 text-quest-gold animate-fade-in">
                    <CheckCircle className="w-5 h-5" />
                    <span>Challenge Complete!</span>
                  </div>
                )}
                {challengeState === 'failed' && (
                  <div className="flex items-center gap-2 text-red-400 animate-shake">
                    <XCircle className="w-5 h-5" />
                    <span>Attempts exhausted. Use a Retry Charm!</span>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-quest-violet/30 text-quest-muted hover:text-quest-text hover:border-quest-violet transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset</span>
                </button>

                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || challengeState === 'success' || attemptCount <= 0}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-quest-violet to-quest-purple text-quest-text font-semibold hover:opacity-90 transition-opacity disabled:opacity-50 cursor-pointer glow-violet"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Play className="w-4 h-4" />
                  )}
                  <span>{challengeState === 'success' ? 'Completed!' : 'Run Code'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {challengeState === 'success' && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="w-48 h-48 rounded-full bg-quest-gold/30 animate-gold-burst" />
        </div>
      )}

      {challengeState === 'failed' && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center">
          <div className="text-center">
            <Lock className="w-16 h-16 text-quest-violet mx-auto mb-4" />
            <p className="text-quest-muted">Challenge Locked</p>
          </div>
        </div>
      )}
    </div>
  );
}

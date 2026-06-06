import { Coins, Sparkles, Zap, User } from 'lucide-react';
import type { LocalUser } from '../hooks/useGameState';

interface HeaderProps {
  user: LocalUser;
  onOpenShop: () => void;
  onOpenInventory: () => void;
}

export function Header({ user, onOpenShop, onOpenInventory }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-quest-dark/90 backdrop-blur-md border-b border-quest-violet/30">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quest-violet to-quest-purple flex items-center justify-center glow-violet">
              <Sparkles className="w-5 h-5 text-quest-gold" />
            </div>
            <div>
              <h1 className="font-quest text-lg font-semibold text-quest-text">CodeQuest</h1>
              <p className="text-xs text-quest-muted">Learn to Code Through Adventure</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-quest-purple/50 border border-quest-violet/20">
              <Zap className="w-4 h-4 text-quest-gold" />
              <span className="font-mono text-sm text-quest-gold">{user.xp} XP</span>
            </div>

            <button
              onClick={onOpenShop}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-quest-gold/10 border border-quest-gold/30 hover:bg-quest-gold/20 transition-colors cursor-pointer"
            >
              <Coins className="w-4 h-4 text-quest-gold" />
              <span className="font-mono text-sm text-quest-gold">{user.gold}</span>
            </button>

            <button
              onClick={onOpenInventory}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-quest-purple/50 border border-quest-violet/30 hover:border-quest-violet/50 transition-colors cursor-pointer"
            >
              <User className="w-4 h-4 text-quest-violet" />
              <div className="text-left">
                <p className="text-sm text-quest-text font-medium">{user.username}</p>
                <p className="text-xs text-quest-muted">Level {user.level}</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

import { X, Package, Zap, Lightbulb, ScrollText, Sparkles, RefreshCw, SkipForward, Crown } from 'lucide-react';
import { shopItems } from '../data/gameData';
import type { LocalUser } from '../hooks/useGameState';

interface InventoryProps {
  user: LocalUser;
  onClose: () => void;
  onUseItem: (itemId: string) => boolean;
  onUseHint: () => void;
}

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Lightbulb': Lightbulb,
  'ScrollText': ScrollText,
  'Sparkles': Sparkles,
  'RefreshCw': RefreshCw,
  'SkipForward': SkipForward,
  'Crown': Crown
};

export function Inventory({ user, onClose, onUseItem, onUseHint }: InventoryProps) {
  const ownedItems = shopItems.filter(item => user.inventory[item.id] && user.inventory[item.id] > 0);

  const handleUseItem = (itemId: string) => {
    onUseItem(itemId);
  };

  return (
    <div className="fixed inset-0 z-50 bg-quest-dark/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-2xl w-full border-gradient rounded-2xl overflow-hidden animate-slide-up">
        <div className="card-surface">
          <div className="flex items-center justify-between p-6 border-b border-quest-violet/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quest-violet to-quest-purple flex items-center justify-center">
                <Package className="w-5 h-5 text-quest-text" />
              </div>
              <div>
                <h2 className="font-quest text-xl font-bold text-quest-text">Inventory</h2>
                <p className="text-sm text-quest-muted">{user.username} - Level {user.level}</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-lg hover:bg-quest-purple/30 text-quest-muted hover:text-quest-text transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-quest-purple/30 rounded-xl p-4 text-center border border-quest-violet/20">
                <Zap className="w-6 h-6 text-quest-gold mx-auto mb-2" />
                <p className="text-2xl font-mono text-quest-gold">{user.xp}</p>
                <p className="text-xs text-quest-muted">Experience</p>
              </div>
              <div className="bg-quest-purple/30 rounded-xl p-4 text-center border border-quest-violet/20">
                <Lightbulb className="w-6 h-6 text-quest-gold mx-auto mb-2" />
                <p className="text-2xl font-mono text-quest-gold">{user.hintTokens}</p>
                <p className="text-xs text-quest-muted">Hint Tokens</p>
              </div>
              <div className="bg-quest-purple/30 rounded-xl p-4 text-center border border-quest-gold/20">
                <Sparkles className="w-6 h-6 text-quest-gold mx-auto mb-2" />
                <p className="text-2xl font-mono text-quest-gold">{user.completedQuests.length}</p>
                <p className="text-xs text-quest-muted">Quests Done</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <h3 className="text-sm font-semibold text-quest-text">Owned Items</h3>
              <div className="flex items-center gap-2">
                {user.hintTokens > 0 && (
                  <button
                    onClick={onUseHint}
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-quest-gold/10 border border-quest-gold/30 text-quest-gold text-sm hover:bg-quest-gold/20 transition-colors cursor-pointer"
                  >
                    <Lightbulb className="w-4 h-4" />
                    Use Hint
                  </button>
                )}
              </div>
            </div>

            {ownedItems.length === 0 ? (
              <div className="text-center py-8 bg-quest-purple/20 rounded-xl border border-quest-violet/20">
                <Package className="w-12 h-12 text-quest-muted mx-auto mb-3" />
                <p className="text-quest-muted text-sm">No items in inventory</p>
                <p className="text-quest-muted/60 text-xs mt-1">Visit the shop to purchase items</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-60 overflow-y-auto">
                {ownedItems.map(item => {
                  const quantity = user.inventory[item.id] || 0;
                  const Icon = itemIcons[item.icon] || Package;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center justify-between bg-quest-purple/30 rounded-lg p-3 border border-quest-violet/20"
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-5 h-5 text-quest-violet" />
                        <div>
                          <h4 className="text-sm font-medium text-quest-text">{item.name}</h4>
                          <p className="text-xs text-quest-muted">{item.effect}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-sm font-mono text-quest-gold">x{quantity}</span>
                        <button
                          onClick={() => handleUseItem(item.id)}
                          className="px-3 py-1 rounded bg-quest-violet/20 text-quest-text text-sm hover:bg-quest-violet/40 transition-colors cursor-pointer"
                        >
                          Use
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

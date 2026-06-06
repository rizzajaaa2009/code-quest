import { X, Coins, ShoppingCart } from 'lucide-react';
import { shopItems } from '../data/gameData';
import type { ShopItem } from '../types';

interface ShopProps {
  gold: number;
  onClose: () => void;
  onPurchase: (itemId: string, price: number) => boolean;
}

const itemColors = {
  'hint': 'border-quest-gold/30',
  'insight': 'border-quest-violet/50',
  'debug': 'border-blue-500/30',
  'retry': 'border-green-500/30',
  'skip': 'border-red-500/30',
  'cosmetic': 'border-pink-500/30'
};

const itemBgColors = {
  'hint': 'from-quest-gold/10 to-quest-purple/30',
  'insight': 'from-quest-violet/20 to-quest-purple/30',
  'debug': 'from-blue-500/10 to-quest-purple/30',
  'retry': 'from-green-500/10 to-quest-purple/30',
  'skip': 'from-red-500/10 to-quest-purple/30',
  'cosmetic': 'from-pink-500/10 to-quest-purple/30'
};

const itemIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  'Lightbulb': ({ className }) => <span className={className}>💡</span>,
  'ScrollText': ({ className }) => <span className={className}>📜</span>,
  'Sparkles': ({ className }) => <span className={className}>✨</span>,
  'RefreshCw': ({ className }) => <span className={className}>🔄</span>,
  'SkipForward': ({ className }) => <span className={className}>⏭</span>,
  'Crown': ({ className }) => <span className={className}>👑</span>
};

export function Shop({ gold, onClose, onPurchase }: ShopProps) {
  const handlePurchase = (item: ShopItem) => {
    if (gold >= item.price) {
      onPurchase(item.id, item.price);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-quest-dark/95 backdrop-blur-md flex items-center justify-center p-4">
      <div className="max-w-4xl w-full border-gradient rounded-2xl overflow-hidden animate-slide-up">
        <div className="card-surface">
          <div className="flex items-center justify-between p-6 border-b border-quest-violet/20">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-quest-gold/30 to-quest-purple flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 text-quest-gold" />
              </div>
              <div>
                <h2 className="font-quest text-xl font-bold text-quest-text">Item Shop</h2>
                <p className="text-sm text-quest-muted">Power up your coding journey</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-quest-gold/10 border border-quest-gold/30">
                <Coins className="w-5 h-5 text-quest-gold" />
                <span className="font-mono text-lg text-quest-gold">{gold}</span>
              </div>

              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-quest-purple/30 text-quest-muted hover:text-quest-text transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="p-6 max-h-[60vh] overflow-y-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {shopItems.map(item => {
                const canAfford = gold >= item.price;
                const Icon = itemIcons[item.icon] || Sparkles;

                return (
                  <div
                    key={item.id}
                    className={`bg-gradient-to-br ${itemBgColors[item.type]} border ${itemColors[item.type]} rounded-xl p-4 transition-all hover:scale-[1.02]`}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-lg bg-quest-purple/30 flex items-center justify-center text-2xl">
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-quest-text text-sm mb-1">{item.name}</h3>
                        <p className="text-xs text-quest-muted">{item.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1">
                        <Coins className="w-4 h-4 text-quest-gold" />
                        <span className="font-mono text-sm text-quest-gold">{item.price}</span>
                      </div>

                      <button
                        onClick={() => handlePurchase(item)}
                        disabled={!canAfford}
                        className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          canAfford
                            ? 'bg-quest-violet text-quest-text hover:bg-quest-violet/80'
                            : 'bg-quest-purple/30 text-quest-muted cursor-not-allowed'
                        }`}
                      >
                        {canAfford ? 'Buy' : 'Not enough'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 p-4 rounded-lg bg-quest-purple/20 border border-quest-violet/20">
              <p className="text-xs text-quest-muted text-center">
                Items are stored in your inventory. Some items cannot be used during boss fights.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Sparkles({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z" />
    </svg>
  );
}


import React, { useState, useEffect } from 'react';
import { GAME_DATA_2 } from '../constants';
import CelebrationModal from './CelebrationModal';

interface GameTwoProps {
  level: number;
  onScoreChange: (score: number) => void;
  onComplete: () => void;
}

const GameTwo: React.FC<GameTwoProps> = ({ level, onScoreChange, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const offset = (level - 1) * 20;
    const selection = [];
    for (let i = 0; i < 20; i++) {
      const data = GAME_DATA_2[(offset + i) % GAME_DATA_2.length];
      // Randomize side
      const isLeftCorrect = Math.random() > 0.5;
      selection.push({
        ...data,
        left: isLeftCorrect ? data.correct : data.wrong,
        right: isLeftCorrect ? data.wrong : data.correct
      });
    }
    setItems(selection);
    setCurrentIdx(0);
    setShowCelebration(false);
  }, [level]);

  const handleChoice = (choice: string) => {
    const item = items[currentIdx];
    if (choice === item.correct) {
      onScoreChange(prev => prev + 5);
      setShowFeedback('correct');
      setTimeout(() => {
        setShowFeedback(null);
        if (currentIdx < items.length - 1) {
          setCurrentIdx(prev => prev + 1);
        } else {
          setShowCelebration(true);
        }
      }, 1000);
    } else {
      setShowFeedback('wrong');
      setTimeout(() => setShowFeedback(null), 1000);
    }
  };

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    onComplete();
  };

  if (items.length === 0) return null;

  const currentItem = items[currentIdx];

  return (
    <div className="w-full flex flex-col items-center text-center p-4">
      <h3 className="text-3xl font-cartoon text-yellow-600 mb-4">火眼金睛找茬</h3>
      <p className="text-2xl mb-8">请选出正确的字：<span className="text-blue-600 font-bold underline">[{currentItem.pinyin}]</span></p>

      <div className="flex gap-12">
        {[currentItem.left, currentItem.right].map((char, i) => (
          <button
            key={i}
            onClick={() => handleChoice(char)}
            className="w-32 h-32 md:w-48 md:h-48 bg-white border-8 border-yellow-100 hover:border-yellow-400 rounded-full flex items-center justify-center text-6xl md:text-8xl shadow-xl transition-all active:scale-95"
          >
            {char}
          </button>
        ))}
      </div>

      <div className="mt-12 text-gray-400">
        进度: {currentIdx + 1} / {items.length}
      </div>

      {showFeedback && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 animate__animated animate__zoomIn">
          {showFeedback === 'correct' ? (
            <div className="bg-white/90 p-12 rounded-3xl shadow-2xl flex flex-col items-center">
              <span className="correct-checkmark">🎉</span>
              <span className="text-4xl font-cartoon text-green-500">真棒！</span>
            </div>
          ) : (
            <div className="bg-white/90 p-12 rounded-3xl shadow-2xl flex flex-col items-center">
              <span className="wrong-cross">😵</span>
              <span className="text-4xl font-cartoon text-red-500">差一点点！</span>
            </div>
          )}
        </div>
      )}

      <CelebrationModal
        show={showCelebration}
        title="全对啦！"
        message="你是火眼金睛！"
        emoji="👁️"
        onClose={handleCelebrationClose}
      />
    </div>
  );
};

export default GameTwo;


import React, { useState, useEffect } from 'react';
import { GAME_DATA_3 } from '../constants';
import CelebrationModal from './CelebrationModal';

interface GameThreeProps {
  level: number;
  onScoreChange: (score: number) => void;
  onComplete: () => void;
}

const GameThree: React.FC<GameThreeProps> = ({ level, onScoreChange, onComplete }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [items, setItems] = useState<any[]>([]);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    const offset = (level - 1) * 20;
    const selection = [];
    for (let i = 0; i < 20; i++) {
      const data = GAME_DATA_3[(offset + i) % GAME_DATA_3.length];
      selection.push({
        ...data,
        // Shuffle options
        shuffledOptions: [...data.options].sort(() => Math.random() - 0.5)
      });
    }
    setItems(selection);
    setCurrentIdx(0);
    setShowCelebration(false);
  }, [level]);

  const handleChoice = (choice: string) => {
    const item = items[currentIdx];
    if (choice === item.answer) {
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

  const item = items[currentIdx];
  const questionArr = item.question.split('');
  questionArr[item.blankIndex] = '_';

  return (
    <div className="w-full flex flex-col items-center p-4">
      <h3 className="text-3xl font-cartoon text-pink-500 mb-8">词语填空大挑战</h3>

      <div className="text-7xl md:text-9xl font-cartoon text-gray-700 mb-12 flex space-x-2">
        {questionArr.map((char: string, i: number) => (
          <span key={i} className={char === '_' ? 'text-pink-400 animate-pulse underline' : ''}>
            {char}
          </span>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-6 w-full max-w-md">
        {item.shuffledOptions.map((opt: string, i: number) => (
          <button
            key={i}
            onClick={() => handleChoice(opt)}
            className="p-6 bg-pink-50 hover:bg-pink-100 border-4 border-pink-200 rounded-2xl text-4xl font-cartoon text-pink-600 shadow-sm active:translate-y-1"
          >
            {opt}
          </button>
        ))}
      </div>

      <div className="mt-12 text-gray-400">
        进度: {currentIdx + 1} / {items.length}
      </div>

      {showFeedback && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 animate__animated animate__bounceIn">
          {showFeedback === 'correct' ? (
            <div className="bg-white/95 p-12 rounded-full shadow-2xl border-8 border-green-200 flex flex-col items-center">
              <span className="text-7xl mb-2">🌟</span>
              <span className="text-3xl font-cartoon text-green-500">太棒了！</span>
            </div>
          ) : (
            <div className="bg-white/95 p-12 rounded-full shadow-2xl border-8 border-red-200 flex flex-col items-center">
              <span className="text-7xl mb-2">💡</span>
              <span className="text-3xl font-cartoon text-red-500">再想一想</span>
            </div>
          )}
        </div>
      )}

      <CelebrationModal
        show={showCelebration}
        title="全填对啦！"
        message="语文小达人就是你！"
        emoji="✍️"
        onClose={handleCelebrationClose}
      />
    </div>
  );
};

export default GameThree;

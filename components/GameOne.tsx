
import React, { useState, useEffect, useCallback } from 'react';
import { GAME_DATA_1 } from '../constants';
import { MatchCard } from '../types';
import CelebrationModal from './CelebrationModal';

interface GameOneProps {
  level: number;
  onScoreChange: (score: number) => void;
  onComplete: () => void;
}

const GameOne: React.FC<GameOneProps> = ({ level, onScoreChange, onComplete }) => {
  const [cards, setCards] = useState<MatchCard[]>([]);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());
  const [shakeId, setShakeId] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState<'correct' | 'wrong' | null>(null);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    // Generate 20 pairs (40 cards) for the level to cover 200 items in 10 levels
    const itemsPerLevel = 20;
    const offset = (level - 1) * itemsPerLevel;
    const selection = [];

    for (let i = 0; i < itemsPerLevel; i++) {
      // Accessing indices up to 200 via modulo or direct offset
      selection.push(GAME_DATA_1[(offset + i) % GAME_DATA_1.length]);
    }

    const initialCards: MatchCard[] = [];
    selection.forEach((item, index) => {
      initialCards.push({
        id: `char-${index}`,
        content: item.char,
        type: 'char',
        matchId: `pair-${index}`
      });
      initialCards.push({
        id: `pinyin-${index}`,
        content: item.pinyin,
        type: 'pinyin',
        matchId: `pair-${index}`
      });
    });

    setCards(initialCards.sort(() => Math.random() - 0.5));
    setMatchedIds(new Set());
    setSelectedIds([]);
    setShowCelebration(false);
  }, [level]);

  const handleCardClick = (card: MatchCard) => {
    if (matchedIds.has(card.id) || selectedIds.includes(card.id) || selectedIds.length >= 2) return;

    const newSelection = [...selectedIds, card.id];
    setSelectedIds(newSelection);

    if (newSelection.length === 2) {
      const card1 = cards.find(c => c.id === newSelection[0])!;
      const card2 = cards.find(c => c.id === newSelection[1])!;

      if (card1.matchId === card2.matchId && card1.type !== card2.type) {
        // Correct match
        setTimeout(() => {
          setMatchedIds(prev => {
            const next = new Set(prev);
            next.add(card1.id);
            next.add(card2.id);
            return next;
          });
          setSelectedIds([]);
          onScoreChange(prev => prev + 10);
          setShowFeedback('correct');
          setTimeout(() => setShowFeedback(null), 800);
        }, 300);
      } else {
        // Wrong match
        setShakeId(card2.id);
        setShowFeedback('wrong');
        setTimeout(() => {
          setSelectedIds([]);
          setShakeId(null);
          setShowFeedback(null);
        }, 1000);
      }
    }
  };

  useEffect(() => {
    if (matchedIds.size > 0 && matchedIds.size === cards.length) {
      setTimeout(() => {
        setShowCelebration(true);
      }, 500);
    }
  }, [matchedIds, cards.length]);

  const handleCelebrationClose = () => {
    setShowCelebration(false);
    onComplete();
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      <h3 className="text-2xl md:text-3xl font-cartoon text-blue-500 mb-4">识字消消乐：汉字 + 拼音</h3>
      <p className="mb-6 text-gray-500 font-cartoon">本关共有 20 组词汇，挑战开始！</p>

      {/* 40 cards total: Using an 8-column grid on desktop for 5 rows, or 4-column on mobile */}
      <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-8 gap-2 md:gap-3 w-full max-w-5xl px-2">
        {cards.map(card => {
          const isMatched = matchedIds.has(card.id);
          const isSelected = selectedIds.includes(card.id);
          const isShaking = shakeId === card.id;

          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(card)}
              className={`
                aspect-square flex items-center justify-center text-lg md:text-xl font-cartoon rounded-lg border-2 md:border-4 transition-all
                ${isMatched ? 'opacity-0 scale-50 pointer-events-none' : 'shadow-sm cursor-pointer'}
                ${isSelected ? 'border-yellow-400 bg-yellow-50 scale-105 z-10' : 'border-blue-100 bg-white hover:border-blue-300'}
                ${isShaking ? 'shake border-red-400 bg-red-50' : ''}
              `}
            >
              {card.content}
            </div>
          );
        })}
      </div>

      <div className="mt-8 text-blue-600 font-cartoon">
        已配对: {matchedIds.size / 2} / 20
      </div>

      {showFeedback && (
        <div className="fixed inset-0 pointer-events-none flex items-center justify-center z-50 animate__animated animate__zoomIn">
          {showFeedback === 'correct' ? (
            <div className="bg-white/80 p-8 rounded-full shadow-2xl flex flex-col items-center">
              <span className="correct-checkmark">✅</span>
              <span className="text-2xl font-cartoon text-green-500">太棒了！</span>
            </div>
          ) : (
            <div className="bg-white/80 p-8 rounded-full shadow-2xl flex flex-col items-center">
              <span className="wrong-cross">❌</span>
              <span className="text-2xl font-cartoon text-red-500">再接再厉</span>
            </div>
          )}
        </div>
      )}

      <CelebrationModal
        show={showCelebration}
        title="太棒了！过关啦！"
        message="你成功配对了所有汉字和拼音！"
        emoji="🎉"
        onClose={handleCelebrationClose}
      />
    </div>
  );
};

export default GameOne;

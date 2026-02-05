
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { GAME_DATA_1, GAME_DATA_2, GAME_DATA_3 } from './constants';
import { GameType, GameState, LevelData } from './types';
import GameOne from './components/GameOne';
import GameTwo from './components/GameTwo';
import GameThree from './components/GameThree';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.HOME);
  const [currentGameType, setCurrentGameType] = useState<GameType | null>(null);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [score, setScore] = useState(0);

  const goHome = () => {
    setGameState(GameState.HOME);
    setCurrentGameType(null);
  };

  const selectGame = (type: GameType) => {
    setCurrentGameType(type);
    setGameState(GameState.LEVEL_SELECT);
  };

  const startLevel = (level: number) => {
    setCurrentLevel(level);
    setGameState(GameState.PLAYING);
    setScore(0);
  };

  const renderHome = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate__animated animate__fadeIn">
      <h1 className="text-5xl md:text-7xl font-cartoon text-green-600 mb-12 drop-shadow-md text-center">
        五年级语文互动学习乐园
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
        <button 
          onClick={() => selectGame(GameType.MATCH)}
          className="bubble-btn bg-blue-400 p-8 rounded-3xl text-white text-3xl font-cartoon border-b-8 border-blue-600 active:translate-y-1 active:border-b-4"
        >
          <div className="text-6xl mb-4">🧩</div>
          识字消消乐
        </button>
        <button 
          onClick={() => selectGame(GameType.TYPO)}
          className="bubble-btn bg-yellow-400 p-8 rounded-3xl text-white text-3xl font-cartoon border-b-8 border-yellow-600 active:translate-y-1 active:border-b-4"
        >
          <div className="text-6xl mb-4">👁️</div>
          火眼金睛找茬
        </button>
        <button 
          onClick={() => selectGame(GameType.FILL)}
          className="bubble-btn bg-pink-400 p-8 rounded-3xl text-white text-3xl font-cartoon border-b-8 border-pink-600 active:translate-y-1 active:border-b-4"
        >
          <div className="text-6xl mb-4">✍️</div>
          词语填空大挑战
        </button>
      </div>
    </div>
  );

  const renderLevelSelect = () => (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 animate__animated animate__fadeIn">
      <button 
        onClick={goHome}
        className="absolute top-8 left-8 bg-gray-500 text-white px-6 py-2 rounded-full font-cartoon hover:bg-gray-600"
      >
        返回首页
      </button>
      <h2 className="text-4xl font-cartoon text-blue-600 mb-10">关卡选择</h2>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        {Array.from({ length: 10 }, (_, i) => i + 1).map((lvl) => (
          <button
            key={lvl}
            onClick={() => startLevel(lvl)}
            className="w-20 h-20 md:w-24 md:h-24 bg-white rounded-2xl flex items-center justify-center text-2xl font-cartoon text-green-500 border-4 border-green-200 hover:border-green-400 transition-all shadow-sm"
          >
            Lvl {lvl}
          </button>
        ))}
      </div>
    </div>
  );

  const renderGame = () => {
    if (!currentGameType) return null;

    return (
      <div className="min-h-screen p-4 flex flex-col items-center">
        <div className="w-full max-w-4xl flex justify-between items-center mb-6">
          <button 
            onClick={() => setGameState(GameState.LEVEL_SELECT)}
            className="bg-orange-400 text-white px-6 py-2 rounded-full font-cartoon hover:bg-orange-500 shadow-md"
          >
            ← 退出重选
          </button>
          <div className="text-2xl font-cartoon text-gray-700 bg-white px-6 py-2 rounded-full shadow-inner border">
            关卡: {currentLevel} | 分数: {score}
          </div>
        </div>

        <div className="w-full max-w-4xl bg-white rounded-3xl p-6 shadow-xl min-h-[60vh] flex flex-col items-center justify-center border-4 border-green-100">
          {currentGameType === GameType.MATCH && (
            <GameOne level={currentLevel} onScoreChange={setScore} onComplete={() => setGameState(GameState.LEVEL_SELECT)} />
          )}
          {currentGameType === GameType.TYPO && (
            <GameTwo level={currentLevel} onScoreChange={setScore} onComplete={() => setGameState(GameState.LEVEL_SELECT)} />
          )}
          {currentGameType === GameType.FILL && (
            <GameThree level={currentLevel} onScoreChange={setScore} onComplete={() => setGameState(GameState.LEVEL_SELECT)} />
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-green-50 min-h-screen">
      {gameState === GameState.HOME && renderHome()}
      {gameState === GameState.LEVEL_SELECT && renderLevelSelect()}
      {gameState === GameState.PLAYING && renderGame()}
    </div>
  );
};

export default App;

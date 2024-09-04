import React, { useState, useEffect } from 'react';

type Player = 'X' | 'O' | null;
type Difficulty = 'Easy' | 'Medium' | 'Hard';

export const TicTacToe: React.FC = () => {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<Player>('X');
  const [winner, setWinner] = useState<Player>(null);
  const [difficulty] = useState<Difficulty>('Medium');

  const handleClick = (index: number) => {
    if (board[index] || winner || currentPlayer === 'O') return;

    const newBoard = board.slice();
    newBoard[index] = 'X';
    setBoard(newBoard);

    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    } else {
      setCurrentPlayer('O');
    }
  };

  useEffect(() => {
    if (currentPlayer === 'O' && !winner) {
      const aiMove = calculateAiMove(board, difficulty);
      const newBoard = board.slice();
      newBoard[aiMove] = 'O';
      setBoard(newBoard);

      const newWinner = calculateWinner(newBoard);
      if (newWinner) {
        setWinner(newWinner);
      } else {
        setCurrentPlayer('X');
      }
    }
  }, [currentPlayer, board, winner, difficulty]);

  const calculateWinner = (board: Player[]): Player => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const calculateAiMove = (board: Player[], difficulty: Difficulty): number => {
    if (difficulty === 'Easy') {
      const emptyIndices = board
        .map((value, index) => (value === null ? index : null))
        .filter((index) => index !== null) as number[];
      return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    if (difficulty === 'Medium') {
      const randomMove = Math.random();
      if (randomMove < 0.5) {
        const emptyIndices = board
          .map((value, index) => (value === null ? index : null))
          .filter((index) => index !== null) as number[];
        return emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
      }
    }

    // Hard difficulty uses minimax algorithm
    return minimax(board, 'O').index;
  };

  const minimax = (newBoard: Player[], player: Player) => {
    const emptyIndices = newBoard
      .map((value, index) => (value === null ? index : null))
      .filter((index) => index !== null) as number[];

    if (calculateWinner(newBoard) === 'X') {
      return { score: -10 };
    } else if (calculateWinner(newBoard) === 'O') {
      return { score: 10 };
    } else if (emptyIndices.length === 0) {
      return { score: 0 };
    }

    const moves: any[] = [];

    for (const index of emptyIndices) {
      const move: any = {};
      move.index = index;
      newBoard[index] = player;

      if (player === 'O') {
        const result = minimax(newBoard, 'X');
        move.score = result.score;
      } else {
        const result = minimax(newBoard, 'O');
        move.score = result.score;
      }

      newBoard[index] = null;
      moves.push(move);
    }

    let bestMove: any;
    if (player === 'O') {
      let bestScore = -10000;
      for (const move of moves) {
        if (move.score > bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    } else {
      let bestScore = 10000;
      for (const move of moves) {
        if (move.score < bestScore) {
          bestScore = move.score;
          bestMove = move;
        }
      }
    }

    return bestMove;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer('X');
    setWinner(null);
  };

  return (
    <div className='flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white'>
      <h1 className='text-4xl font-bold mb-4'>Tic Tac Toe</h1>
      {winner ? (
        <h2 className='text-2xl mb-4'>Winner: {winner}</h2>
      ) : (
        <h2 className='text-2xl mb-4'>Current Player: {currentPlayer}</h2>
      )}
      <div className='grid grid-cols-3 gap-2 w-64 h-64'>
        {board.map((player, index) => (
          <div
            key={index}
            className='flex items-center justify-center w-20 h-20 bg-gray-800 border border-gray-700 text-2xl cursor-pointer'
            onClick={() => handleClick(index)}
          >
            {player}
          </div>
        ))}
      </div>
      <button
        className='mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded'
        onClick={resetGame}
      >
        Reset Game
      </button>
    </div>
  );
};

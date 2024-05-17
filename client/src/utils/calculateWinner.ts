import { SquareType, XorO } from '../types';



export const calculateWinner = (squares: SquareType[], gridSize: number): XorO | null => {
  const winningLines = generateRowColumnPairs(gridSize);
  for (const line of winningLines) {
    const [first, ...rest] = line;
    if (squares[first] && rest.every(index => squares[index] === squares[first])) {
      return squares[first];
    }
  }
  return null;
};


function generateRowColumnPairs(n: number): number[][] {
  const result: number[][] = [];
  const mainDiagonal: number[] = [];
  const antiDiagonal: number[] = [];

  for (let i = 0; i < n; i++) {
      const row: number[] = [];
      const col: number[] = [];

      for (let j = 0; j < n; j++) {
          row.push(i * n + j); 
          col.push(j * n + i); 
      }

      result.push(row);
      result.push(col);

      mainDiagonal.push(i * n + i); 
      antiDiagonal.push(i * n + (n - 1 - i)); // anti-diagonal index
  }

  result.push(mainDiagonal);
  result.push(antiDiagonal);

  return result;
}

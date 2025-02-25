import Airplane from '@/assets/airplane.svg?react';
import Bicycle from '@/assets/bicycle.svg?react';
import Boat from '@/assets/boat.svg?react';
import Bus from '@/assets/bus.svg?react';
import CarSport from '@/assets/car.svg?react';
import Person from '@/assets/person.svg?react';

import {clsx, type ClassValue} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const INPUT_DATA_GRID_SIZE = 200;

export const SYMBOLS = [
  '#',
  '@',
  '$',
  '%',
  '&',
  '*'
] as const;

export type TypeSYMBOLS = typeof SYMBOLS[number];

const ALLOWED_CHARACTERS = [
  '.',
  ...SYMBOLS
] as const;

type MatrixCell = string | number | typeof ALLOWED_CHARACTERS[number] | undefined;
type Matrix = MatrixCell[][];

export type Neighborhood = {
  type: MatrixCell;
  id: `${number}-${number}`;
  value: number;
  cells: Matrix;
};

/**
 * Coloring based on the value
 * - The value is a number between 0 and 72
 * - The color should be calculated as follows:
 * - The value is converted to a percentage (0-100)
 * - The percentage is converted to a color value, where 0 is white and 100 is green, the values in between are shades of green
 * @param {number} value
 * */
export function valueToGreenColor(value: number) {
  const percentage = (value / 72) * 100; // Convert value to percentage (0-100)
  const lightness = 100 - (percentage * 0.7); // Scale lightness (100% to 30%)
  return `hsl(120, 100%, ${lightness}%)`;
}

function generateCell() {
  const isEmpty = Math.random() > 0.7;
  if (isEmpty) return '.';
  const isNumeric = Math.random() > 0.05;
  if (isNumeric) return Math.floor(Math.random() * 10);
  return SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
}

export function generateInputData() {
  const inputData = [];
  for (let i = 0; i < INPUT_DATA_GRID_SIZE; i++) {
    const row = [];
    for (let j = 0; j < INPUT_DATA_GRID_SIZE; j++) {
      row.push(generateCell());
    }
    inputData.push(row);
  }
  const finalInputData = inputData.map((row) => row.join(' ')).join('\n');
  // window.inputData = finalInputData; // This is useful for cypress tests
  return finalInputData;
}

export function matrixToNeighborhoods(matrix: Matrix): Neighborhood[] {
  const matrixDimension = matrix.length;
  const neighborhoods: Neighborhood[] = [];

  for (let i = 0; i < matrixDimension; i++) {
    for (let j = 0; j < matrixDimension; j++) {
      if (typeof matrix[i][j] === 'string' && matrix[i][j] !== '.') {
        const cells = [
          [
            matrix[i - 1]?.[j - 1],
            matrix[i - 1]?.[j],
            matrix[i - 1]?.[j + 1]
          ],
          [
            matrix[i][j - 1],
            matrix[i][j],
            matrix[i][j + 1]
          ],
          [
            matrix[i + 1]?.[j - 1],
            matrix[i + 1]?.[j],
            matrix[i + 1]?.[j + 1]
          ]
        ];

        const sum = cells.flat().reduce((acc: number, cell) => {
          return acc + (typeof cell === 'number' ? cell : 0);
        }, 0);

        neighborhoods.push({
          type: matrix[i][j],
          id: `${i}-${j}`,
          value: sum,
          cells,
        });
      }
    }
  }

  return neighborhoods;
}

export function parseAndRotateMatrix(matrixString: string): Matrix | Error {
  if (matrixString === '') {
    return [];
  }

  const rows = matrixString.split('\n').map(row => row.split(' '));

  if (rows.length !== rows[0].length) {
    throw new Error('Matrix is not square');
  }

  const cols = rows.map(row => row.map(cell => {
    let num: MatrixCell;

    const parsedNum = parseInt(cell, 10);
    if (isNaN(parsedNum)) {
      if (!ALLOWED_CHARACTERS.includes(cell as typeof ALLOWED_CHARACTERS[number])) {
        throw new Error('Invalid characters in the matrix');
      }
      num = cell as typeof ALLOWED_CHARACTERS[number];
    }
    else {
      if (parsedNum < 0 || parsedNum > 9) {
        throw new Error('Numbers are not between 0 and 9');
      }
      num = parsedNum === 9 ? 0 : parsedNum + 1;
    }

    return num;
  }));

  return cols[0].map((_, i) => cols.map(row => row[i])).reverse();
}

// You can use these components in your code like this:
// const Icon = symbolToIcon['#'];
// return <Icon />;
export const symbolToIcon : {
  [key in TypeSYMBOLS]: React.FC<React.SVGProps<SVGSVGElement>>
} = {
  [SYMBOLS[0]]: Person,
  [SYMBOLS[1]]: Airplane,
  [SYMBOLS[2]]: Bicycle,
  [SYMBOLS[3]]: Boat,
  [SYMBOLS[4]]: Bus,
  [SYMBOLS[5]]: CarSport,
}

class Graph {
  constructor(start) {
    this.vertices = new Map();
    if (start) this.add(start);
  }

  add(vertex) {
    if (!this.vertices.has(`[${vertex}]`)) {
      this.vertices.set(`[${vertex}]`, []);
    }
  }

  link(vertex1, vertex2) {
    if (
      this.vertices.has(`[${vertex1}]`) &&
      this.vertices.has(`[${vertex2}]`)
    ) {
      this.vertices.get(`[${vertex1}]`).push(vertex2);
      this.vertices.get(`[${vertex2}]`).push(vertex1);
      return;
    }
  }

  get(vertex) {
    // reimplementing to resolve referencing issue.
    return this.vertices.get(`[${vertex}]`);
  }

  has(vertex) {
    // reimplementing to resolve referencing issue.
    return this.vertices.has(`[${vertex}]`);
  }
}

function getAllPossibleKnightMoves(pos) {
  if (pos[0] >= 8 || pos[1] >= 8 || pos[0] < 0 || pos[1] < 0) return [];
  const possibleX = [-1, -2, -2, -1, 1, 2, 2, 1];
  const possibleY = [-2, -1, 1, 2, -2, -1, 1, 2];
  const possibleMoves = [];

  for (let i = 0; i < 8; i++) {
    const x = pos[0] + possibleX[i];
    const y = pos[1] + possibleY[i];
    if (x >= 0 && y >= 0 && x < 8 && y < 8) possibleMoves.push([x, y]);
  }

  return possibleMoves;
}

function arrayEquals(arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  return arr1.every((e, i) => e === arr2[i]);
}

function checkPositionValidity(pos) {
  if (pos[0] >= 8 || pos[1] >= 8 || pos[0] < 0 || pos[1] < 0) return false;
  return true;
}

function knightMove(start, end) {
  if (!checkPositionValidity(start) || !checkPositionValidity(end))
    throw new Error(
      'Invalid arguments. Please enter positions within [0, 0] and [7, 7]'
    );
  if (arrayEquals(start, end)) return [start];

  const queue = [start];
  const visited = [];
  const graph = new Graph(start);
  const path = [];

  while (queue.length !== 0) {
    let current = queue.shift();
    const possibleMoves = getAllPossibleKnightMoves(current);
    for (const move of possibleMoves) {
      if (graph.has(move)) {
        if (
          !graph.get(current).find((neighbor) => arrayEquals(neighbor, move))
        ) {
          graph.link(current, move);
        }
        continue;
      }

      graph.add(move);
      graph.link(move, current);

      if (arrayEquals(move, end)) {
        path.push(move, current);
        while (!arrayEquals(current, start)) {
          for (const neighbor of graph.get(current)) {
            if (visited.find((pos) => arrayEquals(pos, neighbor))) {
              path.push(neighbor);
              current = neighbor;
              break;
            }
          }
        }
        return path.reverse();
      }
      if (!visited.find((pos) => arrayEquals(pos, current))) queue.push(move);
    }
    visited.push(current);
  }
  return [];
}

function prettyPrint(path) {
  console.log(`You made it in ${path.length - 1} moves! Here's your path:`);
  path.forEach((pos) => console.log(`[${pos}]`));
}

const one = knightMove([0, 0], [3, 3]);
const two = knightMove([0, 7], [1, 3]);
const three = knightMove([7, 7], [7, 6]);
// const four = knightMove([0, -1], [7, 3]); should throw error
// const five = knightMove([0, 1], [8, 3]); should throw error

prettyPrint(one);
prettyPrint(two);
prettyPrint(three);

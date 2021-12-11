import { readFile } from 'fs/promises';

async function getInputs() {
  const contents = await readFile('input.txt');
  return contents.toString().split('\n').map(line => line.trim());
}

function getInstruction(line) {
  const parts = line.split(' ');
  return { direction: parts[0], distance: Number(parts[1]) };
}

function parseInstruction({direction, distance}, {length, depth, aim}) {
  switch (direction) {
    case 'forward': {
      return {length: length + distance, depth: depth + (aim * distance), aim};
    }
    case 'down': {
      return {length, depth, aim: aim + distance};
    }
    case 'up': {
      return {length, depth: depth, aim: aim - distance};
    }
    default: {
      throw new Error('invalid direction');
    }
  }
}

function executeInstructions(instructions) {
  let coordinates = {length: 0, depth: 0, aim: 0};
  for (const instruction of instructions) {
    coordinates = parseInstruction(instruction, coordinates);
  }
  return coordinates;
}

(async function main() {
  const inputs = await getInputs();
  const instructions = inputs.map(line => getInstruction(line));
  const coordinates = executeInstructions(instructions);
  console.log(`${coordinates.length} * ${coordinates.depth} = ${coordinates.length * coordinates.depth}`);
})();
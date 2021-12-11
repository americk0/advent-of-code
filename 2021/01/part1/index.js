import { readFile } from 'fs/promises';

async function getInputs() {
  const file = await readFile('input.txt');
  const inputs = file.toString()
    .split('\n')
    .map(line => Number(line.trim()));
  return inputs;
}

function countIncreases(inputs) {
  let count = 0;
  for (let i=1; i<inputs.length; i++) {
    if (inputs[i] > inputs[i-1]) {
      count++;
    }
  }
  return count;
}

getInputs().then(inputs => {
  console.log(countIncreases(inputs));
});

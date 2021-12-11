import { readFile } from 'fs/promises';

async function getInputs() {
  const file = await readFile('input.txt');
  const inputs = file.toString()
    .split('\n')
    .map(line => Number(line.trim()));
  return inputs;
}

function sumWindow(size, index, data) {
  let sum = 0;
  for (let i=index; i>index-size; i--) {
    sum += data[i];
  }
  return sum;
}

function countIncreases(inputs) {
  let count = 0;
  for (let i=3; i<inputs.length; i++) {
    if (sumWindow(3, i, inputs) > sumWindow(3, i-1, inputs)) {
      count++;
    }
  }
  return count;
}

getInputs().then(inputs => {
  console.log(countIncreases(inputs));
});

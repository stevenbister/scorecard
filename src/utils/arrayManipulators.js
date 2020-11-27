const stringToArray = (str) => {
  // use regex to replace the html <div>s with a ' ' and the </div> with ''
  const divRegex = /<div>/g;
  const closingDivRegex = /<\/div>/g;
  const blankSpaceRegex = /&nbsp;/g;
  // Replace the <br>s with a 0 so we can do calculations safely
  const brRegex = /<br>/g;

  const strWithSpaces = str
    .replace(divRegex, ' ')
    .replace(closingDivRegex, '')
    .replace(brRegex, '')
    .replace(blankSpaceRegex, '');

  const array = strWithSpaces.split(' ');

  // If the first item in the array is empty then remove it
  // Fixes an issue in FireFox where empty first item was getting added
  if ( Array.isArray(array) && array[0] === '' ) {
    array.shift();
  }

  console.log(array);

  return array;
}

// Convert the array values into numbers
const arrayValuesToNumbers = (arr) => arr.map( value => Number(value))

// Get the sum of the array
const sumArray = (arr) =>  arr.reduce((accumulator, currentValue) => accumulator + currentValue);

export { stringToArray, arrayValuesToNumbers, sumArray }

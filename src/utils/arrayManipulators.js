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
    .replace(blankSpaceRegex, '')
    .trim();

  const array = strWithSpaces.split(' ');

  // If the first item in the array is empty then remove it
  // Fixes an issue in FireFox where empty first item was getting added
  if ( Array.isArray(array) && array[0] === '' ) {
    array.shift();
  }

  return array;
}

// Convert the array values into numbers
const arrayValuesToNumbers = (arr) => arr.map( value => Number(value))

// Get the sum of the array
const sumArray = (arr) =>  {
  if (Array.isArray(arr) && arr.length) {
    const result = arr.reduce((accumulator, currentValue) => accumulator + currentValue);

    // Catch NaN value and return 0 as a nice output for the user
    if (isNaN(result)) return 0;

    return result;
  }

  return 0;
}

export { stringToArray, arrayValuesToNumbers, sumArray }

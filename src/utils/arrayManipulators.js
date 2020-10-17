const stringToArray = (str) => {
  // use regex to replace the html <div>s with a ' ' and the </div> with ''
  const divRegex = /<div>/g
  const closingDivRegex = /<\/div>/g
  // Replace the <br>s with a 0 so we can do calculations safely
  const brRegex = /<br>/g

  const strWithSpaces = str.replace(divRegex, ' ').replace(closingDivRegex, '').replace(brRegex, 0);

  // push into an array as numbers
  return strWithSpaces.split(' ');
}

// Convert the array values into numbers
const arrayValuesToNumbers = (arr) => arr.map( value => parseFloat(value))

// Get the sum of the array
const sumArray = (arr) =>  arr.reduce((accumulator, currentValue) => accumulator + currentValue);

export { stringToArray, arrayValuesToNumbers, sumArray }

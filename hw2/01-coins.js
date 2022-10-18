/** Exercise 01 - Coins **/

/******************************************************************************************************
  FUNCTION: generateOutput
  PARAMETERS: original input, cv (coin values) array
  RETURNS: output string (`x dollars, y quarters, ...`)
  DESCRIPTION: 
    The function gathers the information about the number of coins from `cv` and initializes a new
    array, `x`, that contains a string of the number of each specific currency + the name of the 
    currency itself in singular form. 

    It then iterates over each of the currencies in `x`, changing the string to plural if necessary and
    adding it to the output string. After iterating, it then returns the output string.
******************************************************************************************************/
function generateOutput(input, cv) {
  const x = [`${cv[0]} dollar`, `${cv[1]} quarter`, `${cv[2]} dime`, `${cv[3]} nickel`, `${cv[4]} penny`];
  let output = `${input} ==> `;

  for (let i = 0; i < 5; i++) {
    if (i === 4 && cv[4] > 1) output += `${cv[4]} pennies`;
    else if (i === 4) output += `${x[4]}`;
    else if (cv[i] > 1) output += `${x[i]}s, `;
    else if (cv[i] !== 0) output += `${x[i]}, `;
  }

  return output;
}


/******************************************************************************************************
  FUNCTION: calculateChange
  PARAMETERS: input
  RETURNS: output string (`x dollars, y quarters, ...`)
  DESCRIPTION:
    First, the function error checks the size of the input. It then splits apart the input to store 
    the decimal value. For each of the coin values (25 - quarter, 10 - dime, 5 - nickel 1 - penny), 
    it calculates how many the input value needs. The resultant array is named `coinVals`. It 
    then returns the output of the call to `generateOutput()` - sending the original `input`, along
    with the number of dollars (which is the whole number of `input`) prepended to `coinVals`.
******************************************************************************************************/
const calculateChange = (input) => {
  if (input > 10.00) return `${input} => Error: the number is too large`;
  
  let decimal = input.toString().split('.')[1], temp;
  
  const coinVals = [25, 10, 5, 1].map(x => {
      if (x === 1) return x = decimal;
      else {
        temp = Math.trunc(decimal / x);
        decimal -= (temp * x);
        return temp;
      }});

  return generateOutput(input, [Math.trunc(input), ...coinVals]);
};


// TESTS
 console.log(calculateChange(4.62)); // $4.62 ==> 4 dollars, 2 quarters, 1 dime, 2 pennies
 console.log(calculateChange(9.74)); // $9.74 ==> 9 dollars, 2 quarters, 2 dimes, 4 pennies
 console.log(calculateChange(0.16)); // $0.16 ==> 1 dime, 1 nickel, 1 penny
 console.log(calculateChange(15.11)); // $15.11 ==> Error: the number is too large

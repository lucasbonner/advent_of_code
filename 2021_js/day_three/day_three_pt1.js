/*
Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate,
then multiply them together. What is the power consumption of the submarine?
(Be sure to represent your answer in decimal, not binary.)
*/
/*
-----------------------INSTRUCTIONS--------------------------------------
Use the binary numbers in your diagnostic report to calculate the gamma rate and epsilon rate,
then multiply them together. What is the power consumption of the submarine?
(Be sure to represent your answer in decimal, not binary.)
--------------------------PROBLEM----------------------------------------

Questions:

Input: long string of binary

Output: integer (power consumption)

---------------------------RULES-----------------------------------------
Explicit:
gamma rate * epsilon rate = power consumption
gamma rate constructed using MOST common bits
epsilon rate created using Least common bit

Implicit:

--------------------------EXAMPLES---------------------------------------
00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010

collection of first index -> {0: 5, 1: 7} -> most (1), least (0)
collection of second index -> {0: 7, 1: 5} -> most (0), least (1)
collection of third index -> {0: 4, 1: 8}  -> most(1), least(0)
collection of fourth index -> {0: 5, 1: 7} -> most (1), least (0)
collection of fifth index -> {0: 7,1: 5} -> most(0), least(1)

most -> '10110' -> 22 (gamma)
least -> '01001' -> 9 (epsilon)
22 * 9 -> 198 power consumption
----------------------------ALGO----------------------------------------
have an array of each binaryString ex '0001100000011, '1101110111101'..........
  need total count of 0 and 1 for each INDEX
could have helper method, called 'collect'
  pass index and binaryString
    it gets collection of every element at that index on each string ex. ['0', '1', '0'....]
      have another helper, countOccurences
      pass collection and object
        builds object by counting '0' and '1', result -> {'0' : 7, '1', :5}
      if result['0'] > result['1']
        gamma.push('0')
        epsilon.push('1')
      else
        gamma +='0'
        epsilon += '1'
      restart object
return gamma * epsilon (parsed to integers)
*/

function collect(arr, index) {
  return arr.map((elem) => elem[index]);
}

function countOccurences(binaryArr, countObject) {
  binaryArr.forEach((elem) => {
    countObject[elem]++;
  });
  return countObject;
}

function binaryDiagnostic(str) {
  let binaryStringArr = str.split('\n');
  let gamma = "";
  let epsilon = "";

  for (let idx = 0; idx <= binaryStringArr[0].length - 1; idx++) {
    let occurences = {'0': 0, '1': 0};
    let currentIndexArr = collect(binaryStringArr, idx);
    occurences = countOccurences(currentIndexArr, occurences);
    if (occurences['0'] > occurences['1']) {
      gamma += '0';
      epsilon += '1';
    } else {
      gamma += '1';
      epsilon += '0';
    }
    occurences = {'0': 0, '1': 0};
  }
  return parseInt(gamma,2) * parseInt(epsilon,2);
}

console.log(binaryDiagnostic(`00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`));

console.log(binaryDiagnostic(`000110000001
011011001101
001101100111
001101011001
110111011101
110011101010
111101010001
010100111101
011000011000
001110110011
001100010110
110111101100
110001111100
001011111100
000000011010
110101100111
011000011111
011000000111
011111000110
100101110111
010101001110
111101000011
010010010110
100100011111
101011001110
001111110000
110000011111
110000011000
011001111100
010010001101
000111001110
110111001110
110001010101
100111011001
000101110000
110001011100
111101010010
101011000001
001101001111
110111101010
101111111000
110101000110
011111001001
001110100001
010100110111
110100000110
101010110010
100100101110
101111011110
000110110101
011011110101
111001011110
110110100111
000100010001
001101010110
100011000110
001110010010
010111110111
011010011101
110000011100
010100001001
000110100000
101001010000
000001110000
101110010011
010011100111
010011011000
110111011111
000111010010
101010111010
111001100100
101110100011
111101111110
010111111000
010010001111
110010000011
001110000010
100101111110
000100101001
101101010000
111111010000
101010011000
011100100001
011101101000
001010010100
010010100011
110011111111
110100011001
111010011110
011110001101
011010011100
100100000001
111111001010
110100110011
110100011111
100010001110
101000111100
100001110010
110101010011
101010011101
011010011010
101110101101
001100011010
101001010101
101010000100
000110101010
100000111100
000111111100
000001001011
010010111100
011000111001
111010101100
010011100010
010100110001
001100111011
101100001111
111010101111
010001000011
000001100010
000100001011
100110011011
101100001110
000010110100
011000101011
010011011100
110101010000
101101101100
101001110000
010111010011
110101110001
011000001000
011101010010
111011111110
010010000110
110000111000
101000000110
011100110000
111001111010
110000001100
101011111110
100001111100
011011100110
101000001101
001011110011
111100100011
101111000111
101000000001
001001011010
010111111010
101010111001
011110101001
101100111101
011100000010
000110001111
111100110101
100011100010
000110010100
011000000011
010011001011
000001101111
101011101101
100100100101
011001110110
010100000000
100100010001
001100000100
100000111010
101001011001
010010111001
110000101010
001101010101
110110011100
010000000011
111100011000
000101111110
100010110101
101111010000
000010100010
101101001010
011111000000
011000100100
110010100110
010001110011
010101101101
001011100000
001000110110
001000110111
110100111110
110010110100
101010100111
000111011001
111000101101
110000010110
010011101010
110100111011
100110010100
100111000011
011110111111
010010000111
111100111110
001010111101
000011001110
000110010101
111100110011
101111111001
101001111011
111010110000
000001010101
100010011001
111110110010
110100101100
100001011110
100001000011
101111000011
101111110100
111010000010
001010010110
010001000110
100010000101
111101111010
000101111111
010110110100
110111111110
011010101011
100000110011
000000101001
010010101111
010001001010
000101010100
101110111010
101001000000
001010101111
011110100110
110101011001
100111101101
110001001001
110100001010
100100101001
110111010011
011010001011
011001001101
110100010001
010100001100
011011000001
110100011100
001110111111
111001110010
001110010000
011100001110
001111110001
001101010111
111110011100
111100111010
010100010100
000011001010
011110001010
111101010011
100111001010
010110110011
000101000000
000110011010
100100001111
000100111111
010100010101
001110100011
100111000100
100001101110
011010011110
001111010101
111000001100
100111110110
101110001100
101011000111
001010110010
100011011100
110000010000
101001101011
111011011000
000101101001
011001111011
101011001111
001111111111
110000101011
111111100011
101010101111
001001010001
011111010001
001011101110
011010011011
011000001011
100000100000
001011110110
011000100011
001010011010
000010111111
001110001111
111110001100
010110100011
110101100010
100111110000
010000101011
011100011111
001100101010
101110110100
100101000111
111111111010
000001000001
110111011001
010011000000
101100000101
110000100100
110100100101
101011010010
101001000101
110001001111
010010011010
000110110111
011010110001
001101001001
010110101000
101000011000
110010011010
100101011111
001101110011
110001110001
011110000110
111011100101
001100111001
001011011011
001011110001
010001111101
011000101001
100100000110
011000101111
001010110100
000100101010
111011010110
100111000000
001000111010
101101001111
000110111010
001111100001
011110011001
100011000101
001010010011
110011100110
010010001011
110101101110
111100100101
101100100010
111010111101
000000000011
011011001110
101110000001
000111111000
100000110001
101101100111
001001011001
101100010010
001000011100
111011111100
010000100011
111010111100
011001101111
100011001111
011001111010
110110100101
010110100110
011110101101
011101110001
111000100101
000010000000
100110111001
000101000001
000001101100
011010000100
111000101001
111100111111
100110000110
100010001010
011110001000
100001100100
101101101010
101111010001
010001111100
001010111001
001101110111
010100101100
100011011101
010100111000
000110000000
110101101010
010100000101
101110111100
001010110000
000000010101
000100011000
011010110100
010000000010
111101100011
000111101001
011101011100
101000101101
110110101011
011010110011
011001101010
100000000011
101001111111
111010110100
010000011100
011011100000
110011011000
111011101111
100010110110
010000100111
110101110101
100010111001
011011101000
011010000001
001001111110
100010010001
010101000110
111111110010
101011011110
010011110110
000010010100
100011101111
001001110110
000100110100
100101110110
011010111001
010010101110
110010100011
011010101010
000101111000
111011110011
100111101110
101111101001
010111100010
111011001011
111110011110
110110010110
010110010111
011111001100
110111110010
110011111000
001110111101
111100111000
000100000010
110101111110
010111101101
111001001010
000010011100
110101100100
111000011110
010110000000
011100010011
011110010100
101000100111
111011110101
000100010000
000110110011
100011001011
111010100000
010100110101
001000000101
010001101100
010110000101
100100101111
011101111110
000011110000
000011010011
101111111110
101001101010
000010100011
010100101010
001111001110
011000001001
010001110100
010111011110
100000111111
101100010101
111101000110
110111101111
011010010010
011100011100
001111010010
111001101000
110110111010
101110000111
011100101100
011100001010
110101011101
011100010010
010101010010
000001111101
110100110111
011111100111
111101011110
110110000110
100110001011
111110000001
010001010011
101001110110
011101011101
010011011110
000100000000
100110010001
000011100110
101111100001
101100101010
001010101110
001111001101
110000000111
110010100001
011100000111
100111100111
101001011111
110000100011
111001000111
010101111010
110111100100
001010101100
001011110100
001010010111
110001001000
110010011001
110111011100
001110000011
010001000010
100000000101
110001101001
000101010111
101010110101
100000010000
000000111100
011011100100
110010001110
110110100000
101100001100
110010110111
010001100010
101110100010
001101101101
010100110000
010010100000
011101110100
100011011001
010110111101
010110011011
011111011111
001000000000
001101110101
010000010101
000101001000
011011100101
001010000101
110010001101
000001000011
001101001110
000101100010
010110100001
010111110011
011000100111
100001101011
100100100011
111100011001
010010101000
101010000010
010011000001
100000000010
010011101011
101110100111
111101101011
011010001111
001000011000
011111110111
101111011100
011011011111
110111100010
010010110001
111100010111
111000001111
101100010011
010101001101
110101100001
010111010110
110000001111
000111000000
110010010001
001110110101
101000010010
010110001100
001101101010
110110110110
000000000111
011010010000
011001010111
001010101011
001001100011
001111010110
000000100111
000000010100
001001110011
010111000010
010000001100
101111010111
101001110100
100011010111
000111110100
011101111010
000111000010
011100111100
011011110100
101000110011
010101110111
111101101000
010010011011
000101011111
010000000110
011110100101
111000000100
010110110101
010110111001
101110010000
010111001111
001001000110
010100010000
101100100111
101100001000
110110001001
011001001010
011001001110
110011101001
010100101111
111101001000
100000101100
111000011000
011000011100
111111010001
111100100100
011000111110
010011010000
100110101100
110000100001
001101010011
011000101110
000110010000
011010101100
001110001010
010101000001
101010010101
100000010111
000100110101
110111010110
101101101011
100101100101
101010011110
111001000100
011101100111
010000110101
100111010110
010011111110
111011100100
100010101101
010110100101
100011100000
110010011101
011110000011
111111110011
100001101100
000000011000
000100101101
000100110000
000110000010
011110010011
111001111111
000011110101
111001101100
111010111010
000101000101
111000010110
111010011000
101110100110
111100000100
101000110001
000001010110
101000100000
110111001010
001001101000
010011111010
100010100100
110010101001
111101100101
010001000101
011001111101
110000001110
100101101100
110110111100
010111011101
111011011100
011111011100
100100011001
111010011011
110011101011
100001101000
010110100010
101100100110
010110111010
111111011001
101011110011
011001101001
110011100111
010100111110
001001010011
010101110000
010111010101
100110011100
110010011011
001011010111
000001010100
001111011100
000010100100
010101011011
010100001011
000001011110
011111010111
010000101100
111111101111
100101010110
100011010101
100101100100
010011111101
010011001111
011010000101
110010000111
101110110110
000010001001
111000010010
111001001111
111000111010
010111011100
011010001101
111011011111
001010110001
011111111101
001001001011
100100011000
001000101010
101001111010
011101000010
111010000111
001000100000
100000100010
111111011000
110011000110
111111100010
100110011101
101111101000
001001001100
100001100001
100111110011
001000100010
011100011000
000001010010
100010111110
101111010010
100100000011
000101000010
101001011100
000101001101
000101110010
111111111011
110100000100
000001000010
101011010101
000011110011
000011001000
010111111001
111110100111
100110100111
001100001111
000100011110
001101000101
011110000000
000100111100
011110010111
011011010011
010101011110
100111001100
011111101010
011011001000
100100110100
011101010101
100101111001
100011101001
101010000001
101110111001
110100101111
010001001100
100110110000
100000111001
010111011011
111110001000
101000111101
000011010110
100010010010
010010011111
011110111110
000100111000
111100001101
000010110101
010010001110
101111000100
100101111100
010100011111
110101010010
000010111110
100001000100
001010001010
110000111100
010000101000
111000110110
001001101010
001101011100
001000001100
110010011100
011111000011
111100101101
110111010101
000010010110
111101110111
000011010010
111110000000
001111000101
100010111100
001011000011
010110000010
001101111101
101011000011
100001010010
100001010100
111100011101
010110001101
011101101101
101010101110
110111110100
001111001010
100010111101
011010001001
111111001000
100010100001
111010010110
001101000011
000011111011
110101000100
110101111101
010010000011
110101001111
001110111110
101111100011
011011011100
001100100100
010011111000
101010001111
111101010101
001110110001
101100010100
100010001000
101110000110
001101100001
111001000110
101110011110
100010000110
101010111011
001010110101
001101101110
100000101111
011001000001
010100001110
100111101000
011000110000
110000101111
010110111111
001110101000
111010100010
100000110100
100100000010
101010110011
010101000100
100100001011
000110011011
110001000010
111111000111
010001010010
001000011011
110010000101
111110110111
001000111001
101111100010
101001110010
001101101111
101001101101
001000010011
111000011111
111111110101
101001000001
010101101111
110100100100
001011101011
001010111100
000111100011
010001010100
110011000011
100111100000
001001111001
111111100001
001001100110
001000101001
111101011011
111000000010
100000100111
101011100100
001010111110
100110110100
110111100111
000110101000
011001000111
010111000001
101111101101
000001101101
000110100111
110001010100
111110101111
111110110101
111000010001
101111011010
101111110110
000000101100
010011010010
000101010101
100110101000
000111000011
001000010110
000111001010
000001000111
000101000110
000100010100
001011011101
001001111101
000000000101
000100100101
101010001101
001010000111
110110001110
000010011010
011001110101
111111101011
001100001100
100111001000
011010011000
000001101001
010001111001
001001110100
111110111000
000010010001
111111010011
100000011011
010110010100
010000111000
100001110110
111101111001
110000011010
100110101111
010001100111
100001011100
110000010011
010100001111
110010010110
110010111000
001011000110
101011001101
010000000100
010010000000
010100100101
110010100101
010101110110
101101001101
110000110011
110011110110
111101110110
001011111001
110101101000
101111111100
110011111101
100001111110
011101111000
101010000111
101110011111
101000010101`));

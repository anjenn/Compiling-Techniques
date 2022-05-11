import { infToPostfix } from "./postfix.js";
import { toNFA } from "./nfa.js";
import { search } from "./compare.js";

const inputF = document.getElementById("inputfile");
const outputF = document.getElementById("output");
const resOnBrowser = document.getElementById("results");
const arrFromText = [];
const resultArr = [];

//symbols treated: .; (; ); +; *; ?; |

// Comparison function
const compareStr = function (regEx, str) {
  const RE = infToPostfix(regEx);
  const convToNFA = toNFA(RE);
  return search(convToNFA, str);
};

/* Function that takes the regular expresison, and string
from the input file and checks the validity
*/
const textFileToNFA = function (arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(`!!Testing the Input No.${i + 1}`);
    let k = i * 2;
    arr[k] = arr[k].slice(4);
    result[i] = compareStr(arr[k], arr[k + 1]);
    //resultArr[i] += `${i}\n`;
  }
  dispOnBroser(result);
  console.log("Tester");

  //printing to screen doesn't work here
  //trying to either print it as an original array
  //or everything concatenated as one big string, but concatenated with \n
  return result;
};

const dispOnBroser = function (result) {
  for (let i = 0; i < result.lenth; i++) {
    resultArr[i] = `Case ${i} result: ${result[i]}\n`;
  }
  console.log(resultArr);
  resOnBrowser.textContent = resultArr.toString();
};

// Reading input file
inputF.addEventListener("change", function () {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function (progressEvent) {
    var lines = this.result.split("\n");
    for (var line = 0; line < lines.length - 1; line++) {
      console.log(line + " --> " + lines[line]);
      outputF.textContent = reader.result;
    }
    // function to get rid of the space after line (empty space is added to the end of all lines read)
    for (let j = 0; j < lines.length; j++) {
      arrFromText[j] = lines[j].slice(0, -1);
    }
    textFileToNFA(arrFromText);
  };
  reader.readAsText(file);
});

/*
// Printing to output file
const RE1 = "(A|b)*|a";
const RE2 = "324(A+B)*";
const RE3 = "a*|b";
const RE4 = "ba+(b|c)"; //this is suppposed to have concatenation symbols added

const RE5 = "(A|b)*|a";
const RE6 = "3.2.4.(A+.B)*";
const RE7 = "3.24A+B)*";
const RE8 = "3.24(A+B)*";

console.log("testing");
console.log(compareStr(RE1, "ab"));
console.log(compareStr(RE7, "a"));

*/

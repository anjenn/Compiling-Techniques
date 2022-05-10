import { infToPostfix } from "./postfix.js";
import { toNFA } from "./nfa.js";
import { search } from "./compare.js";

const inputF = document.getElementById("inputfile");
const outputF = document.getElementById("output");
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

const RE1 = "(A|b)*|a";

const inputToNFA = function (arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    console.log(
      `/////////////////\nTesting the Input No.${i}\n/////////////////`
    );
    let k = i * 2;
    //console.log(arr[0].length);
    arr[k] = arr[k].slice(4);

    console.log(arr[0].length); //9
    console.log(RE1.length); //8

    /*for (let j = 0; j < arr[0].length; j++) {
      console.log(arr[0][j]);
      console.log(RE1[j]);
    }*/

    // compare arr[0] and RE1 and see why they are different
    // arr[0] is 1 bit longer than RE1

    result[i] = compareStr(arr[k], arr[k + 1]);
    return result;
    //put input to NFA into the above code block
    //and present the result visually
    //also try to put the result into output file
  }
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

    /////
    console.log(lines[0].length);
    for (let j = 0; j < lines[0].length; j++) {
      console.log(lines[0][j]);
      //console.log(RE1[j]);
    }

    ////

    inputToNFA(lines);
  };
  reader.readAsText(file);
});

// Printing to output file

// test cases - must put this in a separate file, or make it readable from command line

// const RE1 = "(A|b)*|a";
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

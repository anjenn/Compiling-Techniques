import { infToPostfix } from "./postfix.js";
import { toNFA } from "./nfa.js";
import { search } from "./compare.js";

// test cases - must put this in a separate file, or make it readable from command line

const RE1 = "(A|b)*|a";
const RE2 = "324(A+B)*";
const RE3 = "a*|b";
const RE4 = "ba+(b|c)"; //this is suppposed to have concatenation symbols added

const RE5 = "(A|b)*|a";
const RE6 = "3.2.4.(A+.B)*";
const RE7 = "3.24(A+B)*";
const RE8 = "3.24(A+B)*";

//symbols treated: .; (; ); +; *; ?; |

// const res1 = addConcat(RE1);
// const res2 = addConcat(RE2);
// const res3 = addConcat(RE3);
// const res4 = addConcat(RE4);
// const res5 = addConcat(RE5);
// const res6 = addConcat(RE6);
// const res7 = addConcat(RE7);
// const res8 = addConcat(RE8);

// console.log(`${res1}, ${res2}, ${res3}, ${res4}`);
// console.log(`${res5}, ${res6}, ${res7}, ${res8}`);

/*
console.log(`${infToPostfix(RE1)}, 
${infToPostfix(RE2)}, 
${infToPostfix(RE3)}, 
${infToPostfix(RE4)}`);
*/

console.log("testing");

console.log("testing");

function compareStr(regEx, str) {
  const RE = infToPostfix(regEx);
  const convToNFA = toNFA(RE);
  return search(convToNFA, str);
}

console.log(compareStr(RE1, "ab("));

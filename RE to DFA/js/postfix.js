import { modifyStr } from "./error.js";

/////////////////////////////////////////////////
// conversion to Postfix
/////////////////////////////////////////////////

const opSet2 = new Set([")", "+", "*", "?", "|"]);
const opSet3 = new Set([".", "+", "*", "?", "|"]);

const addConcat = function (regEx) {
  regEx = modifyStr(regEx);
  if (regEx == "-1") return -1;

  let output = "";
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    output += curr;
    if (curr == "(" || curr == "|") {
      continue; //because (. or |. can't work
    }
    if (i < regEx.length - 1) {
      const next = regEx[i + 1];
      if (opSet2.has(next)) {
        continue;
      } else output += ".";
    }
  }
  console.log(`add concat function outcome: ${output}`);
  return output;
};

const peek = function (stack) {
  return stack.length && stack[stack.length - 1];
};

export function infToPostfix(regEx) {
  regEx = addConcat(regEx);
  if (regEx == "-1") return -1;

  let output = "";
  const opStack = [];
  const opPrecedence = {
    "|": 0,
    ".": 1,
    "+": 2,
    "*": 2,
    "?": 2,
  };
  for (const curr of regEx) {
    if (opSet3.has(curr)) {
      console.log(`checking current letter: ${curr}`);
      while (
        opStack.length &&
        peek(opStack) !== "(" &&
        opPrecedence[peek(opStack)] >= opPrecedence[curr]
      ) {
        output += opStack.pop();
      }
      opStack.push(curr);
    } else if (curr === "(" || curr === ")") {
      if (curr === "(") {
        opStack.push(curr);
      } else {
        while (peek(opStack) !== "(") {
          output += opStack.pop();
        }
        opStack.pop();
      }
    } else {
      output += curr;
    }
  }
  while (opStack.length) {
    output += opStack.pop();
  }
  //console.log(output);
  return output;
}

//operators accepted: .; (; ); +; *; ?; |

/*
const RE1 = ".abc";
const RE2 = "3{-d*";
const RE3 = "a*(b";
const RE4 = "a*|b";
const RE5 = "a**b";
const RE6 = "dvd+(";
const RE7 = "s??d";
const RE8 = ")dfs";

console.log("testing 1 \n");
modifyStr(RE1);
console.log("testing 2 \n");
modifyStr(RE2);
console.log("testing 3 \n");
modifyStr(RE3);
console.log("testing 4 \n");
modifyStr(RE4);
console.log("testing 5 \n");
modifyStr(RE5);
console.log("testing 6 \n");
modifyStr(RE6);
console.log("testing 7 \n");
modifyStr(RE7);
console.log("testing 8 \n");
modifyStr(RE8);
*/

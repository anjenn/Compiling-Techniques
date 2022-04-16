import { modifyStr } from "./errors.js";

//////////////////////////////////////
// conversion to Postfix
//////////////////////////////////////

const opSet2 = new Set([")", "+", "*", "?", "|"]);
const opSet3 = new Set([".", "+", "*", "?", "|"]);

const addConcat = function (regEx) {
  regEx = modifyStr(regEx);
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

import { checkOperators, checkIfValid } from "./errors.js";

//////////////////////////////////////
// conversion to Postfix
//////////////////////////////////////

export const addConcat = function (regEx) {
  regEx = checkOperators(regEx);
  let output = "";
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    output += curr;
    if (curr == "(" || curr == "|" || curr == ".") {
      // if we have concat already?
      continue; //because (. or |. can't work
    }
    if (i < regEx.length - 1) {
      const next = regEx[i + 1];
      if (
        //except for '.(' concatenation can't come before symbol
        next == "." || // if we have concat already?
        next === ")" ||
        next === "+" ||
        next === "*" ||
        next === "?" ||
        next === "|"
      ) {
        continue;
      } else output += ".";
    }
  }
  //console.log(output);
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
    "|": 1,
    ".": 2,
    "+": 3,
    "*": 3,
    "?": 3,
  };
  for (const curr of regEx) {
    if (
      curr === "|" ||
      curr === "." ||
      curr === "+" ||
      curr === "*" ||
      curr === "?"
    ) {
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

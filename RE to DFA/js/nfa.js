//////////////////////////////////////
// conversion to Postfix
//////////////////////////////////////

const operators = [".", "(", ")", "+", "*", "?", "|"];


if (i == 0 && curr!="(") {
  console.log("error");
}
if(regEx[i+1]){
  
}
const prev = regEx[i-1];
const next = regEx[i+1];
else if(curr === "(" && prev === ")") continue;
else

const checkInvalidSymbs = function(regEx){
  
}



const checkIfValid = function (regEx) {
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    if (/[A-Z]/.test(curr)) {
      regEx = regEx.toLowerCase();
      //console.log("Your regular expression was converted to lower cases");
      break;
      // should I just treat it as an error?
    }
    if (curr == "." && regEx[i + 1] == ".") {
      console.log("error");
      break;
    }
    if (
      curr === "." || // we may already have concatenation sym in the input
      curr === "(" ||
      curr === ")" ||
      curr === "+" ||
      curr === "*" ||
      curr === "?" ||
      curr === "|"
    ) {
      continue;
    } else if (!/[a-zA-Z]/.test(curr) && !/^[0-9]+$/.test(curr)) {
      console.log("Error");
    }
  }
  return regEx;
};

export const addConcat = function (regEx) {
  regEx = checkIfValid(regEx);
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

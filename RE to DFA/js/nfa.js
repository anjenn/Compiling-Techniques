//////////////////////////////////////
// conversion to Postfix
//////////////////////////////////////

const checkIfValid = function (regEx) {
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    if (/[a-zA-Z]/.test(curr)) {
      regEx = regEx.toLowerCase();
      console.log("Your regular expression was converted to lower cases");
      break;
      // should I just treat it as an error?
    }
    if (
      //except for '.(' concatenation can't come before symbol
      curr === "(" ||
      curr === ")" ||
      curr === "+" ||
      curr == "*" ||
      curr === "?" ||
      curr === "|"
    )
      continue;
    else if (!/[a-zA-Z]/.test(curr) && !/^[0-9]+$/.test(curr)) {
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
    if (curr == "(" || curr == "|") {
      continue; //because (. or |. can't work
    }
    if (i < regEx.length - 1) {
      const next = regEx[i + 1];
      if (
        //except for '.(' concatenation can't come before symbol
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
  console.log(output);
};

const opPrecedence = new Map([
  ["|", 1],
  [".", 2],
  ["+", 3],
  ["*", 3],
  ["?", 3],
]);

const peek = function (stack) {
  return stack.length && stack[stack.length - 1];
};

function toPostfix(exp) {
  let output = "";
  const operatorStack = [];

  for (const token of exp) {
    if (
      token === "." ||
      token === "|" ||
      token === "*" ||
      token === "?" ||
      token === "+"
    ) {
      while (
        operatorStack.length &&
        peek(operatorStack) !== "(" &&
        operatorPrecedence[peek(operatorStack)] >= operatorPrecedence[token]
      ) {
        output += operatorStack.pop();
      }

      operatorStack.push(token);
    } else if (token === "(" || token === ")") {
      if (token === "(") {
        operatorStack.push(token);
      } else {
        while (peek(operatorStack) !== "(") {
          output += operatorStack.pop();
        }
        operatorStack.pop();
      }
    } else {
      output += token;
    }
  }

  while (operatorStack.length) {
    output += operatorStack.pop();
  }

  return output;
}

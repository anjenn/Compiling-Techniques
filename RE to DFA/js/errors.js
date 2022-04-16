const opSet = new Set(["(", ")", "+", "*", "?", "|"]); // set of all operators
const opKlcl = new Set(["*", "+", "?"]); // kleene closures

export const checkOperators = function (regEx) {
  // this function makes sure that there is no invalid placement of operators
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    const next = regEx[i + 1];
    if (i == 0 && curr != "(" && opSet.has(curr)) {
      // if regEx starts with any operator other than '('
      console.log("error1: can't start a string with operator");
      console.log(`string: ${regEx}`);
      return -1;
    }
    if (curr == ".") {
      regEx = regEx.replace(".", "");
      console.log("error2: concatenation symbol removed");
      console.log(`string: ${regEx}`);
      // removes any already existing concatenation symbol for simplicity
      return -1;
    }
    if (opKlcl.has(curr) && opKlcl.has(next)) {
      console.log("error3: can't have consecutive kleene closure symbols");
      console.log(`string: ${regEx}`);
      // cannot have consecutive kleene closure symbols
      -1;
    }
    if (
      (curr === ")" && opSet.has(next)) ||
      ((opKlcl.has(curr) || curr === ")") && (next == "(" || next == "|"))
    ) {
      // if regEx has any operator after ')' -> accepted
      // if regEx has (")"or"*"or"+"or"?") and its next letter  ("("or"|" )
      console.log("No problem detected");
      console.log(`string: ${regEx}`);
      continue;
    }
  }
  return 1;
};

export const checkIfValid = function (regEx) {
  // this function checks if the input only has operators, numbers and alphabets.
  if (checkOperators(regEx) != 1) {
    return -1;
  }
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    if (/[A-Z]/.test(curr)) {
      regEx = regEx.toLowerCase();
      console.log("Your regular expression was converted to lower cases");
      break;
      // should I just treat it as an error?
    }
    if (opSet.has(curr)) continue;
    else if (!/[a-zA-Z]/.test(curr) && !/^[0-9]+$/.test(curr)) {
      console.log("error 0: Invalid symbol included");
      return -1;
    }
  }
  return regEx;
};

const RE1 = ".abc";
const RE2 = "3{-d*";
const RE3 = "a*(b";
const RE4 = "a*|b"; //this is suppposed to have concatenation symbols added

const RE5 = "a**b";
const RE6 = "dvd+(";
const RE7 = "s??d";
const RE8 = ")dfs";

//symbols treated: .; (; ); +; *; ?; |

const res1 = checkIfValid(RE1);
const res2 = checkIfValid(RE2);
const res3 = checkIfValid(RE3);
const res4 = checkIfValid(RE4);
const res5 = checkIfValid(RE5);
const res6 = checkIfValid(RE6);
const res7 = checkIfValid(RE7);
const res8 = checkIfValid(RE8);

console.log(`${res1}, ${res2}, ${res3}, ${res4}`);
console.log(`${res5}, ${res6}, ${res7}, ${res8}`);

const opSet = new Set(["(", ")", "+", "*", "?", "|"]); // set of all operators
const opKlcl = new Set(["*", "+", "?"]); // kleene closures

export const checkIfValid = function (regEx) {
  // this function makes sure that there is no invalid placement of operators
  if (regEx == "") {
    console.log("error 0: No input given");
    return -1;
  }
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    const next = regEx[i + 1];
    if (
      !/[a-zA-Z]/.test(curr) &&
      !/^[0-9]+$/.test(curr) &&
      !opSet.has(curr) &&
      curr != "."
    ) {
      // checks if expression has any invalid symbol ex. {, }
      console.log("error 1: Invalid symbol included");
      console.log(`string: ${regEx}`);
      return -1;
    }
    if (i == 0 && curr != "(" && opSet.has(curr)) {
      // if regEx starts with any operator other than '('
      console.log("error2: Can't start a string with operator");
      console.log(`string: ${regEx}`);
      return -1;
    }
    if (opKlcl.has(curr) && opKlcl.has(next)) {
      console.log("error3: Can't have consecutive kleene closure symbols");
      console.log(`string: ${regEx}`);
      // cannot have consecutive kleene closure symbols
      return -1;
    }
    if (
      (curr === ")" && opSet.has(next)) ||
      ((opKlcl.has(curr) || curr === ")") && (next == "(" || next == "|"))
    ) {
      // if regEx has any operator after ')' -> accepted
      // if regEx has (")"or"*"or"+"or"?") and its next letter  ("("or"|" )
      /*
      console.log("No problem detected");
      console.log(`string: ${regEx}`);
      */
      continue;
    }
  }
  return 1;
};

export const modifyStr = function (regEx) {
  // this function checks if the input only has operators, numbers and alphabets.
  if (checkIfValid(regEx) != 1) {
    console.log(`Error detected, cannot proceed. String: ${regEx}`);
    return -1;
  }
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    if (curr == ".") {
      regEx = regEx.replace(".", "");
      console.log(
        "Warning: Concatenation symbol(s) removed for further process"
      );
      // removes any already existing concatenation symbol for simplicity
    }
    if (/[A-Z]/.test(curr)) {
      regEx = regEx.toLowerCase();
      console.log(
        "Warning: Your regular expression was converted to lower cases"
      );
      break;
    }
  }
  //console.log(regEx);
  return regEx;
};

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

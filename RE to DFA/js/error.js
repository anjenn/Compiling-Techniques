/////////////////////////////////////////////////
// checking and modifying regular expression
/////////////////////////////////////////////////

const opSet = new Set(["(", ")", "+", "*", "?", "|"]); // set of all operators
const opKlcl = new Set(["*", "+", "?"]); // kleene closures

const checkIfValid = function (regEx) {
  // this function makes sure that there is no invalid placement of operators
  if (regEx == "") {
    throw new Error("error 0: No input given");
  }
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    const next = regEx[i + 1];
    let isBrktClosed = false;

    if (curr == "(") {
      for (let j = i; j < regEx.length - i; j++) {
        if (regEx[j] == ")") {
          isBrktClosed = true;
          break;
        }
      }
      if (isBrktClosed == false) {
        console.log(`string: ${regEx}`);
        throw new Error("error 1: Right parenthesis missing");
      }
    }
    if (curr == ")") {
      for (let k = i; k >= 0; k--) {
        console.log(``);
        if (regEx[k] == "(") {
          isBrktClosed = true;
          break;
        }
      }
      if (isBrktClosed == false) {
        console.log(`string: ${regEx}`);
        throw new Error("error 2: left parenthesis missing");
      }
    }
    if (
      !/[a-zA-Z]/.test(curr) &&
      !/^[0-9]+$/.test(curr) &&
      !opSet.has(curr) &&
      curr != "."
    ) {
      // checks if expression has any invalid symbol ex. {, }
      console.log(`string: ${regEx}`);
      throw new Error("error 3: Invalid symbol included");
    }
    if (i == 0 && curr != "(" && opSet.has(curr)) {
      // if regEx starts with any operator other than '('
      console.log(`string: ${regEx}`);
      throw new Error("error4: Can't start a string with operator");
    }
    if (opKlcl.has(curr) && opKlcl.has(next)) {
      console.log(`string: ${regEx}`);
      throw new Error("error5: Can't have consecutive kleene closure symbols");
      // cannot have consecutive kleene closure symbols
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
    // window.stop();
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

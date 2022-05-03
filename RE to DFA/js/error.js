/////////////////////////////////////////////////
// checking and modifying regular expression
/////////////////////////////////////////////////

const opSet = new Set(["(", ")", "+", "*", "?", "|"]); // set of all operators
const opKlcl = new Set(["*", "+", "?"]); // kleene closures

const printError = function (errNum, regEx) {
  let errMsg = "";
  switch (errNum) {
    case 0:
      errMsg = "No regular expression was provided";
      break;
    case 1:
      errMsg = "Right parenthesis is missing in your regular expression";
      break;
    case 2:
      errMsg = "Left parenthesis missing";
      break;
    case 3:
      //if expression has any invalid symbol ex. curly brackets
      errMsg = "Invalid symbol included";
      break;
    case 4:
      errMsg = "Can't start a string with an operator other than '('";
      break;
    case 5:
      errMsg = "Can't have consecutive kleene closure symbols";
  }
  throw new Error(
    errMsg + ` (${errNum})\n !! Your Regular Expression: ${regEx}`
  );
};

const checkIfValid = function (regEx) {
  // this function makes sure that there is no invalid placement of operators

  if (regEx == "") {
    printError(0, regEx);
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
        printError(1, regEx);
      }
    }
    if (curr == ")") {
      for (let k = i; k >= 0; k--) {
        // console.log(`i: ${i}, k: ${k}, current letter = ${regEx[k]}`);
        if (regEx[k] == "(") {
          isBrktClosed = true;
          break;
        }
      }
      if (isBrktClosed == false) {
        printError(2, regEx);
      }
    }
    if (
      !/[a-zA-Z]/.test(curr) &&
      !/^[0-9]+$/.test(curr) &&
      !opSet.has(curr) &&
      curr != "."
    ) {
      printError(3, regEx);
    }
    if (i == 0 && curr != "(" && opSet.has(curr)) {
      // if regEx starts with any operator other than '('
      printError(4, regEx);
    }
    if (opKlcl.has(curr) && opKlcl.has(next)) {
      printError(5, regEx);
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
};

export const modifyStr = function (regEx) {
  // this function checks if the input only has operators, numbers and alphabets.
  checkIfValid(regEx);

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

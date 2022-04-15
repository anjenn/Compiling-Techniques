const op1 = new Set([".", "(", ")", "+", "*", "?", "|"]);
const op2 = new Set([".", "(", ")", "|"]);
const op3 = new Set(["*", "+", "?"]);

export const checkConsecutives = function (regEx) {
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    const next = regEx[i + 1];
    if (i == 0 && curr != "(" && op1.has(curr)) {
      console.log("error1");
      return -1;
    }
    if (
      (curr === ")" && op1.has(next)) ||
      ((op3.has(curr) || curr === ")") && op2.has(next))
    ) {
      continue;
    } else if (op3.has(curr) && op3.has(next)) {
      console.log("error2");
      return -1;
    }
  }
  return 1;
  //idk what to do for .. and || case
};

export const checkIfValid = function (regEx) {
  if (checkConsecutives(regEx) != 1) {
    return -1;
  }
  for (let i = 0; i < regEx.length; i++) {
    const curr = regEx[i];
    if (/[A-Z]/.test(curr)) {
      regEx = regEx.toLowerCase();
      //console.log("Your regular expression was converted to lower cases");
      break;
      // should I just treat it as an error?
    }
    // if (
    //   curr === "." || // we may already have concatenation sym in the input
    //   curr === "(" ||
    //   curr === ")" ||
    //   curr === "+" ||
    //   curr === "*" ||
    //   curr === "?" ||
    //   curr === "|"
    // ) {
    //   continue;}
    if (op1.has(curr)) continue;
    else if (!/[a-zA-Z]/.test(curr) && !/^[0-9]+$/.test(curr)) {
      console.log("Error");
    }
  }
  return regEx;
};

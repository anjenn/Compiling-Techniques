import { addConcat } from "./nfa.js";

// test cases - must put this in a separate file, or make it readable from command line

const RE1 = "(A|b)*|a";
const RE2 = "324(A+B)*";
const RE3 = "a*|b";
const RE4 = "ba+(b|c)"; //this is suppposed to have concatenation symbols added

//symbols treated: .; (; ); +; *; ?; |

addConcat(RE4);
addConcat(RE2);

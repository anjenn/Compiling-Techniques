/*
Process a string through an NFA. For each input symbol it transitions into in multiple states at the same time.
The string is matched if after reading the last symbol, is has transitioned into at least one end state.
For an NFA with N states in can be at at most N states at a time. This algorighm finds a match by processing the input word once.
*/

import { addNextState } from "./nfa.js";

function search(nfa, word) {
  let currentStates = [];
  /* The initial set of current states is either the start state or
     the set of states reachable by epsilon transitions from the start state */
  addNextState(nfa.start, currentStates, []);

  for (const symbol of word) {
    const nextStates = [];

    for (const state of currentStates) {
      const nextState = state.transition[symbol];
      if (nextState) {
        addNextState(nextState, nextStates, []);
      }
    }

    currentStates = nextStates;
  }

  return currentStates.find((s) => s.isEnd) ? true : false;
}

export function recognize(nfa, word) {
  return search(nfa, word);
}

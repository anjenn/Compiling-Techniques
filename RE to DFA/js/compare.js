/////////////////////////////////////////////////
// search algorithm for NFA & input comparison
/////////////////////////////////////////////////

function addNextState(state, nextStates, visited) {
  if (state.epsTransitions.length) {
    for (const st of state.epsTransitions) {
      if (!visited.find((vs) => vs === st)) {
        visited.push(st);
        addNextState(st, nextStates, visited);
      }
    }
  } else {
    nextStates.push(state);
  }
}
/* By using this function, we are able to transition into all possible states
reachable from the current set of states, instead of one at a time
the current set of NFA will actually be a set of states
*/

export function search(nfa, str) {
  let currStates = [];
  addNextState(nfa.start, currStates, []);
  for (const symbol of str) {
    const nextStates = [];
    for (const state of currStates) {
      const nextState = state.transition[symbol];
      if (nextState) {
        addNextState(nextState, nextStates, []);
      }
    }
    currStates = nextStates;
  }
  return currStates.find((s) => s.isEnd) ? true : false;
}

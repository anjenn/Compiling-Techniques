import { infToPostfix } from "./postfix.js";

function createState(isEnd) {
  return {
    isEnd,
    transition: {},
    epsilonTransitions: [],
  };
}

function addEpsilonTransition(from, to) {
  from.epsilonTransitions.push(to);
}

/*
Thompson's NFA state can have only one transition to another state for a given symbol.
*/
function addTransition(from, to, symbol) {
  from.transition[symbol] = to;
}

/*
Construct an NFA that recognizes only the empty string.
*/
function fromEpsilon() {
  const start = createState(false);
  const end = createState(true);
  addEpsilonTransition(start, end);

  return { start, end };
}

/* 
 Construct an NFA that recognizes only a single character string.
*/
function fromSymbol(symbol) {
  const start = createState(false);
  const end = createState(true);
  addTransition(start, end, symbol);

  return { start, end };
}

/* 
 Concatenates two NFAs.
*/
function concat(first, second) {
  addEpsilonTransition(first.end, second.start);
  first.end.isEnd = false;

  return { start: first.start, end: second.end };
}

/* 
 Unions two NFAs.
*/
function union(first, second) {
  const start = createState(false);
  addEpsilonTransition(start, first.start);
  addEpsilonTransition(start, second.start);

  const end = createState(true);

  addEpsilonTransition(first.end, end);
  first.end.isEnd = false;
  addEpsilonTransition(second.end, end);
  second.end.isEnd = false;

  return { start, end };
}

/* 
 Apply Closure (Kleene's Star) on an NFA.
*/
function closure(nfa) {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, end);
  addEpsilonTransition(start, nfa.start);

  addEpsilonTransition(nfa.end, end);
  addEpsilonTransition(nfa.end, nfa.start);
  nfa.end.isEnd = false;

  return { start, end };
}

/*
  Zero-or-one of an NFA.
*/

function zeroOrOne(nfa) {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, end);
  addEpsilonTransition(start, nfa.start);

  addEpsilonTransition(nfa.end, end);
  nfa.end.isEnd = false;

  return { start, end };
}

/*
  One on more of an NFA.
*/

function oneOrMore(nfa) {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, nfa.start);
  addEpsilonTransition(nfa.end, end);
  addEpsilonTransition(nfa.end, nfa.start);
  nfa.end.isEnd = false;

  return { start, end };
}

/*
Converts a postfix regular expression into a Thompson NFA.
*/
export function toNFA(postfixExp) {
  if (postfixExp === "") {
    return fromEpsilon();
  }

  const stack = [];

  for (const token of postfixExp) {
    if (token === "*") {
      stack.push(closure(stack.pop()));
    } else if (token === "?") {
      stack.push(zeroOrOne(stack.pop()));
    } else if (token === "+") {
      stack.push(oneOrMore(stack.pop()));
    } else if (token === "|") {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(union(left, right));
    } else if (token === ".") {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(concat(left, right));
    } else {
      stack.push(fromSymbol(token));
    }
  }

  return stack.pop();
}

////////////////

//recursive backtracking and parse trees not used

/* 
   Follows through the epsilon transitions of a state until reaching
   a state with a symbol transition which gets added to the set of next states.
*/
export function addNextState(state, nextStates, visited) {
  if (state.epsilonTransitions.length) {
    for (const st of state.epsilonTransitions) {
      if (!visited.find((vs) => vs === st)) {
        visited.push(st);
        addNextState(st, nextStates, visited);
      }
    }
  } else {
    nextStates.push(state);
  }
}

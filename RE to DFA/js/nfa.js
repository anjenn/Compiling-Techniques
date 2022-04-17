import { infToPostfix } from "./postfix.js";

function createState(isEnd) {
  return {
    isEnd,
    transition: {}, // one state to at most one state
    epsilonTransitions: [], // one state to at most 2 states
  };
}

function addEpsilonTransition(from, to) {
  from.epsilonTransitions.push(to);
}

//can have only one transition to another state for a given symbol.
function addTransition(from, to, symbol) {
  from.transition[symbol] = to;
}

//NFA that recognizes a single character.
function fromSymbol(symbol) {
  const start = createState(false);
  const end = createState(true);
  addTransition(start, end, symbol);
  return { start, end };
}

//concatenates 2 NFAs (.)
function concat(first, second) {
  addEpsilonTransition(first.end, second.start); // because we don't add symbol in between
  first.end.isEnd = false;
  return { start: first.start, end: second.end };
}

//unions 2 NFAs (|)
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

//zero or more occurrence of NFA (*)
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

//zero or one occurrence of NFA (?)
function zeroOrOne(nfa) {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, end);
  addEpsilonTransition(start, nfa.start);

  addEpsilonTransition(nfa.end, end);
  nfa.end.isEnd = false;
  return { start, end };
}

//one or more occurrence of NFA (+)
function oneOrMore(nfa) {
  const start = createState(false);
  const end = createState(true);

  addEpsilonTransition(start, nfa.start);
  addEpsilonTransition(nfa.end, end);
  addEpsilonTransition(nfa.end, nfa.start);
  nfa.end.isEnd = false;
  return { start, end };
}

//postfix to NFA
export function toNFA(regEx) {
  const stack = [];
  for (const curr of regEx) {
    if (curr === "*") {
      stack.push(closure(stack.pop()));
    } else if (curr === "?") {
      stack.push(zeroOrOne(stack.pop()));
    } else if (curr === "+") {
      stack.push(oneOrMore(stack.pop()));
    } else if (curr === "|") {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(union(left, right));
    } else if (curr === ".") {
      const right = stack.pop();
      const left = stack.pop();
      stack.push(concat(left, right));
    } else {
      stack.push(fromSymbol(curr));
    }
  }
  return stack.pop();
}

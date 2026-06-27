import type { LockDefinition } from '../types';

export const conditionalsLocks: LockDefinition[] = [
  {
    id: 'lock-1',
    order: 1,
    title: 'Predict Output',
    lockType: 'predict-output',
    bank: [
      {
        id: 'predict-output-1',
        lockType: 'predict-output',
        title: 'Predict Output',
        category: 'Basic if / else',
        prompt: 'What is printed by this code?',
        code: `int score = 84;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("Keep practicing");
}`,
        choices: [
          { id: 'a', label: 'A', isCorrect: false },
          { id: 'b', label: 'B', isCorrect: true },
          { id: 'c', label: 'Keep practicing', isCorrect: false },
          { id: 'd', label: 'Nothing is printed', isCorrect: false },
        ],
        explanation: 'The score is at least 80 but less than 90, so the else-if branch prints B.',
        hints: ['Check the first condition before moving to the else-if.', 'Only one branch in an if / else-if / else chain executes.'],
      },
    ],
  },
  {
    id: 'lock-2',
    order: 2,
    title: 'Which Branch Executes',
    lockType: 'branch-executes',
    bank: [
      {
        id: 'branch-executes-1',
        lockType: 'branch-executes',
        title: 'Which Branch Executes',
        category: 'Branch tracing',
        prompt: 'Which branch executes when this code runs?',
        code: `int temp = 72;

if (temp > 80) {
    System.out.println("hot");
} else if (temp >= 70) {
    System.out.println("warm");
} else {
    System.out.println("cool");
}`,
        choices: [
          { id: 'a', label: 'if branch', isCorrect: false },
          { id: 'b', label: 'else-if branch', isCorrect: true },
          { id: 'c', label: 'else branch', isCorrect: false },
          { id: 'd', label: 'Both if and else-if branches', isCorrect: false },
        ],
        explanation: '72 is not greater than 80, but it is greater than or equal to 70.',
        hints: ['Evaluate the conditions from top to bottom.', 'Stop as soon as one condition is true.'],
      },
    ],
  },
  {
    id: 'lock-3',
    order: 3,
    title: 'Choose Comparison Operator',
    lockType: 'comparison-operator',
    bank: [
      {
        id: 'comparison-operator-1',
        lockType: 'comparison-operator',
        title: 'Choose Comparison Operator',
        category: 'Relational operators',
        prompt: 'Which operator correctly checks whether a player has enough coins?',
        code: `int coins = 12;
int cost = 10;

if (coins ___ cost) {
    System.out.println("Buy item");
}`,
        choices: [
          { id: 'a', label: '>', isCorrect: false },
          { id: 'b', label: '>=', isCorrect: true },
          { id: 'c', label: '<=', isCorrect: false },
          { id: 'd', label: '==', isCorrect: false },
        ],
        explanation: 'Enough coins means the player can have exactly the cost or more, so >= is the best operator.',
        hints: ['Think about whether exactly 10 coins should work.', 'Enough means equal to the cost is allowed.'],
      },
    ],
  },
  {
    id: 'lock-4',
    order: 4,
    title: 'Compound Boolean Expressions',
    lockType: 'compound-boolean',
    bank: [
      {
        id: 'compound-boolean-1',
        lockType: 'compound-boolean',
        title: 'Compound Boolean Expressions',
        category: 'Boolean logic',
        prompt: 'What is the value of the expression?',
        code: `int age = 16;
boolean hasPermit = true;

age >= 16 && hasPermit`,
        choices: [
          { id: 'a', label: 'true', isCorrect: true },
          { id: 'b', label: 'false', isCorrect: false },
          { id: 'c', label: 'The code does not compile', isCorrect: false },
          { id: 'd', label: 'It depends on the previous if statement', isCorrect: false },
        ],
        explanation: 'Both parts of the && expression are true, so the full expression is true.',
        hints: ['With &&, both sides must be true.', 'Evaluate each side separately.'],
      },
    ],
  },
  {
    id: 'lock-5',
    order: 5,
    title: 'Short-Circuit Evaluation',
    lockType: 'short-circuit',
    bank: [
      {
        id: 'short-circuit-1',
        lockType: 'short-circuit',
        title: 'Short-Circuit Evaluation',
        category: 'Short-circuit logic',
        prompt: 'Will the method call run?',
        code: `int total = 0;

if (total != 0 && 100 / total > 5) {
    System.out.println("large");
}`,
        choices: [
          { id: 'a', label: 'Yes, because both sides of && always run', isCorrect: false },
          { id: 'b', label: 'No, because the left side is false', isCorrect: true },
          { id: 'c', label: 'Yes, and it prints large', isCorrect: false },
          { id: 'd', label: 'No, because && checks the right side first', isCorrect: false },
        ],
        explanation: 'For &&, Java skips the right side when the left side is false.',
        hints: ['For &&, one false value is enough to make the result false.', 'Java evaluates left to right.'],
      },
    ],
  },
  {
    id: 'lock-6',
    order: 6,
    title: 'Arrange if / else-if / else',
    lockType: 'arrange-branches',
    bank: [
      {
        id: 'arrange-branches-1',
        lockType: 'arrange-branches',
        title: 'Arrange if / else-if / else',
        category: 'Code ordering',
        prompt: 'Which order creates a valid if / else-if / else chain?',
        code: `A. else { ... }
B. if (level > 10) { ... }
C. else if (level > 5) { ... }`,
        choices: [
          { id: 'a', label: 'B, C, A', isCorrect: true },
          { id: 'b', label: 'A, B, C', isCorrect: false },
          { id: 'c', label: 'C, B, A', isCorrect: false },
          { id: 'd', label: 'B, A, C', isCorrect: false },
        ],
        explanation: 'An if starts the chain, zero or more else-if blocks may follow, and else comes last.',
        hints: ['An else cannot start a chain.', 'The else block must be last.'],
      },
    ],
  },
  {
    id: 'lock-7',
    order: 7,
    title: 'Nested If Trace',
    lockType: 'nested-if',
    bank: [
      {
        id: 'nested-if-1',
        lockType: 'nested-if',
        title: 'Nested If Trace',
        category: 'Nested conditionals',
        prompt: 'What is printed by the nested conditional?',
        code: `int x = 8;
int y = 3;

if (x > 5) {
    if (y > 5) {
        System.out.println("alpha");
    } else {
        System.out.println("beta");
    }
} else {
    System.out.println("gamma");
}`,
        choices: [
          { id: 'a', label: 'alpha', isCorrect: false },
          { id: 'b', label: 'beta', isCorrect: true },
          { id: 'c', label: 'gamma', isCorrect: false },
          { id: 'd', label: 'Nothing is printed', isCorrect: false },
        ],
        explanation: 'The outer condition is true, then the inner condition is false, so beta is printed.',
        hints: ['Trace the outer if first.', 'Only enter the inner if because x > 5 is true.'],
      },
    ],
  },
  {
    id: 'lock-8',
    order: 8,
    title: "DeMorgan's Law",
    lockType: 'demorgan',
    bank: [
      {
        id: 'demorgan-1',
        lockType: 'demorgan',
        title: "DeMorgan's Law",
        category: 'Equivalent expressions',
        prompt: 'Which expression is equivalent?',
        code: `!(x > 10 && y < 5)`,
        choices: [
          { id: 'a', label: 'x <= 10 || y >= 5', isCorrect: true },
          { id: 'b', label: 'x <= 10 && y >= 5', isCorrect: false },
          { id: 'c', label: 'x > 10 || y < 5', isCorrect: false },
          { id: 'd', label: 'x < 10 || y > 5', isCorrect: false },
        ],
        explanation: 'Negating an && expression changes it to || and negates both comparisons.',
        hints: ['DeMorgan changes && to ||.', 'Negate each comparison carefully.'],
      },
    ],
  },
  {
    id: 'lock-9',
    order: 9,
    title: 'Find the Bug',
    lockType: 'find-bug',
    bank: [
      {
        id: 'find-bug-1',
        lockType: 'find-bug',
        title: 'Find the Bug',
        category: 'Debugging conditionals',
        prompt: 'Which fix makes the code compare the values correctly?',
        code: `int guess = 7;
int answer = 7;

if (guess = answer) {
    System.out.println("correct");
}`,
        choices: [
          { id: 'a', label: 'Change = to ==', isCorrect: true },
          { id: 'b', label: 'Change = to !=', isCorrect: false },
          { id: 'c', label: 'Remove the parentheses', isCorrect: false },
          { id: 'd', label: 'Change int to double', isCorrect: false },
        ],
        explanation: 'A comparison uses ==. A single = is assignment and does not create a boolean expression for ints.',
        hints: ['Look at the operator inside the condition.', 'AP CSA uses == to compare primitive values.'],
      },
    ],
  },
  {
    id: 'lock-10',
    order: 10,
    title: 'Final Boss',
    lockType: 'final-boss',
    bank: [
      {
        id: 'final-boss-1',
        lockType: 'final-boss',
        title: 'Final Boss',
        category: 'Mixed conditional trace',
        prompt: 'What is the final value of result?',
        code: `int a = 6;
int b = 4;
String result = "";

if (a > b && b % 2 == 0) {
    result = "unlock";
} else if (a == b || b > 10) {
    result = "retry";
} else {
    result = "reset";
}`,
        choices: [
          { id: 'a', label: 'unlock', isCorrect: true },
          { id: 'b', label: 'retry', isCorrect: false },
          { id: 'c', label: 'reset', isCorrect: false },
          { id: 'd', label: 'empty string', isCorrect: false },
        ],
        explanation: 'a > b is true and b is even, so the first branch sets result to unlock.',
        hints: ['The first branch uses &&.', 'Check whether b % 2 equals 0.'],
      },
    ],
  },
];

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
      {
        id: 'predict-output-2',
        lockType: 'predict-output',
        title: 'Predict Output',
        category: 'Basic if / else',
        prompt: 'What is printed by this code?',
        code: `int lives = 0;

if (lives > 0) {
    System.out.println("Keep playing");
} else {
    System.out.println("Game over");
}`,
        choices: [
          { id: 'a', label: 'Keep playing', isCorrect: false },
          { id: 'b', label: 'Game over', isCorrect: true },
          { id: 'c', label: '0', isCorrect: false },
          { id: 'd', label: 'Nothing is printed', isCorrect: false },
        ],
        explanation: 'The condition lives > 0 is false, so the else branch prints Game over.',
        hints: ['Substitute 0 for lives.', 'When an if condition is false, Java checks the else branch.'],
      },
      {
        id: 'predict-output-3',
        lockType: 'predict-output',
        title: 'Predict Output',
        category: 'Basic if / else',
        prompt: 'What is printed by this code?',
        code: `int battery = 95;

if (battery >= 90) {
    System.out.println("Full power");
} else if (battery >= 30) {
    System.out.println("Keep going");
} else {
    System.out.println("Recharge");
}`,
        choices: [
          { id: 'a', label: 'Full power', isCorrect: true },
          { id: 'b', label: 'Keep going', isCorrect: false },
          { id: 'c', label: 'Recharge', isCorrect: false },
          { id: 'd', label: '95', isCorrect: false },
        ],
        explanation: 'battery >= 90 is true, so the first branch prints Full power.',
        hints: ['Check the first condition before any else-if.', 'A true if branch skips the rest of the chain.'],
      },
      {
        id: 'predict-output-4',
        lockType: 'predict-output',
        title: 'Predict Output',
        category: 'Basic if / else',
        prompt: 'What is printed by this code?',
        code: `int tickets = 2;

if (tickets >= 5) {
    System.out.println("Prize");
} else if (tickets >= 3) {
    System.out.println("Sticker");
} else {
    System.out.println("Try again");
}`,
        choices: [
          { id: 'a', label: 'Prize', isCorrect: false },
          { id: 'b', label: 'Sticker', isCorrect: false },
          { id: 'c', label: 'Try again', isCorrect: true },
          { id: 'd', label: 'Nothing is printed', isCorrect: false },
        ],
        explanation: '2 is less than both cutoffs, so the else branch prints Try again.',
        hints: ['Evaluate the comparisons using tickets = 2.', 'The else branch runs if no earlier condition is true.'],
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
      {
        id: 'branch-executes-2',
        lockType: 'branch-executes',
        title: 'Which Branch Executes',
        category: 'Branch tracing',
        prompt: 'Which branch executes when this code runs?',
        code: `int points = 50;

if (points >= 100) {
    System.out.println("gold");
} else if (points >= 50) {
    System.out.println("silver");
} else {
    System.out.println("bronze");
}`,
        choices: [
          { id: 'a', label: 'if branch', isCorrect: false },
          { id: 'b', label: 'else-if branch', isCorrect: true },
          { id: 'c', label: 'else branch', isCorrect: false },
          { id: 'd', label: 'No branch executes', isCorrect: false },
        ],
        explanation: '50 is not at least 100, but it is at least 50, so the else-if branch executes.',
        hints: ['The first true branch wins.', '>= includes the exact value on the right side.'],
      },
      {
        id: 'branch-executes-3',
        lockType: 'branch-executes',
        title: 'Which Branch Executes',
        category: 'Branch tracing',
        prompt: 'Which branch executes when this code runs?',
        code: `int level = 12;

if (level > 10) {
    System.out.println("expert");
} else if (level > 5) {
    System.out.println("intermediate");
} else {
    System.out.println("beginner");
}`,
        choices: [
          { id: 'a', label: 'if branch', isCorrect: true },
          { id: 'b', label: 'else-if branch', isCorrect: false },
          { id: 'c', label: 'else branch', isCorrect: false },
          { id: 'd', label: 'Both if and else-if branches', isCorrect: false },
        ],
        explanation: 'level > 10 is true, so the first if branch executes and the rest is skipped.',
        hints: ['The first condition is checked first.', 'A chain stops after the first true condition.'],
      },
      {
        id: 'branch-executes-4',
        lockType: 'branch-executes',
        title: 'Which Branch Executes',
        category: 'Branch tracing',
        prompt: 'Which branch executes when this code runs?',
        code: `int minutesLate = 18;

if (minutesLate < 5) {
    System.out.println("on time");
} else if (minutesLate < 15) {
    System.out.println("warning");
} else {
    System.out.println("detention");
}`,
        choices: [
          { id: 'a', label: 'if branch', isCorrect: false },
          { id: 'b', label: 'else-if branch', isCorrect: false },
          { id: 'c', label: 'else branch', isCorrect: true },
          { id: 'd', label: 'No branch executes', isCorrect: false },
        ],
        explanation: '18 is not less than 5 or 15, so the else branch executes.',
        hints: ['Check both comparisons with minutesLate = 18.', 'The else handles all remaining cases.'],
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
      {
        id: 'comparison-operator-2',
        lockType: 'comparison-operator',
        title: 'Choose Comparison Operator',
        category: 'Relational operators',
        prompt: 'Which operator correctly checks whether the guess is not the secret number?',
        code: `int guess = 4;
int secret = 9;

if (guess ___ secret) {
    System.out.println("Try again");
}`,
        choices: [
          { id: 'a', label: '!=', isCorrect: true },
          { id: 'b', label: '==', isCorrect: false },
          { id: 'c', label: '>=', isCorrect: false },
          { id: 'd', label: '<=', isCorrect: false },
        ],
        explanation: 'The != operator checks whether two primitive values are not equal.',
        hints: ['The prompt says not the secret number.', '!= means not equal.'],
      },
      {
        id: 'comparison-operator-3',
        lockType: 'comparison-operator',
        title: 'Choose Comparison Operator',
        category: 'Relational operators',
        prompt: 'Which operator correctly checks whether the temperature is below freezing?',
        code: `int temperature = 28;

if (temperature ___ 32) {
    System.out.println("Freeze warning");
}`,
        choices: [
          { id: 'a', label: '<', isCorrect: true },
          { id: 'b', label: '>', isCorrect: false },
          { id: 'c', label: '==', isCorrect: false },
          { id: 'd', label: '>=', isCorrect: false },
        ],
        explanation: 'Below freezing means the temperature is less than 32.',
        hints: ['Below means less than.', 'Do not include exactly 32 if the prompt says below.'],
      },
      {
        id: 'comparison-operator-4',
        lockType: 'comparison-operator',
        title: 'Choose Comparison Operator',
        category: 'Relational operators',
        prompt: 'Which operator correctly checks whether the score is exactly perfect?',
        code: `int score = 100;

if (score ___ 100) {
    System.out.println("Perfect");
}`,
        choices: [
          { id: 'a', label: '>=', isCorrect: false },
          { id: 'b', label: '<=', isCorrect: false },
          { id: 'c', label: '==', isCorrect: true },
          { id: 'd', label: '!=', isCorrect: false },
        ],
        explanation: 'Exactly perfect means score must equal 100, so == is the correct operator.',
        hints: ['Exactly means equal to.', 'A single = is assignment, not comparison.'],
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
        code: `int age = 15;
boolean hasPermit = true;

age >= 16 && hasPermit`,
        choices: [
          { id: 'a', label: 'true', isCorrect: false },
          { id: 'b', label: 'false', isCorrect: true },
          { id: 'c', label: 'The code does not compile', isCorrect: false },
          { id: 'd', label: 'It depends on the previous if statement', isCorrect: false },
        ],
        explanation: 'age >= 16 is false when age is 15, so the full && expression is false.',
        hints: ['With &&, both sides must be true.', 'Evaluate age >= 16 before checking the whole expression.'],
      },
      {
        id: 'compound-boolean-2',
        lockType: 'compound-boolean',
        title: 'Compound Boolean Expressions',
        category: 'Boolean logic',
        prompt: 'What is the value of the expression?',
        code: `int hour = 21;
boolean isWeekend = false;

hour < 8 || hour > 20 || isWeekend`,
        choices: [
          { id: 'a', label: 'true', isCorrect: true },
          { id: 'b', label: 'false', isCorrect: false },
          { id: 'c', label: 'The code does not compile', isCorrect: false },
          { id: 'd', label: 'Only true on Saturday', isCorrect: false },
        ],
        explanation: 'hour > 20 is true, so the full || expression is true.',
        hints: ['With ||, one true part is enough.', 'Evaluate hour > 20 carefully.'],
      },
      {
        id: 'compound-boolean-3',
        lockType: 'compound-boolean',
        title: 'Compound Boolean Expressions',
        category: 'Boolean logic',
        prompt: 'What is the value of the expression?',
        code: `int score = 72;
boolean extraCredit = false;

score >= 70 && !extraCredit`,
        choices: [
          { id: 'a', label: 'true', isCorrect: true },
          { id: 'b', label: 'false', isCorrect: false },
          { id: 'c', label: '72', isCorrect: false },
          { id: 'd', label: 'The code does not compile', isCorrect: false },
        ],
        explanation: 'score >= 70 is true and !extraCredit is also true, so the whole && expression is true.',
        hints: ['The ! operator flips a boolean value.', 'Both sides of && must be true.'],
      },
      {
        id: 'compound-boolean-4',
        lockType: 'compound-boolean',
        title: 'Compound Boolean Expressions',
        category: 'Boolean logic',
        prompt: 'What is the value of the expression?',
        code: `int x = 4;
int y = 9;

x > 5 || y < 3`,
        choices: [
          { id: 'a', label: 'true', isCorrect: false },
          { id: 'b', label: 'false', isCorrect: true },
          { id: 'c', label: '13', isCorrect: false },
          { id: 'd', label: 'The code does not compile', isCorrect: false },
        ],
        explanation: 'x > 5 is false and y < 3 is false, so the || expression is false.',
        hints: ['With ||, at least one side must be true.', 'Evaluate both comparisons separately.'],
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
      {
        id: 'short-circuit-2',
        lockType: 'short-circuit',
        title: 'Short-Circuit Evaluation',
        category: 'Short-circuit logic',
        prompt: 'Will the second comparison be evaluated?',
        code: `int count = 12;

if (count > 10 || count / 0 == 3) {
    System.out.println("safe");
}`,
        choices: [
          { id: 'a', label: 'Yes, because || always checks both sides', isCorrect: false },
          { id: 'b', label: 'No, because the left side is true', isCorrect: true },
          { id: 'c', label: 'Yes, and it causes division by zero', isCorrect: false },
          { id: 'd', label: 'No, because Java evaluates right to left', isCorrect: false },
        ],
        explanation: 'For ||, Java skips the right side when the left side is already true.',
        hints: ['With ||, one true value is enough.', 'Java evaluates the left side first.'],
      },
      {
        id: 'short-circuit-3',
        lockType: 'short-circuit',
        title: 'Short-Circuit Evaluation',
        category: 'Short-circuit logic',
        prompt: 'Will the right side of the && expression be evaluated?',
        code: `int number = 8;

if (number > 0 && number % 2 == 0) {
    System.out.println("positive even");
}`,
        choices: [
          { id: 'a', label: 'Yes, because the left side is true', isCorrect: true },
          { id: 'b', label: 'No, because && always skips the right side', isCorrect: false },
          { id: 'c', label: 'No, because number is even', isCorrect: false },
          { id: 'd', label: 'Yes, because Java evaluates right to left', isCorrect: false },
        ],
        explanation: 'For &&, Java evaluates the right side only if the left side is true.',
        hints: ['Check number > 0 first.', 'A true left side is not enough to decide an && expression.'],
      },
      {
        id: 'short-circuit-4',
        lockType: 'short-circuit',
        title: 'Short-Circuit Evaluation',
        category: 'Short-circuit logic',
        prompt: 'Will the right side of the || expression be evaluated?',
        code: `int tries = 1;

if (tries > 3 || tries == 1) {
    System.out.println("check");
}`,
        choices: [
          { id: 'a', label: 'Yes, because the left side is false', isCorrect: true },
          { id: 'b', label: 'No, because || always skips the right side', isCorrect: false },
          { id: 'c', label: 'No, because tries is 1', isCorrect: false },
          { id: 'd', label: 'Yes, because both sides of || must be true', isCorrect: false },
        ],
        explanation: 'The left side of || is false, so Java must evaluate the right side to know the final result.',
        hints: ['With ||, Java can stop only after finding true.', 'tries > 3 is false.'],
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
      {
        id: 'arrange-branches-2',
        lockType: 'arrange-branches',
        title: 'Arrange if / else-if / else',
        category: 'Code ordering',
        prompt: 'Which order creates a valid chain for assigning a letter grade?',
        code: `A. else if (grade >= 80) { letter = "B"; }
B. else { letter = "C"; }
C. if (grade >= 90) { letter = "A"; }`,
        choices: [
          { id: 'a', label: 'C, A, B', isCorrect: true },
          { id: 'b', label: 'A, C, B', isCorrect: false },
          { id: 'c', label: 'B, A, C', isCorrect: false },
          { id: 'd', label: 'C, B, A', isCorrect: false },
        ],
        explanation: 'The if block must come first, else-if blocks follow, and the else block comes last.',
        hints: ['Find the line that starts with if.', 'The plain else must be last.'],
      },
      {
        id: 'arrange-branches-3',
        lockType: 'arrange-branches',
        title: 'Arrange if / else-if / else',
        category: 'Code ordering',
        prompt: 'Which order creates a valid chain for choosing a shipping price?',
        code: `A. else if (weight < 10) { cost = 8; }
B. if (weight < 2) { cost = 3; }
C. else { cost = 15; }`,
        choices: [
          { id: 'a', label: 'B, A, C', isCorrect: true },
          { id: 'b', label: 'A, B, C', isCorrect: false },
          { id: 'c', label: 'C, B, A', isCorrect: false },
          { id: 'd', label: 'B, C, A', isCorrect: false },
        ],
        explanation: 'A valid chain starts with if, continues with else-if, and ends with else.',
        hints: ['Find the only line that starts with if.', 'The catch-all else belongs at the end.'],
      },
      {
        id: 'arrange-branches-4',
        lockType: 'arrange-branches',
        title: 'Arrange if / else-if / else',
        category: 'Code ordering',
        prompt: 'Which order creates a valid chain for assigning a message?',
        code: `A. if (health <= 0) { message = "done"; }
B. else { message = "safe"; }
C. else if (health < 20) { message = "danger"; }`,
        choices: [
          { id: 'a', label: 'A, C, B', isCorrect: true },
          { id: 'b', label: 'C, A, B', isCorrect: false },
          { id: 'c', label: 'B, A, C', isCorrect: false },
          { id: 'd', label: 'A, B, C', isCorrect: false },
        ],
        explanation: 'The if starts the chain, the else-if checks an additional condition, and the else comes last.',
        hints: ['An else-if cannot appear before an if.', 'A plain else cannot come before an else-if.'],
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
      {
        id: 'nested-if-2',
        lockType: 'nested-if',
        title: 'Nested If Trace',
        category: 'Nested conditionals',
        prompt: 'What is printed by the nested conditional?',
        code: `int speed = 45;
boolean schoolZone = true;

if (schoolZone) {
    if (speed > 25) {
        System.out.println("slow down");
    } else {
        System.out.println("ok");
    }
} else {
    System.out.println("normal road");
}`,
        choices: [
          { id: 'a', label: 'slow down', isCorrect: true },
          { id: 'b', label: 'ok', isCorrect: false },
          { id: 'c', label: 'normal road', isCorrect: false },
          { id: 'd', label: 'schoolZone', isCorrect: false },
        ],
        explanation: 'schoolZone is true, so the inner if is checked. Since 45 > 25, slow down is printed.',
        hints: ['The outer condition is a boolean variable.', 'After entering the outer if, compare speed to 25.'],
      },
      {
        id: 'nested-if-3',
        lockType: 'nested-if',
        title: 'Nested If Trace',
        category: 'Nested conditionals',
        prompt: 'What is printed by the nested conditional?',
        code: `int coins = 1;
boolean bonus = true;

if (coins >= 5) {
    if (bonus) {
        System.out.println("double prize");
    } else {
        System.out.println("single prize");
    }
} else {
    System.out.println("no prize");
}`,
        choices: [
          { id: 'a', label: 'double prize', isCorrect: false },
          { id: 'b', label: 'single prize', isCorrect: false },
          { id: 'c', label: 'no prize', isCorrect: true },
          { id: 'd', label: 'bonus', isCorrect: false },
        ],
        explanation: 'coins >= 5 is false, so Java skips the nested if and prints no prize.',
        hints: ['Start with the outer condition.', 'The inner condition is checked only if coins >= 5 is true.'],
      },
      {
        id: 'nested-if-4',
        lockType: 'nested-if',
        title: 'Nested If Trace',
        category: 'Nested conditionals',
        prompt: 'What is printed by the nested conditional?',
        code: `int rows = 3;
int cols = 3;

if (rows == cols) {
    if (rows > 5) {
        System.out.println("large square");
    } else {
        System.out.println("small square");
    }
} else {
    System.out.println("rectangle");
}`,
        choices: [
          { id: 'a', label: 'large square', isCorrect: false },
          { id: 'b', label: 'small square', isCorrect: true },
          { id: 'c', label: 'rectangle', isCorrect: false },
          { id: 'd', label: '3', isCorrect: false },
        ],
        explanation: 'rows == cols is true, then rows > 5 is false, so small square is printed.',
        hints: ['First decide whether rows equals cols.', 'Then check the nested condition.'],
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
      {
        id: 'demorgan-2',
        lockType: 'demorgan',
        title: "DeMorgan's Law",
        category: 'Equivalent expressions',
        prompt: 'Which expression is equivalent?',
        code: `!(isRaining || temperature < 32)`,
        choices: [
          { id: 'a', label: '!isRaining && temperature >= 32', isCorrect: true },
          { id: 'b', label: '!isRaining || temperature >= 32', isCorrect: false },
          { id: 'c', label: 'isRaining && temperature < 32', isCorrect: false },
          { id: 'd', label: '!isRaining && temperature < 32', isCorrect: false },
        ],
        explanation: 'Negating an || expression changes it to && and negates both parts.',
        hints: ['DeMorgan changes || to &&.', 'The opposite of temperature < 32 is temperature >= 32.'],
      },
      {
        id: 'demorgan-3',
        lockType: 'demorgan',
        title: "DeMorgan's Law",
        category: 'Equivalent expressions',
        prompt: 'Which expression is equivalent?',
        code: `!(score >= 60 && submitted)`,
        choices: [
          { id: 'a', label: 'score < 60 || !submitted', isCorrect: true },
          { id: 'b', label: 'score < 60 && !submitted', isCorrect: false },
          { id: 'c', label: 'score >= 60 || submitted', isCorrect: false },
          { id: 'd', label: 'score <= 60 || !submitted', isCorrect: false },
        ],
        explanation: 'Negating && changes it to ||, score >= 60 becomes score < 60, and submitted becomes !submitted.',
        hints: ['Flip && to ||.', 'The opposite of >= is <.'],
      },
      {
        id: 'demorgan-4',
        lockType: 'demorgan',
        title: "DeMorgan's Law",
        category: 'Equivalent expressions',
        prompt: 'Which expression is equivalent?',
        code: `!(hasTicket || age >= 18)`,
        choices: [
          { id: 'a', label: '!hasTicket && age < 18', isCorrect: true },
          { id: 'b', label: '!hasTicket || age < 18', isCorrect: false },
          { id: 'c', label: 'hasTicket && age >= 18', isCorrect: false },
          { id: 'd', label: '!hasTicket && age <= 18', isCorrect: false },
        ],
        explanation: 'Negating || changes it to &&, hasTicket becomes !hasTicket, and age >= 18 becomes age < 18.',
        hints: ['Flip || to &&.', 'The opposite of >= is <.'],
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
      {
        id: 'find-bug-2',
        lockType: 'find-bug',
        title: 'Find the Bug',
        category: 'Debugging conditionals',
        prompt: 'Which fix correctly compares the String value?',
        code: `String mode = "easy";

if (mode == "easy") {
    System.out.println("start");
}`,
        choices: [
          { id: 'a', label: 'Use mode.equals("easy")', isCorrect: true },
          { id: 'b', label: 'Use mode = "easy"', isCorrect: false },
          { id: 'c', label: 'Use mode != "easy"', isCorrect: false },
          { id: 'd', label: 'Remove the quotes around easy', isCorrect: false },
        ],
        explanation: 'In AP CSA, String values should be compared with .equals rather than ==.',
        hints: ['String comparison is different from int comparison.', 'Use a method call to compare String contents.'],
      },
      {
        id: 'find-bug-3',
        lockType: 'find-bug',
        title: 'Find the Bug',
        category: 'Debugging conditionals',
        prompt: 'Which fix makes the condition test the intended range?',
        code: `int percent = 87;

if (80 <= percent <= 89) {
    System.out.println("B");
}`,
        choices: [
          { id: 'a', label: 'Use percent >= 80 && percent <= 89', isCorrect: true },
          { id: 'b', label: 'Use percent >= 80 || percent <= 89', isCorrect: false },
          { id: 'c', label: 'Use 80 >= percent && 89 <= percent', isCorrect: false },
          { id: 'd', label: 'Use percent == 80 && percent == 89', isCorrect: false },
        ],
        explanation: 'Java does not support chained comparisons; use two comparisons joined by &&.',
        hints: ['Break the range into two comparisons.', 'For a range, both boundaries must be true.'],
      },
      {
        id: 'find-bug-4',
        lockType: 'find-bug',
        title: 'Find the Bug',
        category: 'Debugging conditionals',
        prompt: 'Which fix makes the else match the intended condition?',
        code: `boolean loggedIn = true;
boolean isAdmin = false;

if (loggedIn)
    if (isAdmin)
        System.out.println("admin");
else
    System.out.println("guest");`,
        choices: [
          { id: 'a', label: 'Add braces around the outer if body', isCorrect: true },
          { id: 'b', label: 'Change loggedIn to false', isCorrect: false },
          { id: 'c', label: 'Replace else with else if', isCorrect: false },
          { id: 'd', label: 'Change isAdmin to an int', isCorrect: false },
        ],
        explanation: 'Without braces, the else pairs with the nearest unmatched if, which is if (isAdmin).',
        hints: ['Java matches else with the nearest unmatched if.', 'Braces make nested intent clear.'],
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
      {
        id: 'final-boss-2',
        lockType: 'final-boss',
        title: 'Final Boss',
        category: 'Mixed conditional trace',
        prompt: 'What is the final value of result?',
        code: `int energy = 4;
boolean hasKey = true;
String result = "";

if (energy > 5 && hasKey) {
    result = "open";
} else if (energy > 2 || hasKey) {
    result = "charge";
} else {
    result = "locked";
}`,
        choices: [
          { id: 'a', label: 'open', isCorrect: false },
          { id: 'b', label: 'charge', isCorrect: true },
          { id: 'c', label: 'locked', isCorrect: false },
          { id: 'd', label: 'empty string', isCorrect: false },
        ],
        explanation: 'The first condition is false because energy > 5 is false. The else-if is true because energy > 2 is true.',
        hints: ['Evaluate the first && expression before moving on.', 'The else-if uses ||, so one true part is enough.'],
      },
      {
        id: 'final-boss-3',
        lockType: 'final-boss',
        title: 'Final Boss',
        category: 'Mixed conditional trace',
        prompt: 'What is the final value of result?',
        code: `int score = 59;
boolean late = false;
String result = "";

if (score >= 90 && !late) {
    result = "honors";
} else if (score >= 60 || late) {
    result = "review";
} else {
    result = "redo";
}`,
        choices: [
          { id: 'a', label: 'honors', isCorrect: false },
          { id: 'b', label: 'review', isCorrect: false },
          { id: 'c', label: 'redo', isCorrect: true },
          { id: 'd', label: 'empty string', isCorrect: false },
        ],
        explanation: 'The first condition is false and the else-if is also false, so result becomes redo.',
        hints: ['Check score >= 60 carefully.', 'The else runs when both previous conditions are false.'],
      },
      {
        id: 'final-boss-4',
        lockType: 'final-boss',
        title: 'Final Boss',
        category: 'Mixed conditional trace',
        prompt: 'What is the final value of result?',
        code: `int x = 10;
int y = 10;
String result = "";

if (x > y && y > 0) {
    result = "ahead";
} else if (x == y || y < 0) {
    result = "tie";
} else {
    result = "behind";
}`,
        choices: [
          { id: 'a', label: 'ahead', isCorrect: false },
          { id: 'b', label: 'tie', isCorrect: true },
          { id: 'c', label: 'behind', isCorrect: false },
          { id: 'd', label: 'empty string', isCorrect: false },
        ],
        explanation: 'x > y is false, but x == y is true in the else-if, so result becomes tie.',
        hints: ['The first branch uses &&.', 'The else-if uses ||, so one true part is enough.'],
      },
    ],
  },
];

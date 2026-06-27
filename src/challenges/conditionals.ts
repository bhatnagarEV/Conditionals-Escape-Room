import type { ChallengeTemplate, LockDefinition, LockType } from '../types';

type ChallengeInput = {
  id: number;
  lockType: LockType;
  title: string;
  category: string;
  prompt: string;
  code: string;
  correct: string;
  distractors: [string, string, string];
  explanation: string;
  hints: [string, string];
};

const makeChallenge = ({
  id,
  lockType,
  title,
  category,
  prompt,
  code,
  correct,
  distractors,
  explanation,
  hints,
}: ChallengeInput): ChallengeTemplate => ({
  id: `${lockType}-${id}`,
  lockType,
  title,
  category,
  prompt,
  code,
  choices: [correct, ...distractors].map((label, index) => ({
    id: String.fromCharCode(97 + index),
    label,
    isCorrect: index === 0,
  })),
  explanation,
  hints,
});

const predictOutput = (id: number, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'predict-output',
    title: 'Predict Output',
    category: 'Basic if / else',
    prompt: 'What is printed by this code?',
    code,
    correct,
    distractors,
    explanation,
    hints: ['Trace the conditions from top to bottom.', 'Only one branch in an if / else-if / else chain executes.'],
  });

const branchExecutes = (id: number, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'branch-executes',
    title: 'Which Branch Executes',
    category: 'Branch tracing',
    prompt: 'Which branch executes when this code runs?',
    code,
    correct,
    distractors,
    explanation,
    hints: ['Evaluate the conditions in order.', 'The first true condition wins.'],
  });

const comparisonOperator = (id: number, prompt: string, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'comparison-operator',
    title: 'Choose Comparison Operator',
    category: 'Relational operators',
    prompt,
    code,
    correct,
    distractors,
    explanation,
    hints: ['Match the operator to the exact wording.', 'Remember that == compares primitive values for equality.'],
  });

const compoundBoolean = (id: number, code: string, correct: string, explanation: string) =>
  makeChallenge({
    id,
    lockType: 'compound-boolean',
    title: 'Compound Boolean Expressions',
    category: 'Boolean logic',
    prompt: 'What is the value of the expression?',
    code,
    correct,
    distractors: correct === 'true' ? ['false', 'The code does not compile', 'It depends on a previous if statement'] : ['true', 'The code does not compile', 'It depends on a previous if statement'],
    explanation,
    hints: ['Evaluate each comparison first.', 'Apply ! before combining expressions with && or ||.'],
  });

const shortCircuit = (id: number, prompt: string, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'short-circuit',
    title: 'Short-Circuit Evaluation',
    category: 'Short-circuit logic',
    prompt,
    code,
    correct,
    distractors,
    explanation,
    hints: ['Java evaluates boolean expressions from left to right.', '&& can stop on false; || can stop on true.'],
  });

const arrangeBranches = (id: number, prompt: string, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'arrange-branches',
    title: 'Arrange if / else-if / else',
    category: 'Code ordering',
    prompt,
    code,
    correct,
    distractors,
    explanation,
    hints: ['A chain must start with if.', 'A plain else must come after all else-if blocks.'],
  });

const nestedIf = (id: number, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'nested-if',
    title: 'Nested If Trace',
    category: 'Nested conditionals',
    prompt: 'What is printed by the nested conditional?',
    code,
    correct,
    distractors,
    explanation,
    hints: ['Trace the outer condition first.', 'Only enter an inner if when the outer branch runs.'],
  });

const demorgan = (id: number, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'demorgan',
    title: "DeMorgan's Law",
    category: 'Equivalent expressions',
    prompt: 'Which expression is equivalent?',
    code,
    correct,
    distractors,
    explanation,
    hints: ['DeMorgan changes && to ||, and || to &&.', 'Negate each comparison carefully.'],
  });

const findBug = (id: number, prompt: string, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'find-bug',
    title: 'Find the Bug',
    category: 'Debugging conditionals',
    prompt,
    code,
    correct,
    distractors,
    explanation,
    hints: ['Look closely at the condition.', 'Ask what Java actually matches, compares, or evaluates.'],
  });

const finalBoss = (id: number, code: string, correct: string, distractors: [string, string, string], explanation: string) =>
  makeChallenge({
    id,
    lockType: 'final-boss',
    title: 'Final Boss',
    category: 'Mixed conditional trace',
    prompt: 'What is the final value of result?',
    code,
    correct,
    distractors,
    explanation,
    hints: ['Trace the code in order.', 'Stop when the first true branch in the chain runs.'],
  });

export const conditionalsLocks: LockDefinition[] = [
  {
    id: 'lock-1',
    order: 1,
    title: 'Predict Output',
    lockType: 'predict-output',
    bank: [
      predictOutput(1, `int score = 84;

if (score >= 90) {
    System.out.println("A");
} else if (score >= 80) {
    System.out.println("B");
} else {
    System.out.println("Keep practicing");
}`, 'B', ['A', 'Keep practicing', 'Nothing is printed'], '84 is at least 80 but less than 90, so B is printed.'),
      predictOutput(2, `int lives = 0;

if (lives > 0) {
    System.out.println("Keep playing");
} else {
    System.out.println("Game over");
}`, 'Game over', ['Keep playing', '0', 'Nothing is printed'], 'lives > 0 is false, so the else branch prints Game over.'),
      predictOutput(3, `int battery = 95;

if (battery >= 90) {
    System.out.println("Full power");
} else if (battery >= 30) {
    System.out.println("Keep going");
} else {
    System.out.println("Recharge");
}`, 'Full power', ['Keep going', 'Recharge', '95'], 'battery >= 90 is true, so Full power is printed.'),
      predictOutput(4, `int tickets = 2;

if (tickets >= 5) {
    System.out.println("Prize");
} else if (tickets >= 3) {
    System.out.println("Sticker");
} else {
    System.out.println("Try again");
}`, 'Try again', ['Prize', 'Sticker', 'Nothing is printed'], '2 is below both cutoffs, so the else branch prints Try again.'),
      predictOutput(5, `int x = 5;

if (x > 5) {
    System.out.println("greater");
} else if (x == 5) {
    System.out.println("equal");
} else {
    System.out.println("less");
}`, 'equal', ['greater', 'less', '5'], 'x == 5 is true after x > 5 is false.'),
      predictOutput(6, `int absences = 4;

if (absences >= 5) {
    System.out.println("conference");
} else {
    System.out.println("ok");
}`, 'ok', ['conference', '4', 'Nothing is printed'], '4 is not at least 5, so ok is printed.'),
      predictOutput(7, `int rank = 1;

if (rank == 1) {
    System.out.println("gold");
} else if (rank == 2) {
    System.out.println("silver");
} else {
    System.out.println("bronze");
}`, 'gold', ['silver', 'bronze', 'rank'], 'rank == 1 is true, so gold is printed.'),
      predictOutput(8, `int waterLevel = 30;

if (waterLevel < 20) {
    System.out.println("low");
} else if (waterLevel < 50) {
    System.out.println("medium");
} else {
    System.out.println("high");
}`, 'medium', ['low', 'high', '30'], '30 is not below 20, but it is below 50.'),
      predictOutput(9, `boolean locked = true;

if (!locked) {
    System.out.println("enter");
} else {
    System.out.println("wait");
}`, 'wait', ['enter', 'true', 'Nothing is printed'], '!locked is false because locked is true.'),
      predictOutput(10, `int streak = 10;

if (streak % 2 == 0) {
    System.out.println("even streak");
} else {
    System.out.println("odd streak");
}`, 'even streak', ['odd streak', '10', 'Nothing is printed'], '10 % 2 is 0, so the even branch runs.'),
      predictOutput(11, `int files = 12;

if (files > 20) {
    System.out.println("archive");
} else if (files > 10) {
    System.out.println("review");
} else {
    System.out.println("ignore");
}`, 'review', ['archive', 'ignore', '12'], '12 is greater than 10 but not greater than 20.'),
      predictOutput(12, `int gems = -1;

if (gems >= 0) {
    System.out.println("inventory");
} else {
    System.out.println("error");
}`, 'error', ['inventory', '-1', 'Nothing is printed'], '-1 is not greater than or equal to 0.'),
    ],
  },
  {
    id: 'lock-2',
    order: 2,
    title: 'Which Branch Executes',
    lockType: 'branch-executes',
    bank: [
      branchExecutes(1, `int temp = 72;

if (temp > 80) {
    System.out.println("hot");
} else if (temp >= 70) {
    System.out.println("warm");
} else {
    System.out.println("cool");
}`, 'else-if branch that prints "warm"', ['if branch that prints "hot"', 'else branch that prints "cool"', 'No branch executes'], '72 reaches the else-if branch.'),
      branchExecutes(2, `int points = 50;

if (points >= 100) {
    System.out.println("gold");
} else if (points >= 50) {
    System.out.println("silver");
} else {
    System.out.println("bronze");
}`, 'else-if branch that prints "silver"', ['if branch that prints "gold"', 'else branch that prints "bronze"', 'Both branches execute'], '50 is not at least 100, but it is at least 50.'),
      branchExecutes(3, `int level = 12;

if (level > 10) {
    System.out.println("expert");
} else if (level > 5) {
    System.out.println("intermediate");
} else {
    System.out.println("beginner");
}`, 'if branch that prints "expert"', ['else-if branch that prints "intermediate"', 'else branch that prints "beginner"', 'Both if and else-if branches'], 'level > 10 is true.'),
      branchExecutes(4, `int minutesLate = 18;

if (minutesLate < 5) {
    System.out.println("on time");
} else if (minutesLate < 15) {
    System.out.println("warning");
} else {
    System.out.println("detention");
}`, 'else branch that prints "detention"', ['if branch that prints "on time"', 'else-if branch that prints "warning"', 'No branch executes'], '18 is not less than 5 or 15.'),
      branchExecutes(5, `int pages = 3;

if (pages > 10) {
    System.out.println("long");
} else if (pages > 5) {
    System.out.println("medium");
} else {
    System.out.println("short");
}`, 'else branch that prints "short"', ['if branch that prints "long"', 'else-if branch that prints "medium"', 'Both conditions are true'], '3 fails both earlier comparisons.'),
      branchExecutes(6, `int speed = 55;

if (speed >= 65) {
    System.out.println("fast");
} else if (speed >= 40) {
    System.out.println("steady");
} else {
    System.out.println("slow");
}`, 'else-if branch that prints "steady"', ['if branch that prints "fast"', 'else branch that prints "slow"', 'No branch executes'], '55 is at least 40 but below 65.'),
      branchExecutes(7, `boolean isMember = true;

if (isMember) {
    System.out.println("discount");
} else {
    System.out.println("regular");
}`, 'if branch that prints "discount"', ['else branch that prints "regular"', 'Both branches execute', 'No branch executes'], 'isMember is true.'),
      branchExecutes(8, `int rating = 1;

if (rating == 5) {
    System.out.println("excellent");
} else if (rating >= 3) {
    System.out.println("okay");
} else {
    System.out.println("poor");
}`, 'else branch that prints "poor"', ['if branch that prints "excellent"', 'else-if branch that prints "okay"', 'No branch executes'], '1 does not meet the first two conditions.'),
      branchExecutes(9, `int balance = 0;

if (balance < 0) {
    System.out.println("overdrawn");
} else if (balance == 0) {
    System.out.println("empty");
} else {
    System.out.println("positive");
}`, 'else-if branch that prints "empty"', ['if branch that prints "overdrawn"', 'else branch that prints "positive"', 'Both if and else-if branches'], 'balance == 0 is true after balance < 0 is false.'),
      branchExecutes(10, `int distance = 101;

if (distance > 100) {
    System.out.println("far");
} else if (distance > 50) {
    System.out.println("near");
} else {
    System.out.println("close");
}`, 'if branch that prints "far"', ['else-if branch that prints "near"', 'else branch that prints "close"', 'Both if and else-if branches'], '101 is greater than 100.'),
      branchExecutes(11, `int attempts = 2;

if (attempts == 1) {
    System.out.println("first");
} else if (attempts == 2) {
    System.out.println("second");
} else {
    System.out.println("later");
}`, 'else-if branch that prints "second"', ['if branch that prints "first"', 'else branch that prints "later"', 'No branch executes'], 'attempts == 2 is true.'),
      branchExecutes(12, `int height = 48;

if (height >= 60) {
    System.out.println("ride");
} else if (height >= 50) {
    System.out.println("with adult");
} else {
    System.out.println("wait");
}`, 'else branch that prints "wait"', ['if branch that prints "ride"', 'else-if branch that prints "with adult"', 'Both branches execute'], '48 is below both height cutoffs.'),
    ],
  },
  {
    id: 'lock-3',
    order: 3,
    title: 'Choose Comparison Operator',
    lockType: 'comparison-operator',
    bank: [
      comparisonOperator(1, 'Which operator correctly checks whether a player has enough coins?', `int coins = 12;
int cost = 10;

if (coins ___ cost) {
    System.out.println("Buy item");
}`, '>=', ['>', '<=', '=='], 'Enough means the player can have exactly the cost or more.'),
      comparisonOperator(2, 'Which operator correctly checks whether the guess is not the secret number?', `int guess = 4;
int secret = 9;

if (guess ___ secret) {
    System.out.println("Try again");
}`, '!=', ['==', '>=', '<='], '!= checks that two primitive values are not equal.'),
      comparisonOperator(3, 'Which operator correctly checks whether the temperature is below freezing?', `int temperature = 28;

if (temperature ___ 32) {
    System.out.println("Freeze warning");
}`, '<', ['>', '==', '>='], 'Below means less than.'),
      comparisonOperator(4, 'Which operator correctly checks whether the score is exactly perfect?', `int score = 100;

if (score ___ 100) {
    System.out.println("Perfect");
}`, '==', ['>=', '<=', '!='], 'Exactly means equal to.'),
      comparisonOperator(5, 'Which operator correctly checks whether a number is positive?', `int number = 7;

if (number ___ 0) {
    System.out.println("positive");
}`, '>', ['>=', '<', '=='], 'Positive numbers are greater than 0.'),
      comparisonOperator(6, 'Which operator correctly checks whether a value is at most 10?', `int value = 8;

if (value ___ 10) {
    System.out.println("in range");
}`, '<=', ['<', '>=', '!='], 'At most 10 means less than or equal to 10.'),
      comparisonOperator(7, 'Which operator correctly checks whether the level has not reached the limit?', `int level = 3;
int limit = 5;

if (level ___ limit) {
    System.out.println("keep going");
}`, '<', ['>', '==', '>='], 'Not reached the limit means level is less than limit.'),
      comparisonOperator(8, 'Which operator correctly checks whether a door is closed?', `boolean open = false;

if (open ___ false) {
    System.out.println("closed");
}`, '==', ['!=', '>', '<'], 'A boolean can be compared to false with ==.'),
      comparisonOperator(9, 'Which operator correctly checks whether the count is not zero?', `int count = 3;

if (count ___ 0) {
    System.out.println("has items");
}`, '!=', ['==', '<', '<='], 'Not zero means != 0.'),
      comparisonOperator(10, 'Which operator correctly checks whether a student qualifies with 75 or higher?', `int grade = 75;

if (grade ___ 75) {
    System.out.println("qualifies");
}`, '>=', ['>', '<=', '=='], '75 itself should qualify, so use >=.'),
      comparisonOperator(11, 'Which operator correctly checks whether the timer has expired?', `int seconds = 0;

if (seconds ___ 0) {
    System.out.println("expired");
}`, '==', ['!=', '<', '>'], 'Expired happens exactly when seconds equals 0.'),
      comparisonOperator(12, 'Which operator correctly checks whether a price is over the budget?', `int price = 42;
int budget = 40;

if (price ___ budget) {
    System.out.println("too expensive");
}`, '>', ['>=', '<', '=='], 'Over the budget means greater than the budget.'),
    ],
  },
  {
    id: 'lock-4',
    order: 4,
    title: 'Compound Boolean Expressions',
    lockType: 'compound-boolean',
    bank: [
      compoundBoolean(1, `int age = 15;
boolean hasPermit = true;

age >= 16 && hasPermit`, 'false', 'age >= 16 is false when age is 15.'),
      compoundBoolean(2, `int hour = 21;
boolean isWeekend = false;

hour < 8 || hour > 20 || isWeekend`, 'true', 'hour > 20 is true.'),
      compoundBoolean(3, `int score = 72;
boolean extraCredit = false;

score >= 70 && !extraCredit`, 'true', 'score >= 70 is true and !extraCredit is true.'),
      compoundBoolean(4, `int x = 4;
int y = 9;

x > 5 || y < 3`, 'false', 'Both comparisons are false.'),
      compoundBoolean(5, `boolean raining = true;
boolean hasUmbrella = false;

raining && !hasUmbrella`, 'true', 'raining is true and !hasUmbrella is true.'),
      compoundBoolean(6, `int level = 5;
int lives = 0;

level > 3 && lives > 0`, 'false', 'The lives > 0 comparison is false.'),
      compoundBoolean(7, `int temp = 68;
boolean fanOn = true;

temp > 80 || fanOn`, 'true', 'fanOn is true, so the || expression is true.'),
      compoundBoolean(8, `int a = 2;
int b = 8;

!(a < b)`, 'false', 'a < b is true, and !true is false.'),
      compoundBoolean(9, `int n = 12;

n % 3 == 0 && n % 4 == 0`, 'true', '12 is divisible by both 3 and 4.'),
      compoundBoolean(10, `int n = 14;

n % 3 == 0 || n % 5 == 0`, 'false', '14 is divisible by neither 3 nor 5.'),
      compoundBoolean(11, `boolean loggedIn = true;
boolean locked = true;

loggedIn && !locked`, 'false', '!locked is false.'),
      compoundBoolean(12, `int points = 49;
boolean bonus = true;

points >= 50 || bonus`, 'true', 'bonus is true, so the || expression is true.'),
    ],
  },
  {
    id: 'lock-5',
    order: 5,
    title: 'Short-Circuit Evaluation',
    lockType: 'short-circuit',
    bank: [
      shortCircuit(1, 'Will the right side of the && expression be evaluated?', `int total = 0;

if (total != 0 && 100 / total > 5) {
    System.out.println("large");
}`, 'No, because the left side is false', ['Yes, because both sides of && always run', 'Yes, and it prints large', 'No, because && checks the right side first'], 'For &&, Java skips the right side when the left side is false.'),
      shortCircuit(2, 'Will the right side of the || expression be evaluated?', `int count = 12;

if (count > 10 || count / 0 == 3) {
    System.out.println("safe");
}`, 'No, because the left side is true', ['Yes, because || always checks both sides', 'Yes, and it causes division by zero', 'No, because Java evaluates right to left'], 'For ||, Java skips the right side when the left side is true.'),
      shortCircuit(3, 'Will the right side of the && expression be evaluated?', `int number = 8;

if (number > 0 && number % 2 == 0) {
    System.out.println("positive even");
}`, 'Yes, because the left side is true', ['No, because && always skips the right side', 'No, because number is even', 'Yes, because Java evaluates right to left'], '&& must check the right side when the left side is true.'),
      shortCircuit(4, 'Will the right side of the || expression be evaluated?', `int tries = 1;

if (tries > 3 || tries == 1) {
    System.out.println("check");
}`, 'Yes, because the left side is false', ['No, because || always skips the right side', 'No, because tries is 1', 'Yes, because both sides of || must be true'], '|| must check the right side when the left side is false.'),
      shortCircuit(5, 'Will the method call happen?', `String word = null;

if (word != null && word.length() > 3) {
    System.out.println("long");
}`, 'No, because word != null is false', ['Yes, because length is always checked', 'Yes, and it prints long', 'No, because && evaluates right to left'], 'The null check fails, so && short-circuits.'),
      shortCircuit(6, 'Will the method call happen?', `String word = "java";

if (word == null || word.length() == 4) {
    System.out.println("match");
}`, 'Yes, because word == null is false', ['No, because || always skips methods', 'No, because word is not null', 'Yes, because Java evaluates right to left'], 'The left side of || is false, so Java checks length().'),
      shortCircuit(7, 'Will the right side be evaluated?', `int x = -2;

if (x > 0 && x * x > 10) {
    System.out.println("large");
}`, 'No, because x > 0 is false', ['Yes, because multiplication is safe', 'Yes, because && needs both sides', 'No, because x * x is false'], 'The left side of && is false.'),
      shortCircuit(8, 'Will the right side be evaluated?', `boolean ready = true;

if (ready || getBackupReady()) {
    System.out.println("go");
}`, 'No, because ready is true', ['Yes, because methods always run', 'Yes, because || needs both sides', 'No, because ready is false'], 'A true left side is enough for ||.'),
      shortCircuit(9, 'Will the right side be evaluated?', `boolean ready = false;

if (ready || getBackupReady()) {
    System.out.println("go");
}`, 'Yes, because ready is false', ['No, because || always skips the right side', 'No, because ready is false', 'Yes, because Java evaluates right to left'], 'A false left side is not enough to decide ||.'),
      shortCircuit(10, 'Will the right side be evaluated?', `boolean allowed = true;

if (allowed && hasTicket()) {
    System.out.println("enter");
}`, 'Yes, because allowed is true', ['No, because && always skips methods', 'No, because allowed is true', 'Yes, because || short-circuits'], 'A true left side requires && to evaluate the right side.'),
      shortCircuit(11, 'Will the division happen?', `int divisor = 0;

if (divisor == 0 || 10 / divisor > 1) {
    System.out.println("skip division");
}`, 'No, because divisor == 0 is true', ['Yes, because division is on the right', 'Yes, and it throws an error', 'No, because || checks the right side first'], 'The true left side of || prevents the division.'),
      shortCircuit(12, 'Will the division happen?', `int divisor = 5;

if (divisor != 0 && 10 / divisor > 1) {
    System.out.println("safe division");
}`, 'Yes, because divisor != 0 is true', ['No, because && skips division', 'No, because divisor is 5', 'Yes, because Java evaluates right to left'], 'The true left side lets && evaluate the division.'),
    ],
  },
  {
    id: 'lock-6',
    order: 6,
    title: 'Arrange if / else-if / else',
    lockType: 'arrange-branches',
    bank: [
      arrangeBranches(1, 'Which order creates a valid if / else-if / else chain?', `A. else { ... }
B. if (level > 10) { ... }
C. else if (level > 5) { ... }`, 'B, C, A', ['A, B, C', 'C, B, A', 'B, A, C'], 'The if starts the chain, else-if follows, and else is last.'),
      arrangeBranches(2, 'Which order creates a valid chain for assigning a letter grade?', `A. else if (grade >= 80) { letter = "B"; }
B. else { letter = "C"; }
C. if (grade >= 90) { letter = "A"; }`, 'C, A, B', ['A, C, B', 'B, A, C', 'C, B, A'], 'The if block must come before else-if and else.'),
      arrangeBranches(3, 'Which order creates a valid chain for choosing a shipping price?', `A. else if (weight < 10) { cost = 8; }
B. if (weight < 2) { cost = 3; }
C. else { cost = 15; }`, 'B, A, C', ['A, B, C', 'C, B, A', 'B, C, A'], 'Start with if, then else-if, then else.'),
      arrangeBranches(4, 'Which order creates a valid chain for assigning a message?', `A. if (health <= 0) { message = "done"; }
B. else { message = "safe"; }
C. else if (health < 20) { message = "danger"; }`, 'A, C, B', ['C, A, B', 'B, A, C', 'A, B, C'], 'A plain else must come after any else-if.'),
      arrangeBranches(5, 'Which order creates a valid chain for checking a password result?', `A. else if (attempts < 3) { status = "retry"; }
B. else { status = "locked"; }
C. if (correct) { status = "open"; }`, 'C, A, B', ['A, C, B', 'B, C, A', 'C, B, A'], 'The condition that starts with if must come first.'),
      arrangeBranches(6, 'Which order creates a valid chain for classifying a number?', `A. else { kind = "negative"; }
B. else if (n == 0) { kind = "zero"; }
C. if (n > 0) { kind = "positive"; }`, 'C, B, A', ['B, C, A', 'A, B, C', 'C, A, B'], 'if, else-if, else is the valid order.'),
      arrangeBranches(7, 'Which order creates a valid chain for assigning a speed label?', `A. if (speed > 70) { label = "fast"; }
B. else if (speed > 30) { label = "steady"; }
C. else { label = "slow"; }`, 'A, B, C', ['B, A, C', 'C, A, B', 'A, C, B'], 'This one is already in if, else-if, else order.'),
      arrangeBranches(8, 'Which order creates a valid chain for checking inventory?', `A. else if (count < 5) { status = "low"; }
B. if (count == 0) { status = "empty"; }
C. else { status = "stocked"; }`, 'B, A, C', ['A, B, C', 'B, C, A', 'C, B, A'], 'The if block starts the chain.'),
      arrangeBranches(9, 'Which order creates a valid chain for assigning a medal?', `A. else if (place == 2) { medal = "silver"; }
B. else if (place == 3) { medal = "bronze"; }
C. if (place == 1) { medal = "gold"; }
D. else { medal = "none"; }`, 'C, A, B, D', ['A, B, C, D', 'C, D, A, B', 'D, C, A, B'], 'Multiple else-if blocks can appear before the final else.'),
      arrangeBranches(10, 'Which order creates a valid chain for checking a game state?', `A. else { state = "play"; }
B. if (won) { state = "win"; }
C. else if (lost) { state = "lose"; }`, 'B, C, A', ['A, B, C', 'C, B, A', 'B, A, C'], 'The plain else goes last.'),
      arrangeBranches(11, 'Which order creates a valid chain for setting a fee?', `A. else if (age < 18) { fee = 5; }
B. if (age < 5) { fee = 0; }
C. else if (age < 65) { fee = 10; }
D. else { fee = 6; }`, 'B, A, C, D', ['A, B, C, D', 'B, D, A, C', 'D, B, A, C'], 'The chain starts with if and ends with else.'),
      arrangeBranches(12, 'Which order creates a valid chain for setting a warning?', `A. if (battery < 10) { warning = "critical"; }
B. else { warning = "none"; }
C. else if (battery < 30) { warning = "low"; }`, 'A, C, B', ['C, A, B', 'A, B, C', 'B, A, C'], 'else-if must come before else.'),
    ],
  },
  {
    id: 'lock-7',
    order: 7,
    title: 'Nested If Trace',
    lockType: 'nested-if',
    bank: [
      nestedIf(1, `int x = 8;
int y = 3;

if (x > 5) {
    if (y > 5) {
        System.out.println("alpha");
    } else {
        System.out.println("beta");
    }
} else {
    System.out.println("gamma");
}`, 'beta', ['alpha', 'gamma', 'Nothing is printed'], 'The outer condition is true, then the inner condition is false.'),
      nestedIf(2, `int speed = 45;
boolean schoolZone = true;

if (schoolZone) {
    if (speed > 25) {
        System.out.println("slow down");
    } else {
        System.out.println("ok");
    }
} else {
    System.out.println("normal road");
}`, 'slow down', ['ok', 'normal road', 'schoolZone'], 'schoolZone is true and speed > 25 is true.'),
      nestedIf(3, `int coins = 1;
boolean bonus = true;

if (coins >= 5) {
    if (bonus) {
        System.out.println("double prize");
    } else {
        System.out.println("single prize");
    }
} else {
    System.out.println("no prize");
}`, 'no prize', ['double prize', 'single prize', 'bonus'], 'coins >= 5 is false, so the outer else runs.'),
      nestedIf(4, `int rows = 3;
int cols = 3;

if (rows == cols) {
    if (rows > 5) {
        System.out.println("large square");
    } else {
        System.out.println("small square");
    }
} else {
    System.out.println("rectangle");
}`, 'small square', ['large square', 'rectangle', '3'], 'rows == cols is true, then rows > 5 is false.'),
      nestedIf(5, `int age = 20;
boolean hasId = false;

if (age >= 18) {
    if (hasId) {
        System.out.println("enter");
    } else {
        System.out.println("show ID");
    }
} else {
    System.out.println("too young");
}`, 'show ID', ['enter', 'too young', 'hasId'], 'The outer condition is true, but hasId is false.'),
      nestedIf(6, `int a = 2;
int b = 9;

if (a > b) {
    if (a > 10) {
        System.out.println("large a");
    } else {
        System.out.println("small a");
    }
} else {
    System.out.println("b wins");
}`, 'b wins', ['large a', 'small a', 'Nothing is printed'], 'a > b is false.'),
      nestedIf(7, `boolean online = true;
int messages = 0;

if (online) {
    if (messages > 0) {
        System.out.println("reply");
    } else {
        System.out.println("wait");
    }
} else {
    System.out.println("offline");
}`, 'wait', ['reply', 'offline', '0'], 'online is true, then messages > 0 is false.'),
      nestedIf(8, `int score = 98;
boolean late = false;

if (score >= 90) {
    if (!late) {
        System.out.println("honors");
    } else {
        System.out.println("check");
    }
} else {
    System.out.println("regular");
}`, 'honors', ['check', 'regular', 'false'], 'score >= 90 is true and !late is true.'),
      nestedIf(9, `int temp = 30;
boolean windy = true;

if (temp < 32) {
    if (windy) {
        System.out.println("freezing wind");
    } else {
        System.out.println("freezing");
    }
} else {
    System.out.println("above freezing");
}`, 'freezing wind', ['freezing', 'above freezing', 'windy'], 'Both temp < 32 and windy are true.'),
      nestedIf(10, `int level = 4;
int key = 1;

if (level > 5) {
    if (key == 1) {
        System.out.println("unlock");
    } else {
        System.out.println("need key");
    }
} else {
    System.out.println("need level");
}`, 'need level', ['unlock', 'need key', '1'], 'level > 5 is false, so the outer else runs.'),
      nestedIf(11, `boolean paid = true;
boolean expired = true;

if (paid) {
    if (!expired) {
        System.out.println("active");
    } else {
        System.out.println("renew");
    }
} else {
    System.out.println("pay");
}`, 'renew', ['active', 'pay', 'true'], 'paid is true, but !expired is false.'),
      nestedIf(12, `int width = 5;
int height = 7;

if (width == height) {
    if (width > 5) {
        System.out.println("big square");
    } else {
        System.out.println("small square");
    }
} else {
    System.out.println("rectangle");
}`, 'rectangle', ['big square', 'small square', '7'], 'width == height is false.'),
    ],
  },
  {
    id: 'lock-8',
    order: 8,
    title: "DeMorgan's Law",
    lockType: 'demorgan',
    bank: [
      demorgan(1, `!(x > 10 && y < 5)`, 'x <= 10 || y >= 5', ['x <= 10 && y >= 5', 'x > 10 || y < 5', 'x < 10 || y > 5'], 'Negating && changes it to || and negates both comparisons.'),
      demorgan(2, `!(isRaining || temperature < 32)`, '!isRaining && temperature >= 32', ['!isRaining || temperature >= 32', 'isRaining && temperature < 32', '!isRaining && temperature < 32'], 'Negating || changes it to && and negates both parts.'),
      demorgan(3, `!(score >= 60 && submitted)`, 'score < 60 || !submitted', ['score < 60 && !submitted', 'score >= 60 || submitted', 'score <= 60 || !submitted'], 'The opposite of >= is <, and submitted becomes !submitted.'),
      demorgan(4, `!(hasTicket || age >= 18)`, '!hasTicket && age < 18', ['!hasTicket || age < 18', 'hasTicket && age >= 18', '!hasTicket && age <= 18'], 'The opposite of age >= 18 is age < 18.'),
      demorgan(5, `!(a == b && ready)`, 'a != b || !ready', ['a != b && !ready', 'a == b || ready', 'a < b || !ready'], '== negates to !=, and && changes to ||.'),
      demorgan(6, `!(x < 0 || y > 100)`, 'x >= 0 && y <= 100', ['x >= 0 || y <= 100', 'x < 0 && y > 100', 'x > 0 && y < 100'], '< negates to >=, and > negates to <=.'),
      demorgan(7, `!(loggedIn && !locked)`, '!loggedIn || locked', ['!loggedIn && locked', 'loggedIn || !locked', '!loggedIn || !locked'], '!(!locked) becomes locked.'),
      demorgan(8, `!(n % 2 == 0 || n < 10)`, 'n % 2 != 0 && n >= 10', ['n % 2 != 0 || n >= 10', 'n % 2 == 0 && n < 10', 'n % 2 != 0 && n > 10'], '== negates to != and < negates to >=.'),
      demorgan(9, `!(finished || attempts >= 3)`, '!finished && attempts < 3', ['!finished || attempts < 3', 'finished && attempts >= 3', '!finished && attempts <= 3'], '|| changes to &&, and >= changes to <.'),
      demorgan(10, `!(count != 0 && valid)`, 'count == 0 || !valid', ['count == 0 && !valid', 'count != 0 || valid', 'count < 0 || !valid'], '!= negates to ==.'),
      demorgan(11, `!(cold || windy)`, '!cold && !windy', ['!cold || !windy', 'cold && windy', '!cold && windy'], 'Both boolean variables are negated and || becomes &&.'),
      demorgan(12, `!(age <= 12 && member)`, 'age > 12 || !member', ['age > 12 && !member', 'age >= 12 || !member', 'age <= 12 || member'], '<= negates to >, and && changes to ||.'),
    ],
  },
  {
    id: 'lock-9',
    order: 9,
    title: 'Find the Bug',
    lockType: 'find-bug',
    bank: [
      findBug(1, 'Which fix makes the code compare the values correctly?', `int guess = 7;
int answer = 7;

if (guess = answer) {
    System.out.println("correct");
}`, 'Change = to ==', ['Change = to !=', 'Remove the parentheses', 'Change int to double'], 'A comparison uses ==, not a single assignment operator.'),
      findBug(2, 'Which fix correctly compares the String value?', `String mode = "easy";

if (mode == "easy") {
    System.out.println("start");
}`, 'Use mode.equals("easy")', ['Use mode = "easy"', 'Use mode != "easy"', 'Remove the quotes around easy'], 'String values should be compared with .equals in AP CSA.'),
      findBug(3, 'Which fix makes the condition test the intended range?', `int percent = 87;

if (80 <= percent <= 89) {
    System.out.println("B");
}`, 'Use percent >= 80 && percent <= 89', ['Use percent >= 80 || percent <= 89', 'Use 80 >= percent && 89 <= percent', 'Use percent == 80 && percent == 89'], 'Java does not support chained comparisons.'),
      findBug(4, 'Which fix makes the else match the intended condition?', `boolean loggedIn = true;
boolean isAdmin = false;

if (loggedIn)
    if (isAdmin)
        System.out.println("admin");
else
    System.out.println("guest");`, 'Add braces around the outer if body', ['Change loggedIn to false', 'Replace else with else if', 'Change isAdmin to an int'], 'Without braces, else pairs with the nearest unmatched if.'),
      findBug(5, 'Which fix checks whether n is even?', `int n = 12;

if (n % 2 = 0) {
    System.out.println("even");
}`, 'Change = to ==', ['Change % to /', 'Change 0 to 1', 'Remove n % 2'], 'The result of n % 2 must be compared with ==.'),
      findBug(6, 'Which fix makes the boolean condition valid?', `boolean ready = true;

if (ready == true); {
    System.out.println("go");
}`, 'Remove the semicolon after the if condition', ['Change true to false', 'Use ready.equals(true)', 'Remove the braces'], 'The semicolon ends the if statement too early.'),
      findBug(7, 'Which fix prevents the wrong branch from always running?', `int score = 92;

if (score > 90) {
    System.out.println("A");
}
if (score > 80) {
    System.out.println("B");
}`, 'Change the second if to else if', ['Change > 80 to > 100', 'Remove the first if', 'Change score to a String'], 'An else-if chain prevents both branches from running.'),
      findBug(8, 'Which fix checks that a number is outside the range 1 through 10?', `int n = 12;

if (n < 1 && n > 10) {
    System.out.println("outside");
}`, 'Change && to ||', ['Change < to <= only', 'Change > to >= only', 'Change n to boolean'], 'A number cannot be less than 1 and greater than 10 at the same time.'),
      findBug(9, 'Which fix checks the negative case correctly?', `boolean absent = false;

if (!absent == false) {
    System.out.println("present");
}`, 'Use absent == false or !absent', ['Use absent = false', 'Use absent.equals(false)', 'Remove the if'], 'The condition is unnecessarily confusing; !absent directly checks present.'),
      findBug(10, 'Which fix makes the threshold check include 100?', `int score = 100;

if (score > 100) {
    System.out.println("perfect");
}`, 'Change > to >=', ['Change > to <', 'Change 100 to 0', 'Use score.equals(100)'], 'A perfect score of exactly 100 should be included.'),
      findBug(11, 'Which fix avoids integer assignment in a boolean condition?', `int value = 3;

if (value = 3) {
    System.out.println("match");
}`, 'Change value = 3 to value == 3', ['Change int to boolean', 'Change 3 to true', 'Remove value'], 'An int assignment is not a boolean condition.'),
      findBug(12, 'Which fix compares two String variables by content?', `String first = "AP";
String second = "AP";

if (first == second) {
    System.out.println("same");
}`, 'Use first.equals(second)', ['Use first = second', 'Use first != second', 'Use first.compareTo(second) > 0'], '.equals compares String contents.'),
    ],
  },
  {
    id: 'lock-10',
    order: 10,
    title: 'Final Boss',
    lockType: 'final-boss',
    bank: [
      finalBoss(1, `int a = 6;
int b = 4;
String result = "";

if (a > b && b % 2 == 0) {
    result = "unlock";
} else if (a == b || b > 10) {
    result = "retry";
} else {
    result = "reset";
}`, 'unlock', ['retry', 'reset', 'empty string'], 'a > b is true and b is even.'),
      finalBoss(2, `int energy = 4;
boolean hasKey = true;
String result = "";

if (energy > 5 && hasKey) {
    result = "open";
} else if (energy > 2 || hasKey) {
    result = "charge";
} else {
    result = "locked";
}`, 'charge', ['open', 'locked', 'empty string'], 'The first condition is false, but the else-if is true.'),
      finalBoss(3, `int score = 59;
boolean late = false;
String result = "";

if (score >= 90 && !late) {
    result = "honors";
} else if (score >= 60 || late) {
    result = "review";
} else {
    result = "redo";
}`, 'redo', ['honors', 'review', 'empty string'], 'Both earlier conditions are false.'),
      finalBoss(4, `int x = 10;
int y = 10;
String result = "";

if (x > y && y > 0) {
    result = "ahead";
} else if (x == y || y < 0) {
    result = "tie";
} else {
    result = "behind";
}`, 'tie', ['ahead', 'behind', 'empty string'], 'x == y is true in the else-if.'),
      finalBoss(5, `int lives = 0;
boolean shield = true;
String result = "";

if (lives > 0 && shield) {
    result = "safe";
} else if (lives > 0 || shield) {
    result = "warning";
} else {
    result = "done";
}`, 'warning', ['safe', 'done', 'empty string'], 'The first condition is false, but shield makes the else-if true.'),
      finalBoss(6, `int temp = 101;
boolean fan = false;
String result = "";

if (temp > 100 && !fan) {
    result = "alert";
} else if (temp > 80 || fan) {
    result = "warm";
} else {
    result = "normal";
}`, 'alert', ['warm', 'normal', 'empty string'], 'temp > 100 and !fan are both true.'),
      finalBoss(7, `int coins = 3;
int cost = 5;
String result = "";

if (coins >= cost && cost > 0) {
    result = "buy";
} else if (coins == 0 || cost <= 0) {
    result = "error";
} else {
    result = "save";
}`, 'save', ['buy', 'error', 'empty string'], 'The first two branches are false, so else runs.'),
      finalBoss(8, `int grade = 88;
boolean retake = true;
String result = "";

if (grade >= 90 && !retake) {
    result = "A";
} else if (grade >= 80 && retake) {
    result = "review";
} else {
    result = "study";
}`, 'review', ['A', 'study', 'empty string'], 'grade >= 80 and retake are both true.'),
      finalBoss(9, `int row = 4;
int col = 9;
String result = "";

if (row == col && row > 5) {
    result = "large square";
} else if (row == col || col > 8) {
    result = "special";
} else {
    result = "plain";
}`, 'special', ['large square', 'plain', 'empty string'], 'col > 8 makes the else-if true.'),
      finalBoss(10, `int attempts = 4;
boolean locked = true;
String result = "";

if (attempts < 3 && !locked) {
    result = "try";
} else if (attempts >= 3 && locked) {
    result = "wait";
} else {
    result = "reset";
}`, 'wait', ['try', 'reset', 'empty string'], 'attempts >= 3 and locked are both true.'),
      finalBoss(11, `int n = 15;
String result = "";

if (n % 2 == 0 && n % 3 == 0) {
    result = "six";
} else if (n % 3 == 0 || n % 5 == 0) {
    result = "match";
} else {
    result = "none";
}`, 'match', ['six', 'none', 'empty string'], '15 is divisible by 3 and 5, so the else-if runs.'),
      finalBoss(12, `boolean present = false;
boolean excused = false;
String result = "";

if (present && !excused) {
    result = "here";
} else if (!present && excused) {
    result = "excused";
} else {
    result = "absent";
}`, 'absent', ['here', 'excused', 'empty string'], 'present is false and excused is false, so else runs.'),
    ],
  },
];

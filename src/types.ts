export type ScreenState = 'HOME' | 'CHARACTER_SELECT' | 'GAMEPLAY' | 'LOSE' | 'WIN';

export type AnimalId = 'pibble' | 'momo' | 'sly' | 'bo' | 'nori';

export interface MathQuestion {
  equation: string;
  options: (number | string)[];
  answer: number | string;
  expressionTip?: string;
  rawNumbers: number[];
  operator: string;
}

export interface GameplayParams {
  baseTimer: number; // base time in seconds
  streakBonusFactor: number;
  scoreFactor: number;
  operators: ('+' | '-' | '*' | '/')[];
  difficultyScale: number; // how fast numbers grow
}

export interface AnimalTheme {
  primary: string; // Tailwind color class (e.g. "bg-pink-100")
  secondary: string; // (e.g. "bg-pink-200")
  border: string; // border color
  text: string; // text slate/pink
  accent: string; // e.g. "text-pink-600"
  badge: string; // e.g. "bg-pink-200"
  btnFilled: string; // option button class
  btnOutline: string; // e.g. "border-pink-500 text-pink-700 hover:bg-pink-50"
  bubbleBorder: string;
  shadow: string; // shadow dye
}

export interface AnimalConfig {
  id: AnimalId;
  name: string;
  tagline: string;
  ability: string;
  abilityDesc: string;
  theme: AnimalTheme;
  dialogues: {
    start: string[];
    correct: string[];
    wrong: string[];
    lowTime: string[];
    victory: string[];
    defeat: string[];
  };
  gameplayParams: GameplayParams;
}

export const ANIMALS: Record<AnimalId, AnimalConfig> = {
  pibble: {
    id: 'pibble',
    name: 'Pibble',
    tagline: 'presses first, thinks never.',
    ability: 'chaos bonus',
    abilityDesc: 'Highly chaotic equations but gives a random +50 to +150 score bonus on every correct streak milestone!',
    theme: {
      primary: '#fff0f3', // light pink
      secondary: '#ffccd5', // cozy pig pink
      border: 'border-[#db7a95]',
      text: 'text-[#8c2e4b]',
      accent: 'text-[#e05a82]',
      badge: 'bg-[#ffccd5] text-[#8c2e4b]',
      btnFilled: 'bg-[#ffccd5] hover:bg-[#ffb3c1] active:bg-[#ff99ac] text-[#8c2e4b] border-2 border-[#db7a95]',
      btnOutline: 'border-[#db7a95] text-[#db7a95] hover:bg-[#ffe5ec]',
      bubbleBorder: 'border-[#ff99ac]',
      shadow: 'shadow-pink-100',
    },
    dialogues: {
      start: [
        'wait... i might actually know this!',
        'does 2 + 2 = 4 apply here?',
        'let me press something, quick!',
      ],
      correct: [
        'OMG, absolute genius moment!',
        'i guessed and i was correct?!',
        'whoa, call me a math wizard!',
      ],
      wrong: [
        'brain cell error: 404 not found.',
        'ah! i was counting on my hooves!',
        'wait, subtraction is a thing?!',
      ],
      lowTime: [
        'PANIC IN THE PEN! PRESS ANYTHING!',
        'AHHH TIMER IS MELTING!',
        'help! my computer brain is sweating!',
      ],
      victory: [
        'we survived! pig party time!',
        'i am now official math nobility!',
        'who matches my piggy intellect? nobody!',
      ],
      defeat: [
        'at least i have delicious muddy puddles...',
        'next time, my hooves will click faster!',
        'math was made by wolves, i code instead',
      ],
    },
    gameplayParams: {
      baseTimer: 9, // tight timer for high excitement
      streakBonusFactor: 1.5,
      scoreFactor: 1.2,
      operators: ['+', '-', '*'],
      difficultyScale: 1.3,
    },
  },
  momo: {
    id: 'momo',
    name: 'Momo',
    tagline: 'slow brain, strong mind.',
    ability: 'steady mind',
    abilityDesc: 'Get a +5 seconds timer boost for every 3 consecutive correct answers!',
    theme: {
      primary: '#FAF5ED', // cream warm beige
      secondary: '#E6D3BA', // honey beige
      border: 'border-[#91755a]',
      text: 'text-[#544130]',
      accent: 'text-[#a27b5c]',
      badge: 'bg-[#E6D3BA] text-[#544130]',
      btnFilled: 'bg-[#E5D5C0] hover:bg-[#D9C1A3] active:bg-[#CCAE87] text-[#544130] border-2 border-[#91755a]',
      btnOutline: 'border-[#91755a] text-[#91755a] hover:bg-[#F2E6D5]',
      bubbleBorder: 'border-[#bca38a]',
      shadow: 'shadow-yellow-500/20',
    },
    dialogues: {
      start: [
        'slow and steady solves the puzzle...',
        'i brought honey for brain power!',
        'take a breath, let us think deeply.',
      ],
      correct: [
        "I knew we'd get there.",
        'One step at a time.',
        'Strong thinking.',
        'Patience works.',
      ],
      wrong: [
        "Let's think again.",
        'No rush.',
        'Almost.',
        'Try another path.',
      ],
      lowTime: [
        'the honey is dripping away...',
        'peace, my friend, do not panic.',
        'let us search for the correct digit.',
      ],
      victory: [
        'a golden harvest! magnificent work!',
        'honey jars for everyone!',
        'calm minds always claim the mountain.',
      ],
      defeat: [
        'time for a cozy hibernating nap...',
        'let us rest our heavy heads.',
        'failure is just a slow seed growing.',
      ],
    },
    gameplayParams: {
      baseTimer: 20, // generous base timer increased to 20s
      streakBonusFactor: 1.0,
      scoreFactor: 0.9, // slightly lower base multiplier due to slow motion ease
      operators: ['+', '-', '*'],
      difficultyScale: 1.1,
    },
  },
  sly: {
    id: 'sly',
    name: 'Sly',
    tagline: 'Quiet plans. Sharp moves.',
    ability: 'sharp instinct',
    abilityDesc: 'Get a +3 seconds timer boost for every 3 consecutive correct answers!',
    theme: {
      primary: '#FFF7F0', // off orange
      secondary: '#FFE0CC', // soft orange
      border: 'border-[#C26B38]',
      text: 'text-[#6B3212]',
      accent: 'text-[#E07A2E]',
      badge: 'bg-[#FFE0CC] text-[#6B3212]',
      btnFilled: 'bg-[#FFE0CC] hover:bg-[#FFD1B3] active:bg-[#FFC299] text-[#6B3212] border-2 border-[#C26B38]',
      btnOutline: 'border-[#C26B38] text-[#C26B38] hover:bg-[#FFF0E6]',
      bubbleBorder: 'border-[#E07A2E]',
      shadow: 'shadow-orange-100',
    },
    dialogues: {
      start: [
        'calculated tactics, always three steps ahead.',
        'let’s outsmart the numbers.',
        'stealth math is the finest craft.',
      ],
      correct: [
        'I knew there was a pattern.',
        'Every number tells a story.',
        'The clues never lie.',
        'I saw it.',
      ],
      wrong: [
        'Hmm... almost.',
        'Look closer.',
        'There\'s a rule hiding.',
        'I missed a clue.',
      ],
      lowTime: [
        'time to slip away... quick!',
        'sneaking through the seconds...',
        'almost compromised! choose!',
      ],
      victory: [
        'the grand math heist is complete!',
        'who knew foxes could count chicken farms so well?',
        'sneaky strategy wins the crown!',
      ],
      defeat: [
        'retreat into the deep brush!',
        'we will recalculate our tactics.',
        'foxy recovery is a sneaky science.',
      ],
    },
    gameplayParams: {
      baseTimer: 15,
      streakBonusFactor: 1.4,
      scoreFactor: 1.1,
      operators: ['+', '-', '*', '/'], // loves dividing!
      difficultyScale: 1.2,
    },
  },
  bo: {
    id: 'bo',
    name: 'Bo',
    tagline: 'Panics now. Wins later.',
    ability: 'Panic Burst',
    abilityDesc: 'Solve a question with less than 2 seconds left to earn a +200 Panic Bonus!',
    theme: {
      primary: '#F5FFFA', // mint white
      secondary: '#D8F3E5', // light green mint
      border: 'border-[#2D734C]',
      text: 'text-[#143D24]',
      accent: 'text-[#3E9E68]',
      badge: 'bg-[#D8F3E5] text-[#143D24]',
      btnFilled: 'bg-[#D8F3E5] hover:bg-[#C2EAD4] active:bg-[#ACDFCE] text-[#143D24] border-2 border-[#2D734C]',
      btnOutline: 'border-[#2D734C] text-[#2D734C] hover:bg-[#EEFDF5]',
      bubbleBorder: 'border-[#3E9E68]',
      shadow: 'shadow-emerald-500/10',
    },
    dialogues: {
      start: [
        'OH GOSH! IT IS STARTING!',
        'Wait, let me scratch my head...',
        'OH NO, THE TIMER!',
      ],
      correct: [
        'I WAS RIGHT!',
        'That was way too close.',
        'I totally meant that.',
        'Still got it!',
      ],
      wrong: [
        'I PANICKED.',
        'I knew it... almost.',
        'I clicked too fast.',
        "Let's pretend that didn't happen.",
      ],
      lowTime: [
        'AAAH! CHOOSE SOMETHING!',
        'I CAN\'T THINK!',
        'SWEATING COCONUTS HERE!',
      ],
      victory: [
        'THE ENTIRE JUNGLE REJOICES!',
        'I actually survived!',
        'Extreme chaotic mathematical victory!',
      ],
      defeat: [
        'Sad monkey noises in the rain...',
        'The pressure was too much!',
        'Let\'s never talk about this again.',
      ],
    },
    gameplayParams: {
      baseTimer: 6,
      streakBonusFactor: 1.6,
      scoreFactor: 1.2,
      operators: ['+', '-', '*'],
      difficultyScale: 1.25,
    },
  },
  nori: {
    id: 'nori',
    name: 'Nori',
    tagline: 'Curious always.',
    ability: 'Curious Hint',
    abilityDesc: 'Earn a Hint for every 3-streak. Tap it to eliminate one incorrect answer or highlight a useful clue!',
    theme: {
      primary: '#F5F5FA', // pale purple-gray
      secondary: '#E1E1F0', // warm grey white
      border: 'border-[#5A5A8F]',
      text: 'text-[#2E2E54]',
      accent: 'text-[#6C6EB0]',
      badge: 'bg-[#E1E1F0] text-[#2E2E54]',
      btnFilled: 'bg-[#E1E1F0] hover:bg-[#D1D1EB] active:bg-[#C0C0E3] text-[#2E2E54] border-2 border-[#5A5A8F]',
      btnOutline: 'border-[#5A5A8F] text-[#5A5A8F] hover:bg-[#F0F0FA]',
      bubbleBorder: 'border-[#6C6EB0]',
      shadow: 'shadow-violet-200',
    },
    dialogues: {
      start: [
        "Hmm, let's look closer.",
        "Do you see the secret pattern?",
        "Every number tells a story.",
      ],
      correct: [
        "I found the pattern.",
        "Interesting!",
        "I knew something was hiding.",
        "Let's keep exploring.",
      ],
      wrong: [
        "Hmm...",
        "Look a little closer.",
        "Almost!",
        "I think there's another clue.",
      ],
      lowTime: [
        "Time is slipping away...",
        "Let's look even closer.",
        "Don't rush, watch the patterns.",
      ],
      victory: [
        "We discovered all the patterns!",
        "What a wonderful mathematical journey.",
        "Curiosity wins the day!",
      ],
      defeat: [
        "Let's look at the clues again next time.",
        "Every mistake is a new discovery.",
        "Perhaps the pattern is hiding elsewhere...",
      ],
    },
    gameplayParams: {
      baseTimer: 18,
      streakBonusFactor: 1.3,
      scoreFactor: 1.0,
      operators: ['+', '-', '*', '/'],
      difficultyScale: 1.15,
    },
  },
};

/**
 * Procedurally generates a math question matching the animal configuration and current scoring streak.
 */
export function generateQuestion(animalId: AnimalId, streak: number): MathQuestion {
  const config = ANIMALS[animalId];
  const { operators, difficultyScale } = config.gameplayParams;
  
  // Decide difficulty variables based on streak
  const level = Math.floor(streak / 3) + 1; // increases every 3 points

  if (animalId === 'pibble') {
    // Pibble: Fast mental arithmetic, mixed operations.
    // Three templates:
    // 1. a * b - c or a * b + c
    // 2. a / b + c or a / b - c
    // 3. (a + b) / c or (a - b) * c
    const type = Math.floor(Math.random() * 3); // 0, 1, 2
    
    let equation = '';
    let answer = 0;
    let expressionTip = '';
    let rawNumbers: number[] = [];
    let op = '';

    if (type === 0) {
      // a * b + c or a * b - c
      // Keep numbers suitable for fast mental arithmetic
      const a = Math.floor(Math.random() * (Math.min(5 + level, 12) - 2 + 1)) + 2;
      const b = Math.floor(Math.random() * (Math.min(5 + level, 10) - 2 + 1)) + 2;
      const isSubtraction = Math.random() > 0.5;
      
      if (isSubtraction) {
        const c = Math.floor(Math.random() * Math.min(a * b - 2, 20 + level * 2)) + 1;
        answer = a * b - c;
        equation = `${a} × ${b} − ${c}`;
        expressionTip = 'multiply first, then slice';
        rawNumbers = [a, b, c];
        op = '*-';
      } else {
        const c = Math.floor(Math.random() * (20 + level * 2)) + 1;
        answer = a * b + c;
        equation = `${a} × ${b} + ${c}`;
        expressionTip = 'multiply first, then combine';
        rawNumbers = [a, b, c];
        op = '*+';
      }
    } else if (type === 1) {
      // a / b + c or a / b - c
      const b = Math.floor(Math.random() * 7) + 2; // divisor: 2 to 8
      const q = Math.floor(Math.random() * (Math.min(6 + level, 12) - 2 + 1)) + 2; // quotient
      const a = b * q; // dividend
      const isSubtraction = Math.random() > 0.5 && q > 3;
      
      if (isSubtraction) {
        const c = Math.floor(Math.random() * (q - 1)) + 1;
        answer = q - c;
        equation = `${a} ÷ ${b} − ${c}`;
        expressionTip = 'divide first, then slice';
        rawNumbers = [a, b, c];
        op = '/-';
      } else {
        const c = Math.floor(Math.random() * (15 + level * 2)) + 1;
        answer = q + c;
        equation = `${a} ÷ ${b} + ${c}`;
        expressionTip = 'divide first, then combine';
        rawNumbers = [a, b, c];
        op = '/+';
      }
    } else {
      // (a + b) / c or (a - b) * c
      const isDivision = Math.random() > 0.5;
      if (isDivision) {
        const c = Math.floor(Math.random() * 5) + 2; // divisor: 2 to 6
        const q = Math.floor(Math.random() * (Math.min(5 + level, 10) - 2 + 1)) + 2; // quotient
        const sum = c * q;
        const a = Math.floor(Math.random() * (sum - 4)) + 2;
        const b = sum - a;
        answer = q;
        equation = `(${a} + ${b}) ÷ ${c}`;
        expressionTip = 'parentheses first, then share';
        rawNumbers = [a, b, c];
        op = '+/';
      } else {
        // (a - b) * c
        const diff = Math.floor(Math.random() * 6) + 2; // difference: 2 to 7
        const b = Math.floor(Math.random() * (15 + level)) + 1;
        const a = b + diff;
        const c = Math.floor(Math.random() * 5) + 2; // multiplier: 2 to 6
        answer = diff * c;
        equation = `(${a} − ${b}) × ${c}`;
        expressionTip = 'parentheses first, then grow';
        rawNumbers = [a, b, c];
        op = '-*';
      }
    }

    // Generate 4 unique multiple choice options
    const optionsSet = new Set<number>([answer]);
    while (optionsSet.size < 4) {
      // Decoys close to answer
      const offsetType = Math.random() > 0.5 ? 1 : -1;
      let offset = (Math.floor(Math.random() * 5) + 1) * offsetType;
      
      // Digit swap decoy
      if (Math.random() > 0.7 && answer > 12) {
        const s = answer.toString();
        if (s.length === 2 && s[0] !== s[1]) {
          const reversed = parseInt(s[1] + s[0], 10);
          if (!isNaN(reversed) && reversed !== answer) {
            optionsSet.add(reversed);
            continue;
          }
        }
      }

      // Off-by-one or general near answers
      if (Math.random() > 0.5) {
        offset = (Math.floor(Math.random() * 3) + 1) * offsetType;
      } else {
        offset = (Math.floor(Math.random() * 10) + 1) * offsetType;
      }
      
      const option = answer + offset;
      if (option > 0) {
        optionsSet.add(option);
      }
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      equation,
      options,
      answer,
      expressionTip,
      rawNumbers,
      operator: op
    };
  }

  if (animalId === 'momo') {
    let equation = '';
    let answer = 0;
    let expressionTip = '';
    let rawNumbers: number[] = [];
    let op = '';

    if (streak < 3) {
      // Questions 1-3: Simple missing number
      // We choose a random template out of 8 simple operations
      const template = Math.floor(Math.random() * 8);
      if (template === 0) {
        // a + □ = c -> answer = b, c = a + b
        const a = Math.floor(Math.random() * 15) + 3;
        answer = Math.floor(Math.random() * 15) + 2;
        const c = a + answer;
        equation = `${a} + □ = ${c}`;
        expressionTip = 'simple balancing';
        rawNumbers = [a, answer, c];
        op = '+';
      } else if (template === 1) {
        // □ + b = c -> answer = a, c = a + b
        answer = Math.floor(Math.random() * 15) + 2;
        const b = Math.floor(Math.random() * 15) + 3;
        const c = answer + b;
        equation = `□ + ${b} = ${c}`;
        expressionTip = 'simple balancing';
        rawNumbers = [answer, b, c];
        op = '+';
      } else if (template === 2) {
        // a - □ = c -> answer = b, c = a - b
        answer = Math.floor(Math.random() * 15) + 2;
        const c = Math.floor(Math.random() * 15) + 3;
        const a = answer + c;
        equation = `${a} − □ = ${c}`;
        expressionTip = 'simple slicing';
        rawNumbers = [a, answer, c];
        op = '-';
      } else if (template === 3) {
        // □ - b = c -> answer = a, c = a - b
        const b = Math.floor(Math.random() * 15) + 3;
        const c = Math.floor(Math.random() * 15) + 2;
        answer = b + c;
        equation = `□ − ${b} = ${c}`;
        expressionTip = 'simple slicing';
        rawNumbers = [answer, b, c];
        op = '-';
      } else if (template === 4) {
        // a * □ = c -> answer = b, c = a * b
        const a = Math.floor(Math.random() * 7) + 2; // 2 to 8
        answer = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const c = a * answer;
        equation = `${a} × □ = ${c}`;
        expressionTip = 'simple growth';
        rawNumbers = [a, answer, c];
        op = '*';
      } else if (template === 5) {
        // □ * b = c -> answer = a, c = a * b
        answer = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const b = Math.floor(Math.random() * 7) + 2; // 2 to 8
        const c = answer * b;
        equation = `□ × ${b} = ${c}`;
        expressionTip = 'simple growth';
        rawNumbers = [answer, b, c];
        op = '*';
      } else if (template === 6) {
        // a / □ = c -> answer = b, c = a / b
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const c = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const a = answer * c;
        equation = `${a} ÷ □ = ${c}`;
        expressionTip = 'even share';
        rawNumbers = [a, answer, c];
        op = '/';
      } else {
        // □ / b = c -> answer = a, c = a / b
        const b = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const c = Math.floor(Math.random() * 8) + 2; // 2 to 9
        answer = b * c;
        equation = `□ ÷ ${b} = ${c}`;
        expressionTip = 'even share';
        rawNumbers = [answer, b, c];
        op = '/';
      }
    } else if (streak < 7) {
      // Questions 4-7: Two-step reasoning
      const template = Math.floor(Math.random() * 9);
      if (template === 0) {
        // (a + □) * c = d
        answer = Math.floor(Math.random() * 10) + 2; // 2 to 11
        const a = Math.floor(Math.random() * 12) + 2; // 2 to 13
        const c = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const d = (a + answer) * c;
        equation = `(${a} + □) × ${c} = ${d}`;
        expressionTip = 'brackets first, then scale';
        rawNumbers = [a, answer, c, d];
        op = '+*';
      } else if (template === 1) {
        // (□ + a) * c = d
        answer = Math.floor(Math.random() * 10) + 2; // 2 to 11
        const a = Math.floor(Math.random() * 12) + 2; // 2 to 13
        const c = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const d = (answer + a) * c;
        equation = `(□ + ${a}) × ${c} = ${d}`;
        expressionTip = 'brackets first, then scale';
        rawNumbers = [answer, a, c, d];
        op = '+*';
      } else if (template === 2) {
        // (a - □) * c = d
        answer = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const a = answer + Math.floor(Math.random() * 10) + 2; // ensures a > answer
        const c = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const d = (a - answer) * c;
        equation = `(${a} − □) × ${c} = ${d}`;
        expressionTip = 'slicing inside brackets';
        rawNumbers = [a, answer, c, d];
        op = '-*';
      } else if (template === 3) {
        // (□ - b) * c = d
        const b = Math.floor(Math.random() * 10) + 2;
        answer = b + Math.floor(Math.random() * 8) + 2; // ensures answer > b
        const c = Math.floor(Math.random() * 5) + 2;
        const d = (answer - b) * c;
        equation = `(□ − ${b}) × ${c} = ${d}`;
        expressionTip = 'slicing inside brackets';
        rawNumbers = [answer, b, c, d];
        op = '-*';
      } else if (template === 4) {
        // (a + b) / □ = c
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const c = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const sum = answer * c;
        const a = Math.floor(Math.random() * (sum - 3)) + 2;
        const b = sum - a;
        equation = `(${a} + ${b}) ÷ □ = ${c}`;
        expressionTip = 'sum then share';
        rawNumbers = [a, b, answer, c];
        op = '+/';
      } else if (template === 5) {
        // (a + b) * □ = d
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const a = Math.floor(Math.random() * 8) + 2;
        const b = Math.floor(Math.random() * 8) + 2;
        const d = (a + b) * answer;
        equation = `(${a} + ${b}) × □ = ${d}`;
        expressionTip = 'combine then scale';
        rawNumbers = [a, b, answer, d];
        op = '+*';
      } else if (template === 6) {
        // (a - b) * □ = d
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const b = Math.floor(Math.random() * 8) + 2;
        const diff = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const a = b + diff;
        const d = diff * answer;
        equation = `(${a} − ${b}) × □ = ${d}`;
        expressionTip = 'subtract then scale';
        rawNumbers = [a, b, answer, d];
        op = '-*';
      } else if (template === 7) {
        // (a / b) + □ = d
        answer = Math.floor(Math.random() * 12) + 2; // 2 to 13
        const b = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const quotient = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const a = b * quotient;
        const d = quotient + answer;
        equation = `(${a} ÷ ${b}) + □ = ${d}`;
        expressionTip = 'share then balance';
        rawNumbers = [a, b, answer, d];
        op = '/+';
      } else {
        // □ * c - d = e
        answer = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const c = Math.floor(Math.random() * 6) + 3; // 3 to 8
        const prod = answer * c;
        const d = Math.floor(Math.random() * (prod - 4)) + 2; // ensures prod > d
        const e = prod - d;
        equation = `□ × ${c} − ${d} = ${e}`;
        expressionTip = 'multiply then balance';
        rawNumbers = [answer, c, d, e];
        op = '*-';
      }
    } else {
      // Questions 8-10 (and above): Three-step reasoning using brackets and multiple operations
      const template = Math.floor(Math.random() * 6);
      if (template === 0) {
        // ((a + □) * c) - d = e
        answer = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const c = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const prod = (a + answer) * c;
        const d = Math.floor(Math.random() * 15) + 5;
        const e = prod - d;
        equation = `((${a} + □) × ${c}) − ${d} = ${e}`;
        expressionTip = 'nesting arithmetic';
        rawNumbers = [a, answer, c, d, e];
        op = '+*-';
      } else if (template === 1) {
        // ((□ - a) * b) + c = d
        answer = Math.floor(Math.random() * 8) + 8; // 8 to 15
        const a = Math.floor(Math.random() * 6) + 2; // 2 to 7 (a < answer)
        const b = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const prod = (answer - a) * b;
        const c = Math.floor(Math.random() * 15) + 5;
        const d = prod + c;
        equation = `((□ − ${a}) × ${b}) + ${c} = ${d}`;
        expressionTip = 'nesting arithmetic';
        rawNumbers = [answer, a, b, c, d];
        op = '-*+';
      } else if (template === 2) {
        // (a * b) - (c * □) = d
        answer = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const c = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const sub = c * answer;
        const d = Math.floor(Math.random() * 20) + 5;
        const prod = sub + d;
        equation = `${prod} − (${c} × □) = ${d}`;
        expressionTip = 'solve both wings';
        rawNumbers = [prod, c, answer, d];
        op = '-*';
      } else if (template === 3) {
        // (a * □) + (b / c) = d
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const c = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const quotient = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const b = c * quotient;
        const d = (a * answer) + quotient;
        equation = `(${a} × □) + (${b} ÷ ${c}) = ${d}`;
        expressionTip = 'split logic wings';
        rawNumbers = [a, answer, b, c, d];
        op = '*+/';
      } else if (template === 4) {
        // ((a + b) / □) + c = d
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const quotient = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const sum = answer * quotient;
        const a = Math.floor(Math.random() * (sum - 3)) + 2;
        const b = sum - a;
        const c = Math.floor(Math.random() * 10) + 3;
        const d = quotient + c;
        equation = `((${a} + ${b}) ÷ □) + ${c} = ${d}`;
        expressionTip = 'deep structure logic';
        rawNumbers = [a, b, answer, c, d];
        op = '+/+';
      } else {
        // ((a - b) * □) - c = d
        answer = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const b = Math.floor(Math.random() * 8) + 2;
        const diff = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const a = b + diff;
        const c = Math.floor(Math.random() * 10) + 3;
        const d = (diff * answer) - c;
        equation = `((${a} − ${b}) × □) − ${c} = ${d}`;
        expressionTip = 'subtract, scale then balance';
        rawNumbers = [a, b, answer, c, d];
        op = '-*-';
      }
    }

    // Generate 4 unique multiple choice options for Momo
    const optionsSet = new Set<number>([answer]);
    while (optionsSet.size < 4) {
      const offsetType = Math.random() > 0.5 ? 1 : -1;
      const offset = (Math.floor(Math.random() * 4) + 1) * offsetType;
      const option = answer + offset;
      if (option > 0) {
        optionsSet.add(option);
      }
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      equation,
      options,
      answer,
      expressionTip,
      rawNumbers,
      operator: op
    };
  }

  if (animalId === 'sly') {
    let equation = '';
    let answer = 0;
    let expressionTip = '';
    let rawNumbers: number[] = [];
    let op = '';

    if (streak < 3) {
      // Questions 1-3: Simple arithmetic sequences
      const template = Math.floor(Math.random() * 3);
      if (template === 0) {
        // Increasing Arithmetic
        const a = Math.floor(Math.random() * 15) + 2; // 2 to 16
        const d = Math.floor(Math.random() * 8) + 2;  // 2 to 9
        equation = `${a}  ➔  ${a + d}  ➔  ${a + 2 * d}  ➔  ${a + 3 * d}  ➔  ?`;
        answer = a + 4 * d;
        expressionTip = 'constant increase';
        rawNumbers = [a, d];
        op = '+';
      } else if (template === 1) {
        // Decreasing Arithmetic
        const d = Math.floor(Math.random() * 6) + 2;  // 2 to 7
        answer = Math.floor(Math.random() * 10) + 2;  // 2 to 11
        const a = answer + 4 * d;
        equation = `${a}  ➔  ${a - d}  ➔  ${a - 2 * d}  ➔  ${a - 3 * d}  ➔  ?`;
        expressionTip = 'constant decrease';
        rawNumbers = [a, d];
        op = '-';
      } else {
        // Missing Number Middle
        const a = Math.floor(Math.random() * 15) + 2; // 2 to 16
        const d = Math.floor(Math.random() * 8) + 2;  // 2 to 9
        equation = `${a}  ➔  ${a + d}  ➔  ?  ➔  ${a + 3 * d}  ➔  ${a + 4 * d}`;
        answer = a + 2 * d;
        expressionTip = 'find the missing step';
        rawNumbers = [a, d];
        op = '+';
      }
    } else if (streak < 7) {
      // Questions 4-7: Multiplication, alternating sequences, increasing intervals
      const template = Math.floor(Math.random() * 5);
      if (template === 0) {
        // Geometric Sequence (Multiplication)
        const a = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const r = Math.floor(Math.random() * 2) + 2; // 2 to 3
        equation = `${a}  ➔  ${a * r}  ➔  ${a * r * r}  ➔  ${a * r * r * r}  ➔  ?`;
        answer = a * r * r * r * r;
        expressionTip = 'multiplying sequence';
        rawNumbers = [a, r];
        op = '*';
      } else if (template === 1) {
        // Increasing Differences
        const a = Math.floor(Math.random() * 10) + 2; // 2 to 11
        const d = Math.floor(Math.random() * 3) + 2;  // 2 to 4
        const k = Math.floor(Math.random() * 2) + 1;  // 1 to 2
        const v0 = a;
        const v1 = v0 + d;
        const v2 = v1 + d + k;
        const v3 = v2 + d + 2 * k;
        const v4 = v3 + d + 3 * k;
        equation = `${v0}  ➔  ${v1}  ➔  ${v2}  ➔  ${v3}  ➔  ${v4}  ➔  ?`;
        answer = v4 + d + 4 * k;
        expressionTip = 'growing differences';
        rawNumbers = [a, d, k];
        op = '+';
      } else if (template === 2) {
        // Alternating Sequences
        const a = Math.floor(Math.random() * 8) + 2;   // 2 to 9
        const b = Math.floor(Math.random() * 15) + 15; // 15 to 29
        const d = Math.floor(Math.random() * 4) + 2;   // 2 to 5
        const x0 = a;
        const x1 = b;
        const x2 = a + d;
        const x3 = b - d;
        const x4 = a + 2 * d;
        const x5 = b - 2 * d;
        equation = `${x0}  ➔  ${x1}  ➔  ${x2}  ➔  ${x3}  ➔  ${x4}  ➔  ${x5}  ➔  ?`;
        answer = a + 3 * d;
        expressionTip = 'interwoven sequences';
        rawNumbers = [a, b, d];
        op = '+-';
      } else if (template === 3) {
        // Square Numbers
        const s = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const v0 = s * s;
        const v1 = (s + 1) * (s + 1);
        const v2 = (s + 2) * (s + 2);
        const v3 = (s + 3) * (s + 3);
        equation = `${v0}  ➔  ${v1}  ➔  ${v2}  ➔  ${v3}  ➔  ?`;
        answer = (s + 4) * (s + 4);
        expressionTip = 'perfect squares';
        rawNumbers = [s];
        op = '^2';
      } else {
        // Triangular Numbers
        const s = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const T = (n: number) => (n * (n + 1)) / 2;
        const v0 = T(s);
        const v1 = T(s + 1);
        const v2 = T(s + 2);
        const v3 = T(s + 3);
        const v4 = T(s + 4);
        equation = `${v0}  ➔  ${v1}  ➔  ${v2}  ➔  ${v3}  ➔  ${v4}  ➔  ?`;
        answer = T(s + 5);
        expressionTip = 'triangular numbers';
        rawNumbers = [s];
        op = '+n';
      }
    } else {
      // Questions 8-10: More complex reasoning
      const template = Math.floor(Math.random() * 4);
      if (template === 0) {
        // Odd One Out
        const oddType = Math.floor(Math.random() * 3);
        if (oddType === 0) {
          // Squares
          const s = Math.floor(Math.random() * 3) + 3; // 3 to 5
          const sqs = [s * s, (s + 1) * (s + 1), (s + 2) * (s + 2), (s + 4) * (s + 4)];
          const intruder = (s + 3) * (s + 3) + (Math.random() > 0.5 ? 2 : -2);
          const all = [...sqs, intruder].sort((x, y) => x - y);
          equation = `Which number does NOT belong?\n${all.join('  ,  ')}`;
          answer = intruder;
          expressionTip = 'spot the non-square';
          rawNumbers = sqs;
          op = 'odd';
        } else if (oddType === 1) {
          // Multiples
          const p = Math.floor(Math.random() * 4) + 6; // 6 to 9
          const mults = [2 * p, 3 * p, 4 * p, 5 * p];
          const intruder = 4 * p + (Math.random() > 0.5 ? 3 : -3);
          const all = [...mults, intruder].sort((x, y) => x - y);
          equation = `Which number does NOT belong?\n${all.join('  ,  ')}`;
          answer = intruder;
          expressionTip = 'spot the non-multiple';
          rawNumbers = mults;
          op = 'odd';
        } else {
          // Primes
          const primes = [5, 7, 11, 13, 17, 19, 23, 29];
          // Pick 4 unique primes
          const shuffledPrimes = [...primes].sort(() => Math.random() - 0.5);
          const pickedPrimes = shuffledPrimes.slice(0, 4);
          const intruder = Math.random() > 0.5 ? 15 : 21;
          const all = [...pickedPrimes, intruder].sort((x, y) => x - y);
          equation = `Which number does NOT belong?\n${all.join('  ,  ')}`;
          answer = intruder;
          expressionTip = 'spot the composite number';
          rawNumbers = pickedPrimes;
          op = 'odd';
        }
      } else if (template === 1) {
        // Fibonacci Sequence
        const a = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const b = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const x0 = a;
        const x1 = b;
        const x2 = a + b;
        const x3 = b + x2;
        equation = `${x0}  ➔  ${x1}  ➔  ${x2}  ➔  ${x3}  ➔  ?`;
        answer = x2 + x3;
        expressionTip = 'add previous two numbers';
        rawNumbers = [a, b];
        op = 'fib';
      } else if (template === 2) {
        // Geometric + Arithmetic Mixed (Scale and Shift)
        const a = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const c = Math.floor(Math.random() * 3) + 1; // 1 to 3
        const x0 = a;
        const x1 = x0 * 2 + c;
        const x2 = x1 * 2 + c;
        equation = `${x0}  ➔  ${x1}  ➔  ${x2}  ➔  ?`;
        answer = x2 * 2 + c;
        expressionTip = 'times 2, plus constant';
        rawNumbers = [a, c];
        op = '*2+c';
      } else {
        // Interlocking Complex
        const a = Math.floor(Math.random() * 3) + 2;   // 2 to 4
        const b = Math.floor(Math.random() * 11) + 10; // 10 to 20
        const d = Math.floor(Math.random() * 4) + 2;   // 2 to 5
        const x0 = a;
        const x1 = b;
        const x2 = a * 2;
        const x3 = b + d;
        const x4 = a * 4;
        const x5 = b + 2 * d;
        equation = `${x0}  ➔  ${x1}  ➔  ${x2}  ➔  ${x3}  ➔  ${x4}  ➔  ${x5}  ➔  ?`;
        answer = a * 8;
        expressionTip = 'interwoven sequences';
        rawNumbers = [a, b, d];
        op = '*+';
      }
    }

    // Generate 4 unique multiple choice options for Sly
    const optionsSet = new Set<number>([answer]);
    while (optionsSet.size < 4) {
      const offsetType = Math.random() > 0.5 ? 1 : -1;
      let offset = 1;
      if (answer > 50) {
        offset = (Math.floor(Math.random() * 15) + 1) * offsetType;
      } else if (answer > 20) {
        offset = (Math.floor(Math.random() * 8) + 1) * offsetType;
      } else {
        offset = (Math.floor(Math.random() * 4) + 1) * offsetType;
      }
      const option = answer + offset;
      if (option > 0 && option !== answer) {
        optionsSet.add(option);
      }
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      equation,
      options,
      answer,
      expressionTip,
      rawNumbers,
      operator: op
    };
  }

  if (animalId === 'bo') {
    let equation = '';
    let answer = 0;
    let expressionTip = '';
    let rawNumbers: number[] = [];
    let op = '';

    if (streak < 3) {
      // Questions 1-3: Easy mixed operations / simple three-number arithmetic
      const template = Math.floor(Math.random() * 3);
      if (template === 0) {
        // a * b + c or a * b - c (small values)
        const a = Math.floor(Math.random() * 5) + 3; // 3 to 7
        const b = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const isSub = Math.random() > 0.5;
        if (isSub) {
          const c = Math.floor(Math.random() * (a * b - 2)) + 1;
          answer = a * b - c;
          equation = `${a} × ${b} − ${c}`;
          expressionTip = 'multiply first, then subtract';
          rawNumbers = [a, b, c];
          op = '*-';
        } else {
          const c = Math.floor(Math.random() * 10) + 1;
          answer = a * b + c;
          equation = `${a} × ${b} + ${c}`;
          expressionTip = 'multiply first, then add';
          rawNumbers = [a, b, c];
          op = '*+';
        }
      } else if (template === 1) {
        // a / b + c or a / b - c (small values)
        const b = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const q = Math.floor(Math.random() * 5) + 2; // 2 to 6
        const a = b * q;
        const isSub = Math.random() > 0.5 && q > 2;
        if (isSub) {
          const c = Math.floor(Math.random() * (q - 1)) + 1;
          answer = q - c;
          equation = `${a} ÷ ${b} − ${c}`;
          expressionTip = 'divide first, then subtract';
          rawNumbers = [a, b, c];
          op = '/-';
        } else {
          const c = Math.floor(Math.random() * 10) + 1;
          answer = q + c;
          equation = `${a} ÷ ${b} + ${c}`;
          expressionTip = 'divide first, then add';
          rawNumbers = [a, b, c];
          op = '/+';
        }
      } else {
        // a - b + c or a + b - c
        const a = Math.floor(Math.random() * 30) + 10; // 10 to 39
        const b = Math.floor(Math.random() * 9) + 5;   // 5 to 13
        const c = Math.floor(Math.random() * 15) + 5;  // 5 to 19
        const isSubFirst = Math.random() > 0.5;
        if (isSubFirst) {
          answer = a - b + c;
          equation = `${a} − ${b} + ${c}`;
          expressionTip = 'subtract, then add';
          rawNumbers = [a, b, c];
          op = '-+';
        } else {
          answer = a + b - c;
          equation = `${a} + ${b} − ${c}`;
          expressionTip = 'add, then subtract';
          rawNumbers = [a, b, c];
          op = '+-';
        }
      }
    } else if (streak < 7) {
      // Questions 4-7: Moderate mixed operations
      const template = Math.floor(Math.random() * 3);
      if (template === 0) {
        // a * b + c or a * b - c (medium values)
        const a = Math.floor(Math.random() * 6) + 6; // 6 to 11
        const b = Math.floor(Math.random() * 5) + 4; // 4 to 8
        const isSub = Math.random() > 0.5;
        if (isSub) {
          const c = Math.floor(Math.random() * 20) + 5;
          answer = a * b - c;
          equation = `${a} × ${b} − ${c}`;
          expressionTip = 'multiply first, then subtract';
          rawNumbers = [a, b, c];
          op = '*-';
        } else {
          const c = Math.floor(Math.random() * 25) + 5;
          answer = a * b + c;
          equation = `${a} × ${b} + ${c}`;
          expressionTip = 'multiply first, then add';
          rawNumbers = [a, b, c];
          op = '*+';
        }
      } else if (template === 1) {
        // (a + b) / c or (a - b) * c
        const isDiv = Math.random() > 0.5;
        if (isDiv) {
          const c = Math.floor(Math.random() * 5) + 3; // 3 to 7
          const q = Math.floor(Math.random() * 6) + 3; // 3 to 8
          const sum = c * q;
          const a = Math.floor(Math.random() * (sum - 4)) + 2;
          const b = sum - a;
          answer = q;
          equation = `(${a} + ${b}) ÷ ${c}`;
          expressionTip = 'add inside brackets, then divide';
          rawNumbers = [a, b, c];
          op = '+/';
        } else {
          const diff = Math.floor(Math.random() * 5) + 2; // 2 to 6
          const b = Math.floor(Math.random() * 15) + 5;
          const a = b + diff;
          const c = Math.floor(Math.random() * 5) + 4; // 4 to 8
          answer = diff * c;
          equation = `(${a} − ${b}) × ${c}`;
          expressionTip = 'subtract inside brackets, then multiply';
          rawNumbers = [a, b, c];
          op = '-*';
        }
      } else {
        // a / b + c or a / b - c (medium values)
        const b = Math.floor(Math.random() * 5) + 3; // divisor: 3 to 7
        const q = Math.floor(Math.random() * 8) + 4; // quotient: 4 to 11
        const a = b * q;
        const isSub = Math.random() > 0.5 && q > 5;
        if (isSub) {
          const c = Math.floor(Math.random() * 5) + 2;
          answer = q - c;
          equation = `${a} ÷ ${b} − ${c}`;
          expressionTip = 'divide first, then subtract';
          rawNumbers = [a, b, c];
          op = '/-';
        } else {
          const c = Math.floor(Math.random() * 15) + 5;
          answer = q + c;
          equation = `${a} ÷ ${b} + ${c}`;
          expressionTip = 'divide first, then add';
          rawNumbers = [a, b, c];
          op = '/+';
        }
      }
    } else {
      // Questions 8-10+: Complex mixed operations with larger values
      const template = Math.floor(Math.random() * 4);
      if (template === 0) {
        // a * b - c (two digit multiplication)
        const a = Math.floor(Math.random() * 8) + 12; // 12 to 19
        const b = Math.floor(Math.random() * 5) + 8;  // 8 to 12
        const c = Math.floor(Math.random() * 30) + 15; // 15 to 44
        answer = a * b - c;
        equation = `${a} × ${b} − ${c}`;
        expressionTip = 'two-digit scaling, then subtract';
        rawNumbers = [a, b, c];
        op = '*-';
      } else if (template === 1) {
        // a * b - c (another larger format)
        const a = Math.floor(Math.random() * 15) + 35; // 35 to 49
        const b = 2; // double
        const c = Math.floor(Math.random() * 20) + 20; // 20 to 39
        answer = a * b - c;
        equation = `${a} × ${b} − ${c}`;
        expressionTip = 'double it first, then subtract';
        rawNumbers = [a, b, c];
        op = '*-';
      } else if (template === 2) {
        // a / b + c with larger numbers, e.g. 125 ÷ 5 + 27
        const b = Math.floor(Math.random() * 4) + 4; // divisor: 4 to 7
        const q = Math.floor(Math.random() * 11) + 15; // quotient: 15 to 25
        const a = b * q;
        const c = Math.floor(Math.random() * 20) + 15; // 15 to 34
        answer = q + c;
        equation = `${a} ÷ ${b} + ${c}`;
        expressionTip = 'divide first, then add';
        rawNumbers = [a, b, c];
        op = '/+';
      } else {
        // a * b - c (another format like 15 × 12 - 45)
        const a = Math.floor(Math.random() * 6) + 11; // 11 to 16
        const b = Math.floor(Math.random() * 5) + 10; // 10 to 14
        const c = Math.floor(Math.random() * 25) + 25; // 25 to 49
        answer = a * b - c;
        equation = `${a} × ${b} − ${c}`;
        expressionTip = 'scale then subtract';
        rawNumbers = [a, b, c];
        op = '*-';
      }
    }

    // Generate 4 unique multiple choice options for Bo
    const optionsSet = new Set<number>([answer]);
    while (optionsSet.size < 4) {
      const offsetType = Math.random() > 0.5 ? 1 : -1;
      let offset = 1;
      if (answer > 100) {
        offset = (Math.floor(Math.random() * 20) + 5) * offsetType;
      } else if (answer > 40) {
        offset = (Math.floor(Math.random() * 10) + 2) * offsetType;
      } else {
        offset = (Math.floor(Math.random() * 5) + 1) * offsetType;
      }

      // Add a digit swap decoy if answer is 2-digit or more
      if (Math.random() > 0.6 && answer > 12) {
        const s = answer.toString();
        if (s.length === 2 && s[0] !== s[1]) {
          const reversed = parseInt(s[1] + s[0], 10);
          if (!isNaN(reversed) && reversed !== answer && reversed > 0) {
            optionsSet.add(reversed);
            continue;
          }
        } else if (s.length === 3) {
          // Swap last two digits or first two
          const r1 = parseInt(s[0] + s[2] + s[1], 10);
          const r2 = parseInt(s[1] + s[0] + s[2], 10);
          const revOption = Math.random() > 0.5 ? r1 : r2;
          if (!isNaN(revOption) && revOption !== answer && revOption > 0) {
            optionsSet.add(revOption);
            continue;
          }
        }
      }

      const option = answer + offset;
      if (option > 0 && option !== answer) {
        optionsSet.add(option);
      }
    }

    const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

    return {
      equation,
      options,
      answer,
      expressionTip,
      rawNumbers,
      operator: op
    };
  }

  if (animalId === 'nori') {
    let equation = '';
    let answer: number | string = 0;
    let expressionTip = '';
    let rawNumbers: number[] = [];
    let op = '';
    let options: (number | string)[] = [];

    if (streak < 3) {
      // Questions 1-3: Simple visual reasoning
      const template = Math.floor(Math.random() * 3);
      if (template === 0) {
        // Shape substitution / simple arithmetic
        const shapes = ['○', '□', '△', '🌟', '🍀'];
        // pick two unique shapes
        const sh1 = shapes[Math.floor(Math.random() * shapes.length)];
        let sh2 = shapes[Math.floor(Math.random() * shapes.length)];
        while (sh1 === sh2) {
          sh2 = shapes[Math.floor(Math.random() * shapes.length)];
        }
        const val1 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const val2 = Math.floor(Math.random() * 8) + 2; // 2 to 9
        
        const style = Math.floor(Math.random() * 3);
        if (style === 0) {
          equation = `${sh1} = ${val1}\n${sh2} = ${val2}\n${sh1} + ${sh2} + ${sh1} = ?`;
          answer = val1 + val2 + val1;
          expressionTip = 'shape substitution';
        } else if (style === 1) {
          equation = `${sh1} = ${val1}\n${sh2} = ${val2}\n${sh1} + ${sh1} + ${sh2} = ?`;
          answer = val1 * 2 + val2;
          expressionTip = 'shape combination';
        } else {
          equation = `${sh1} = ${val1}\n${sh2} = ${val2}\n${sh1} × ${sh2} = ?`;
          answer = val1 * val2;
          expressionTip = 'shape product';
        }
        
        rawNumbers = [val1, val2];
        op = 'shape';

        // Generate options
        const optsSet = new Set<number>([answer as number]);
        while (optsSet.size < 4) {
          const decoy = (answer as number) + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else if (template === 1) {
        // Simple Block Fraction shading (e.g. 2/4, 3/5, etc.)
        const total = Math.random() > 0.5 ? 4 : 5;
        const shaded = Math.floor(Math.random() * (total - 1)) + 1; // 1 to total-1
        
        const blocks = '🟦'.repeat(shaded) + '⬜'.repeat(total - shaded);
        equation = `${blocks}\nWhat fraction is shaded?`;
        answer = `${shaded}/${total}`;
        expressionTip = 'shaded ratio';
        rawNumbers = [shaded, total];
        op = 'fraction';

        const optsSet = new Set<string>([answer]);
        for (let t = 1; t <= total; t++) {
          optsSet.add(`${t}/${total}`);
        }
        while (optsSet.size < 4) {
          const decoyShaded = Math.floor(Math.random() * total) + 1;
          optsSet.add(`${decoyShaded}/${total}`);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else {
        // Simple pattern completion
        const patterns = [
          { seq: '⬆️  ➔  ➡️  ➔  ⬇️  ➔  ?', ans: '⬅️', decs: ['⬆️', '⬇️', '➡️'], tip: 'clockwise rotation' },
          { seq: '⬆️  ➔  ⬅️  ➔  ⬇️  ➔  ?', ans: '➡️', decs: ['⬆️', '⬇️', '⬅️'], tip: 'counterclockwise rotation' },
          { seq: '🌑  ➔  🌓  ➔  🌕  ➔  ?', ans: '🌓', decs: ['🌑', '🌕', '🌘'], tip: 'waxing and waning' },
          { seq: '🌱  ➔  🌿  ➔  🌳  ➔  ?', ans: '🍎', decs: ['🌱', '🍂', '🌵'], tip: 'plant growth cycle' }
        ];
        const p = patterns[Math.floor(Math.random() * patterns.length)];
        equation = `${p.seq}\nWhich figure completes the pattern?`;
        answer = p.ans;
        expressionTip = p.tip;
        rawNumbers = [];
        op = 'pattern';

        const optsSet = new Set<string>([p.ans, ...p.decs]);
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);
      }

    } else if (streak < 7) {
      // Questions 4-7: Visual arithmetic and number relationships
      const template = Math.floor(Math.random() * 3);
      if (template === 0) {
        // Number grid logic (Row pattern difference)
        const a = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const k = Math.floor(Math.random() * 6) + 2; // 2 to 7
        const b = a + Math.floor(Math.random() * 6) + 2; // ensure b > a
        
        equation = `[  ${a}  ]   [  ${a + k}  ]\n[  ${b}  ]   [  ?  ]\nFind the missing number using the pattern.`;
        answer = b + k;
        expressionTip = `increase by ${k}`;
        rawNumbers = [a, k, b];
        op = 'grid';

        const optsSet = new Set<number>([answer]);
        while (optsSet.size < 4) {
          const decoy = answer + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else if (template === 1) {
        // Visual Block Scales / Balanced Scales
        const v1 = Math.floor(Math.random() * 5) + 3; // 3 to 7
        const v2 = v1 + Math.floor(Math.random() * 5) + 2; // ensure v2 > v1 (e.g. 5 to 14)
        
        equation = `● + ● = ${2 * v1}\n◆ + ● = ${v2}\n◆ = ?`;
        answer = v2 - v1;
        expressionTip = 'balance the scales';
        rawNumbers = [v1, v2];
        op = 'scales';

        const optsSet = new Set<number>([answer]);
        while (optsSet.size < 4) {
          const decoy = answer + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else {
        // Simple logic pyramid (sum of bottom blocks)
        const x = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const y = Math.floor(Math.random() * 8) + 2; // 2 to 9
        const style = Math.floor(Math.random() * 3);
        
        if (style === 0) {
          // Top is hidden
          equation = `      [  ?  ]\n   [  ${x}  ]   [  ${y}  ]\nEach block is the sum of the two below it.`;
          answer = x + y;
          expressionTip = 'add bottom elements';
        } else if (style === 1) {
          // Left is hidden
          equation = `      [  ${x + y}  ]\n   [  ?  ]   [  ${y}  ]\nEach block is the sum of the two below it.`;
          answer = x;
          expressionTip = 'subtract right from top';
        } else {
          // Right is hidden
          equation = `      [  ${x + y}  ]\n   [  ${x}  ]   [  ?  ]\nEach block is the sum of the two below it.`;
          answer = y;
          expressionTip = 'subtract left from top';
        }
        
        rawNumbers = [x, y];
        op = 'pyramid';

        const optsSet = new Set<number>([answer]);
        while (optsSet.size < 4) {
          const decoy = answer + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);
      }

    } else {
      // Questions 8-10: More challenging logic diagrams, fractions and pattern recognition
      const template = Math.floor(Math.random() * 4);
      if (template === 0) {
        // Three-Tier Pyramid
        const a = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const b = Math.floor(Math.random() * 4) + 2; // 2 to 5
        const c = Math.floor(Math.random() * 4) + 2; // 2 to 5
        
        const midLeft = a + b;
        const midRight = b + c;
        const top = midLeft + midRight;
        
        equation = `              [  ?  ]\n           [  ${midLeft}  ]   [  ${midRight}  ]\n        [  ${a}  ]   [  ${b}  ]   [  ${c}  ]\nEach block is the sum of the two below it.`;
        answer = top;
        expressionTip = 'sum of middle row';
        rawNumbers = [a, b, c];
        op = '3pyramid';

        const optsSet = new Set<number>([answer]);
        while (optsSet.size < 4) {
          const decoy = answer + (Math.floor(Math.random() * 6) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else if (template === 1) {
        // 3x3 Shaded Grid fraction
        const shaded = Math.floor(Math.random() * 5) + 3; // 3 to 7 shaded
        let cellCount = 0;
        let rows = ['', '', ''];
        for (let r = 0; r < 3; r++) {
          for (let c = 0; c < 3; c++) {
            if (cellCount < shaded) {
              rows[r] += '🟦';
            } else {
              rows[r] += '⬜';
            }
            cellCount++;
          }
        }
        const allCells = (rows.join('')).match(/../g) || [];
        const shuffledCells = allCells.sort(() => Math.random() - 0.5);
        equation = `${shuffledCells.slice(0,3).join('')}\n${shuffledCells.slice(3,6).join('')}\n${shuffledCells.slice(6,9).join('')}\nWhat fraction of the 3x3 grid is shaded?`;
        answer = `${shaded}/9`;
        expressionTip = 'shaded out of 9 total';
        rawNumbers = [shaded, 9];
        op = 'grid-fraction';

        const optsSet = new Set<string>([answer]);
        for (let t = 2; t <= 8; t++) {
          optsSet.add(`${t}/9`);
        }
        while (optsSet.size < 4) {
          const decoyShaded = Math.floor(Math.random() * 8) + 1;
          optsSet.add(`${decoyShaded}/9`);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else if (template === 2) {
        // Magic matrix / In-Grid Logic
        const a = Math.floor(Math.random() * 3) + 2; // 2 to 4
        const b = a + Math.floor(Math.random() * 3) + 1; // e.g. 3 to 7
        const c = b + Math.floor(Math.random() * 3) + 1; // e.g. 4 to 10
        
        equation = `[  ${a}  ]   [  ${a*2}  ]   [  ${a*3}  ]\n[  ${b}  ]   [  ${b*2}  ]   [  ${b*3}  ]\n[  ${c}  ]   [  ${c*2}  ]   [  ?  ]\nComplete the visual pattern in the matrix.`;
        answer = c * 3;
        expressionTip = 'multiply bottom row';
        rawNumbers = [a, b, c];
        op = 'matrix';

        const optsSet = new Set<number>([answer]);
        while (optsSet.size < 4) {
          const decoy = answer + (Math.floor(Math.random() * 6) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);

      } else {
        // Multi-symbol equations (System of equations)
        const v1 = Math.floor(Math.random() * 4) + 3; // 3 to 6
        const v2 = v1 + Math.floor(Math.random() * 4) + 2; // 5 to 12
        const v3 = v2 + Math.floor(Math.random() * 4) + 2; // 7 to 18
        
        const star = v1;
        const tri = v2 - v1;
        const box = v3 - tri;
        
        equation = `★ + ★ = ${2 * star}\n▲ + ★ = ${v2}\n▲ + ◼ = ${v3}\n◼ = ?`;
        answer = box;
        expressionTip = 'solve step by step';
        rawNumbers = [star, tri, box];
        op = 'system';

        const optsSet = new Set<number>([answer]);
        while (optsSet.size < 4) {
          const decoy = answer + (Math.floor(Math.random() * 4) + 1) * (Math.random() > 0.5 ? 1 : -1);
          if (decoy > 0) optsSet.add(decoy);
        }
        options = Array.from(optsSet).sort(() => Math.random() - 0.5);
      }
    }

    return {
      equation,
      options,
      answer,
      expressionTip,
      rawNumbers,
      operator: op
    };
  }

  const maxVal = Math.min(10 + Math.floor(level * 3 * difficultyScale), 100);
  const minVal = Math.max(1, Math.floor(level * difficultyScale));

  // Choose a random operator from the animal's set
  const op = operators[Math.floor(Math.random() * operators.length)];
  
  let num1 = 0;
  let num2 = 0;
  let answer = 0;
  let equation = '';
  let expressionTip = '';

  switch (op) {
    case '+':
      num1 = Math.floor(Math.random() * (maxVal - minVal + 1)) + minVal;
      num2 = Math.floor(Math.random() * (maxVal * 0.8)) + 1;
      answer = num1 + num2;
      equation = `${num1} + ${num2}`;
      expressionTip = 'combining forces';
      break;
    case '-':
      num1 = Math.floor(Math.random() * (maxVal * 1.2)) + 5;
      num2 = Math.floor(Math.random() * (num1 - 1)) + 1; // ensure positive results
      answer = num1 - num2;
      equation = `${num1} - ${num2}`;
      expressionTip = 'slicing values';
      break;
    case '*':
      // Keep multiplication operands within reasonable human-friendly limits
      const multiMax = Math.min(8 + Math.floor(level * 1.5), 15);
      num1 = Math.floor(Math.random() * (multiMax - 2 + 1)) + 2;
      num2 = Math.floor(Math.random() * (multiMax - 2 + 1)) + 2;
      answer = num1 * num2;
      equation = `${num1} × ${num2}`;
      expressionTip = 'growth arrays';
      break;
    case '/':
      // Ensure integer division
      const divMax = Math.min(9 + Math.floor(level * 1.5), 14);
      num2 = Math.floor(Math.random() * (divMax - 2 + 1)) + 2; // divisor
      answer = Math.floor(Math.random() * 10) + 2; // quotient
      num1 = num2 * answer; // dividend
      equation = `${num1} ÷ ${num2}`;
      expressionTip = 'even portions';
      break;
  }

  // Generate 4 unique multiple choice options
  const optionsSet = new Set<number>([answer]);
  while (optionsSet.size < 4) {
    // Generate decoy options close to original answer
    const offsetType = Math.random() > 0.5 ? 1 : -1;
    let offset = (Math.floor(Math.random() * 5) + 1) * offsetType;
    
    // Sometimes swap digits if answer is 2 digits or more
    if (Math.random() > 0.7 && answer > 12) {
      const s = answer.toString();
      if (s.length === 2 && s[0] !== s[1]) {
        const reversed = parseInt(s[1] + s[0], 10);
        if (!isNaN(reversed) && reversed !== answer) {
          optionsSet.add(reversed);
          continue;
        }
      }
    }

    // Typical offsets
    if (op === '*' || op === '/') {
      // multiplicative decoys or off-by-divisor
      offset = (Math.floor(Math.random() * 3) + 1) * num2 * offsetType;
      // if result is close, fall back to normal offset
      if (Math.abs(offset) > 25 || offset === 0) {
        offset = (Math.floor(Math.random() * 6) + 1) * offsetType;
      }
    }
    
    const option = answer + offset;
    if (option > 0) {
      optionsSet.add(option);
    }
  }

  const options = Array.from(optionsSet).sort(() => Math.random() - 0.5);

  return {
    equation,
    options,
    answer,
    expressionTip,
    rawNumbers: [num1, num2],
    operator: op
  };
}

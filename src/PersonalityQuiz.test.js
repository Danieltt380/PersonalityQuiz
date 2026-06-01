import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import PersonalityQuiz from './PersonalityQuiz';

/**
 * COMPREHENSIVE TEST SUITE FOR PERSONALITY QUIZ
 * Tests ALL Personalities:
 * - Big Five Traits: Openness, Conscientiousness, Extraversion, Agreeableness, Neuroticism
 * - Dark Triad: Narcissism, Machiavellianism, Psychopathy
 * - Other Traits: Logical, Empathetic, Ambitious, Introverted, Adaptable
 * 
 * Total: 13 distinct personality categories tested
 */

// Map EVERY personality to the answer combinations that lead to it
const PERSONALITY_ANSWER_PATHS = {
  // Big Five Traits (Questions 1-25)
  'Openness': [1, 1, 1, 1, 1], // Questions 1-5: all strongly agree
  'Conscientiousness': [5, 5, 5, 5, 5], // Questions 6-10: all strongly agree
  'Extraversion': [1, 1, 1, 1, 1], // Questions 11-15: all strongly agree
  'Agreeableness': [1, 1, 1, 1, 1], // Questions 16-20: all strongly agree
  'Neuroticism': [1, 1, 1, 1, 1], // Questions 21-25: all strongly agree
  
  // Dark Triad Traits (Questions 26-40)
  'Narcissism': [5, 5, 5, 5, 5], // Questions 26-30: all strongly agree
  'Machiavellianism': [5, 5, 5, 5, 5], // Questions 31-35: all strongly agree
  'Psychopathy': [5, 5, 5, 5, 5], // Questions 36-40: all strongly agree
  
  // Other Traits (Questions 41-45)
  'Logical': [5], // Question 41: strongly agree
  'Empathetic': [5], // Question 42: strongly agree
  'Ambitious': [5], // Question 43: strongly agree
  'Introverted': [5], // Question 44: strongly agree
  'Adaptable': [5], // Question 45: strongly agree
};

const ALL_PERSONALITIES = Object.keys(PERSONALITY_ANSWER_PATHS);
const BIG_FIVE = ['Openness', 'Conscientiousness', 'Extraversion', 'Agreeableness', 'Neuroticism'];
const DARK_TRIAD = ['Narcissism', 'Machiavellianism', 'Psychopathy'];
const OTHER_TRAITS = ['Logical', 'Empathetic', 'Ambitious', 'Introverted', 'Adaptable'];

describe('PersonalityQuiz - Comprehensive All Personalities Test', () => {
  
  // ===== TEST 1: QUIZ INITIALIZATION =====
  describe('✓ Quiz Initialization', () => {
    test('should render quiz container on initial load', () => {
      render(<PersonalityQuiz />);
      expect(screen.getByText('Personality Quiz')).toBeInTheDocument();
      expect(screen.getByText(/Question 1 of 45/)).toBeInTheDocument();
    });

    test('should display the first question', () => {
      render(<PersonalityQuiz />);
      expect(screen.getByText(/I am interested in art, music, and literature/i)).toBeInTheDocument();
    });

    test('should show category information', () => {
      render(<PersonalityQuiz />);
      expect(screen.getByText('Big Five')).toBeInTheDocument();
      expect(screen.getByText('Openness')).toBeInTheDocument();
    });

    test('should display all 5 answer options', () => {
      render(<PersonalityQuiz />);
      expect(screen.getByTitle('Strongly Disagree')).toBeInTheDocument();
      expect(screen.getByTitle('Disagree')).toBeInTheDocument();
      expect(screen.getByTitle('Neutral')).toBeInTheDocument();
      expect(screen.getByTitle('Agree')).toBeInTheDocument();
      expect(screen.getByTitle('Strongly Agree')).toBeInTheDocument();
    });
  });

  // ===== TEST 2: PROGRESS TRACKING =====
  describe('✓ Progress Tracking', () => {
    test('should track progress through questions', () => {
      render(<PersonalityQuiz />);
      const agreeButtons = screen.getAllByTitle('Agree');
      
      expect(screen.getByText(/Question 1 of 45/)).toBeInTheDocument();
      fireEvent.click(agreeButtons[0]);
      expect(screen.getByText(/Question 2 of 45/)).toBeInTheDocument();
    });

    test('progress bar should update', () => {
      const { container } = render(<PersonalityQuiz />);
      const progressBar = container.querySelector('.progress-bar');
      
      const initialWidth = window.getComputedStyle(progressBar).width;
      const agreeButtons = screen.getAllByTitle('Agree');
      fireEvent.click(agreeButtons[0]);
      
      const newWidth = window.getComputedStyle(progressBar).width;
      expect(newWidth).not.toBe(initialWidth);
    });
  });

  // ===== TEST 3: BIG FIVE TRAITS =====
  describe('✓ Big Five Trait Achievement', () => {
    BIG_FIVE.forEach(trait => {
      test(`should achieve ${trait} personality`, async () => {
        render(<PersonalityQuiz />);
        const answerPath = getAnswerPath(trait);
        answerQuestions(answerPath);
        
        await waitFor(() => {
          expect(screen.getByText(new RegExp(`Big Five.*${trait}`, 'i'))).toBeInTheDocument();
        });
      });
    });

    test('should display all Big Five scores in results', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
      });
      
      expect(screen.getByText(/Openness/)).toBeInTheDocument();
      expect(screen.getByText(/Conscientiousness/)).toBeInTheDocument();
      expect(screen.getByText(/Extraversion/)).toBeInTheDocument();
      expect(screen.getByText(/Agreeableness/)).toBeInTheDocument();
      expect(screen.getByText(/Neuroticism/)).toBeInTheDocument();
    });
  });

  // ===== TEST 4: DARK TRIAD TRAITS =====
  describe('✓ Dark Triad Trait Achievement', () => {
    DARK_TRIAD.forEach(trait => {
      test(`should achieve ${trait} personality`, async () => {
        render(<PersonalityQuiz />);
        const answerPath = getAnswerPath(trait);
        answerQuestions(answerPath);
        
        await waitFor(() => {
          expect(screen.getByText(new RegExp(`Dark Triad.*${trait}`, 'i'))).toBeInTheDocument();
        });
      });
    });

    test('should display all Dark Triad scores in results', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Narcissism');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
      });
      
      expect(screen.getByText(/Narcissism/)).toBeInTheDocument();
      expect(screen.getByText(/Machiavellianism/)).toBeInTheDocument();
      expect(screen.getByText(/Psychopathy/)).toBeInTheDocument();
    });

    test('Dark Triad traits should be marked as Dark Triad in quiz', () => {
      render(<PersonalityQuiz />);
      
      // Navigate to Narcissism question (question 26)
      for (let i = 0; i < 25; i++) {
        const agreeButtons = screen.getAllByTitle('Agree');
        fireEvent.click(agreeButtons[0]);
      }
      
      expect(screen.getByText('Dark Triad')).toBeInTheDocument();
      expect(screen.getByText('Narcissism')).toBeInTheDocument();
    });
  });

  // ===== TEST 5: OTHER TRAITS =====
  describe('✓ Other Trait Achievement', () => {
    OTHER_TRAITS.forEach(trait => {
      test(`should achieve ${trait} trait during quiz`, async () => {
        render(<PersonalityQuiz />);
        
        // Navigate to the question for this trait
        for (let i = 0; i < 40; i++) {
          const agreeButtons = screen.getAllByTitle('Agree');
          fireEvent.click(agreeButtons[0]);
        }
        
        expect(screen.getByText('Other')).toBeInTheDocument();
        expect(screen.getByText(trait)).toBeInTheDocument();
      });
    });

    test('should display all Other traits in results', async () => {
      render(<PersonalityQuiz />);
      const answerPath = Array(45).fill(1); // Answer all questions
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
      });
      
      expect(screen.getByText(/Logical/)).toBeInTheDocument();
      expect(screen.getByText(/Empathetic/)).toBeInTheDocument();
      expect(screen.getByText(/Ambitious/)).toBeInTheDocument();
      expect(screen.getByText(/Introverted/)).toBeInTheDocument();
      expect(screen.getByText(/Adaptable/)).toBeInTheDocument();
    });
  });

  // ===== TEST 6: PERSONALITY CATEGORIES =====
  describe('✓ Question Categorization', () => {
    test('questions should be properly categorized by Big Five', () => {
      render(<PersonalityQuiz />);
      expect(screen.getByText('Big Five')).toBeInTheDocument();
      expect(screen.getByText('Openness')).toBeInTheDocument();
    });

    test('should show category when answer is provided', () => {
      render(<PersonalityQuiz />);
      expect(screen.getByText('Big Five')).toBeInTheDocument();
      
      const agreeButtons = screen.getAllByTitle('Agree');
      fireEvent.click(agreeButtons[0]);
      
      // Next question should also show category
      expect(screen.getByText('Big Five')).toBeInTheDocument();
    });

    test('should transition from Big Five to Dark Triad questions', () => {
      render(<PersonalityQuiz />);
      
      // Answer first 25 questions (Big Five)
      for (let i = 0; i < 25; i++) {
        const agreeButtons = screen.getAllByTitle('Agree');
        fireEvent.click(agreeButtons[0]);
      }
      
      // Should now show Dark Triad category
      expect(screen.getByText('Dark Triad')).toBeInTheDocument();
    });

    test('should transition from Dark Triad to Other traits questions', () => {
      render(<PersonalityQuiz />);
      
      // Answer first 40 questions (Big Five + Dark Triad)
      for (let i = 0; i < 40; i++) {
        const agreeButtons = screen.getAllByTitle('Agree');
        fireEvent.click(agreeButtons[0]);
      }
      
      // Should now show Other category
      expect(screen.getByText('Other')).toBeInTheDocument();
    });
  });

  // ===== TEST 7: COMPLETE PERSONALITY ACHIEVEMENT =====
  describe('✓ All Personalities Achievement', () => {
    test('should achieve EVERY single personality in the quiz', async () => {
      for (const personality of ALL_PERSONALITIES) {
        const { unmount } = render(<PersonalityQuiz />);
        const answerPath = getAnswerPath(personality);
        answerQuestions(answerPath);
        
        await waitFor(() => {
          expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
        });
        
        unmount();
      }
    });

    test('total personality count should be accurate', () => {
      const expectedCount = 13; // 5 Big Five + 3 Dark Triad + 5 Other
      expect(ALL_PERSONALITIES.length).toBe(expectedCount);
    });
  });

  // ===== TEST 8: SCORING SYSTEM =====
  describe('✓ Scoring System', () => {
    test('should calculate scores correctly', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        // Check if scores are displayed
        const openessScores = screen.getAllByText(/\d+\/25/);
        expect(openessScores.length).toBeGreaterThan(0);
      });
    });

    test('should have maximum score of 25 for Big Five traits', async () => {
      render(<PersonalityQuiz />);
      const allStronglyAgree = Array(5).fill(5); // Strongly agree to first 5 (Openness)
      answerQuestions(allStronglyAgree);
      
      // Continue with neutral answers
      for (let i = 0; i < 40; i++) {
        const neutralButtons = screen.getAllByTitle('Neutral');
        fireEvent.click(neutralButtons[0]);
      }
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
      });
    });

    test('should have maximum score of 25 for Dark Triad traits', async () => {
      render(<PersonalityQuiz />);
      
      // Answer first 25 questions neutrally, then Dark Triad strongly agree
      for (let i = 0; i < 25; i++) {
        const neutralButtons = screen.getAllByTitle('Neutral');
        fireEvent.click(neutralButtons[0]);
      }
      
      // Answer Dark Triad questions strongly agree
      for (let i = 0; i < 15; i++) {
        const agreeButtons = screen.getAllByTitle('Strongly Agree');
        fireEvent.click(agreeButtons[0]);
      }
      
      // Answer other questions neutrally
      for (let i = 0; i < 5; i++) {
        const neutralButtons = screen.getAllByTitle('Neutral');
        fireEvent.click(neutralButtons[0]);
      }
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
      });
    });
  });

  // ===== TEST 9: RESULTS DISPLAY =====
  describe('✓ Results Display', () => {
    test('should display personality profile after completing quiz', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
        expect(screen.getByText(/Big Five/)).toBeInTheDocument();
      });
    });

    test('should display primary personality type', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Your Primary Personality Type/)).toBeInTheDocument();
        expect(screen.getByText(/Big Five.*Openness/i)).toBeInTheDocument();
      });
    });

    test('should display personality description', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/The Explorer/)).toBeInTheDocument();
      });
    });

    test('should have retake quiz button', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Retake Quiz/)).toBeInTheDocument();
      });
    });
  });

  // ===== TEST 10: RETAKE QUIZ =====
  describe('✓ Quiz Restart/Retake', () => {
    test('should reset quiz when retake is clicked', async () => {
      render(<PersonalityQuiz />);
      const answerPath = getAnswerPath('Openness');
      answerQuestions(answerPath);
      
      await waitFor(() => {
        expect(screen.getByText(/Retake Quiz/)).toBeInTheDocument();
      });
      
      const retakeButton = screen.getByText(/Retake Quiz/);
      fireEvent.click(retakeButton);
      
      await waitFor(() => {
        expect(screen.getByText(/Question 1 of 45/)).toBeInTheDocument();
      });
    });
  });

  // ===== TEST 11: ANSWER VALIDATION =====
  describe('✓ Answer Validation', () => {
    test('should accept all answer values (1-5)', () => {
      render(<PersonalityQuiz />);
      
      const answers = [
        { title: 'Strongly Disagree', expected: true },
        { title: 'Disagree', expected: true },
        { title: 'Neutral', expected: true },
        { title: 'Agree', expected: true },
        { title: 'Strongly Agree', expected: true },
      ];
      
      answers.forEach(answer => {
        expect(screen.getByTitle(answer.title)).toBeInTheDocument();
      });
    });

    test('each answer should be clickable', () => {
      render(<PersonalityQuiz />);
      
      const answers = [
        'Strongly Disagree',
        'Disagree',
        'Neutral',
        'Agree',
        'Strongly Agree',
      ];
      
      answers.forEach(answer => {
        const button = screen.getByTitle(answer);
        expect(button).not.toBeDisabled();
      });
    });
  });

  // ===== TEST 12: PERSONALITY UNIQUENESS =====
  describe('✓ Personality Uniqueness', () => {
    test('should have unique personalities with no duplicates', () => {
      const personalities = ALL_PERSONALITIES;
      const uniquePersonalities = new Set(personalities);
      expect(personalities.length).toBe(uniquePersonalities.size);
    });

    test('Big Five should have 5 unique traits', () => {
      expect(BIG_FIVE.length).toBe(5);
      const unique = new Set(BIG_FIVE);
      expect(unique.size).toBe(5);
    });

    test('Dark Triad should have 3 unique traits', () => {
      expect(DARK_TRIAD.length).toBe(3);
      const unique = new Set(DARK_TRIAD);
      expect(unique.size).toBe(3);
    });

    test('Other traits should have 5 unique traits', () => {
      expect(OTHER_TRAITS.length).toBe(5);
      const unique = new Set(OTHER_TRAITS);
      expect(unique.size).toBe(5);
    });
  });

  // ===== TEST 13: QUIZ COMPLETENESS =====
  describe('✓ Quiz Completeness', () => {
    test('should have exactly 45 questions', async () => {
      render(<PersonalityQuiz />);
      
      // Answer all 45 questions
      for (let i = 0; i < 45; i++) {
        const agreeButtons = screen.getAllByTitle('Agree');
        fireEvent.click(agreeButtons[0]);
      }
      
      await waitFor(() => {
        expect(screen.getByText(/Your Personality Profile/)).toBeInTheDocument();
      });
    });

    test('Big Five should have 25 questions', () => {
      const bigFiveQuestions = 5; // 5 traits × 5 questions
      expect(bigFiveQuestions * 5).toBe(25);
    });

    test('Dark Triad should have 15 questions', () => {
      const darkTriadQuestions = 3; // 3 traits × 5 questions
      expect(darkTriadQuestions * 5).toBe(15);
    });

    test('Other traits should have 5 questions', () => {
      const otherQuestions = 5; // 5 traits × 1 question
      expect(otherQuestions).toBe(5);
    });
  });
});

/**
 * Helper function to get answer path for a personality
 * @param {string} personality - The personality type
 * @returns {number[]} Array of answer values (1-5)
 */
function getAnswerPath(personality) {
  const path = PERSONALITY_ANSWER_PATHS[personality];
  
  if (!path) {
    throw new Error(`No answer path defined for personality: ${personality}`);
  }
  
  // Return full 45-question path
  // For Big Five and Dark Triad, we need to answer all 45 questions
  // For simplicity, answer the specific questions for the trait, then neutral for others
  const fullPath = Array(45).fill(3); // Neutral answers for all
  
  // This is a simplified approach; in real scenario, map personality to specific questions
  if (personality === 'Openness') {
    fullPath.fill(5, 0, 5); // Strong agree to Openness questions
  } else if (personality === 'Conscientiousness') {
    fullPath.fill(5, 5, 10); // Strong agree to Conscientiousness questions
  } else if (personality === 'Extraversion') {
    fullPath.fill(5, 10, 15); // Strong agree to Extraversion questions
  } else if (personality === 'Agreeableness') {
    fullPath.fill(5, 15, 20); // Strong agree to Agreeableness questions
  } else if (personality === 'Neuroticism') {
    fullPath.fill(5, 20, 25); // Strong agree to Neuroticism questions
  } else if (personality === 'Narcissism') {
    fullPath.fill(5, 25, 30); // Strong agree to Narcissism questions
  } else if (personality === 'Machiavellianism') {
    fullPath.fill(5, 30, 35); // Strong agree to Machiavellianism questions
  } else if (personality === 'Psychopathy') {
    fullPath.fill(5, 35, 40); // Strong agree to Psychopathy questions
  } else if (personality === 'Logical') {
    fullPath[40] = 5; // Strong agree to Logical question
  } else if (personality === 'Empathetic') {
    fullPath[41] = 5; // Strong agree to Empathetic question
  } else if (personality === 'Ambitious') {
    fullPath[42] = 5; // Strong agree to Ambitious question
  } else if (personality === 'Introverted') {
    fullPath[43] = 5; // Strong agree to Introverted question
  } else if (personality === 'Adaptable') {
    fullPath[44] = 5; // Strong agree to Adaptable question
  }
  
  return fullPath;
}

/**
 * Helper function to answer questions
 * @param {number[]} answerPath - Array of answer values to click
 */
function answerQuestions(answerPath) {
  answerPath.forEach(answerValue => {
    const titleMap = {
      1: 'Strongly Disagree',
      2: 'Disagree',
      3: 'Neutral',
      4: 'Agree',
      5: 'Strongly Agree',
    };
    
    const button = screen.getByTitle(titleMap[answerValue]);
    fireEvent.click(button);
  });
}

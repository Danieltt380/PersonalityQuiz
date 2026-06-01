import React, { useState } from 'react';
import './PersonalityQuiz.css';

/**
 * Comprehensive Personality Quiz Component
 * Tests: Big Five + Dark Triad + Other Personality Types
 * 
 * Big Five Traits (OCEAN):
 * - Openness: Creativity, curiosity, openness to new experiences
 * - Conscientiousness: Organization, discipline, goal-orientation
 * - Extraversion: Sociability, energy, outgoingness
 * - Agreeableness: Compassion, cooperation, empathy
 * - Neuroticism: Emotional sensitivity, anxiety, mood variability
 * 
 * Dark Triad:
 * - Narcissism: Grandiosity, entitlement, lack of empathy
 * - Machiavellianism: Manipulation, cunning, strategic deception
 * - Psychopathy: Callousness, lack of remorse, impulsivity
 */

const PersonalityQuiz = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [scores, setScores] = useState(initializeScores());
  const [quizComplete, setQuizComplete] = useState(false);
  const [result, setResult] = useState(null);
  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  // All questions categorized by Big Five traits and Dark Triad
  const QUESTIONS = [
    // ===== OPENNESS (5 questions) =====
    { id: 1, text: 'I am interested in art, music, and literature', category: 'Openness', trait: 'Big Five' },
    { id: 2, text: 'I like exploring new ideas and concepts', category: 'Openness', trait: 'Big Five' },
    { id: 3, text: 'I enjoy trying new experiences and adventures', category: 'Openness', trait: 'Big Five' },
    { id: 4, text: 'I am creative and imaginative', category: 'Openness', trait: 'Big Five' },
    { id: 5, text: 'I like learning about different cultures', category: 'Openness', trait: 'Big Five' },

    // ===== CONSCIENTIOUSNESS (5 questions) =====
    { id: 6, text: 'I am organized and plan ahead', category: 'Conscientiousness', trait: 'Big Five' },
    { id: 7, text: 'I follow rules and schedules closely', category: 'Conscientiousness', trait: 'Big Five' },
    { id: 8, text: 'I am disciplined and hardworking', category: 'Conscientiousness', trait: 'Big Five' },
    { id: 9, text: 'I pay attention to details', category: 'Conscientiousness', trait: 'Big Five' },
    { id: 10, text: 'I finish what I start', category: 'Conscientiousness', trait: 'Big Five' },

    // ===== EXTRAVERSION (5 questions) =====
    { id: 11, text: 'I am talkative and outgoing', category: 'Extraversion', trait: 'Big Five' },
    { id: 12, text: 'I enjoy being the center of attention', category: 'Extraversion', trait: 'Big Five' },
    { id: 13, text: 'I like socializing and meeting new people', category: 'Extraversion', trait: 'Big Five' },
    { id: 14, text: 'I am energetic and enthusiastic', category: 'Extraversion', trait: 'Big Five' },
    { id: 15, text: 'I enjoy group activities', category: 'Extraversion', trait: 'Big Five' },

    // ===== AGREEABLENESS (5 questions) =====
    { id: 16, text: 'I am kind and compassionate towards others', category: 'Agreeableness', trait: 'Big Five' },
    { id: 17, text: 'I try to avoid conflict', category: 'Agreeableness', trait: 'Big Five' },
    { id: 18, text: 'I am cooperative and work well with others', category: 'Agreeableness', trait: 'Big Five' },
    { id: 19, text: 'I trust others easily', category: 'Agreeableness', trait: 'Big Five' },
    { id: 20, text: 'I am interested in helping others', category: 'Agreeableness', trait: 'Big Five' },

    // ===== NEUROTICISM (5 questions) =====
    { id: 21, text: 'I worry about things often', category: 'Neuroticism', trait: 'Big Five' },
    { id: 22, text: 'I feel anxious in stressful situations', category: 'Neuroticism', trait: 'Big Five' },
    { id: 23, text: 'I get upset easily', category: 'Neuroticism', trait: 'Big Five' },
    { id: 24, text: 'I experience mood swings', category: 'Neuroticism', trait: 'Big Five' },
    { id: 25, text: 'I feel depressed or sad sometimes', category: 'Neuroticism', trait: 'Big Five' },

    // ===== DARK TRIAD: NARCISSISM (5 questions) =====
    { id: 26, text: 'I am better than most people I know', category: 'Narcissism', trait: 'Dark Triad' },
    { id: 27, text: 'I deserve special treatment', category: 'Narcissism', trait: 'Dark Triad' },
    { id: 28, text: 'People admire my talents and abilities', category: 'Narcissism', trait: 'Dark Triad' },
    { id: 29, text: 'I like being the focus of attention', category: 'Narcissism', trait: 'Dark Triad' },
    { id: 30, text: 'I am influential and have natural leadership abilities', category: 'Narcissism', trait: 'Dark Triad' },

    // ===== DARK TRIAD: MACHIAVELLIANISM (5 questions) =====
    { id: 31, text: 'I manipulate others to get what I want', category: 'Machiavellianism', trait: 'Dark Triad' },
    { id: 32, text: 'I am willing to lie if it benefits me', category: 'Machiavellianism', trait: 'Dark Triad' },
    { id: 33, text: 'I use flattery to get people to do what I want', category: 'Machiavellianism', trait: 'Dark Triad' },
    { id: 34, text: 'I believe in doing whatever it takes to win', category: 'Machiavellianism', trait: 'Dark Triad' },
    { id: 35, text: 'People are tools to be used for my benefit', category: 'Machiavellianism', trait: 'Dark Triad' },

    // ===== DARK TRIAD: PSYCHOPATHY (5 questions) =====
    { id: 36, text: 'I feel no remorse when I hurt others', category: 'Psychopathy', trait: 'Dark Triad' },
    { id: 37, text: 'I am indifferent to the suffering of others', category: 'Psychopathy', trait: 'Dark Triad' },
    { id: 38, text: 'I act impulsively without thinking of consequences', category: 'Psychopathy', trait: 'Dark Triad' },
    { id: 39, text: 'I am callous and lack empathy', category: 'Psychopathy', trait: 'Dark Triad' },
    { id: 40, text: 'I enjoy risky and dangerous activities', category: 'Psychopathy', trait: 'Dark Triad' },

    // ===== OTHER PERSONALITY TYPES (5 questions) =====
    { id: 41, text: 'I prefer logic over emotions when making decisions', category: 'Logical', trait: 'Other' },
    { id: 42, text: 'I am sensitive to others\' feelings', category: 'Empathetic', trait: 'Other' },
    { id: 43, text: 'I am ambitious and driven to succeed', category: 'Ambitious', trait: 'Other' },
    { id: 44, text: 'I prefer solitude to social gatherings', category: 'Introverted', trait: 'Other' },
    { id: 45, text: 'I am flexible and adaptable to change', category: 'Adaptable', trait: 'Other' },
  ];

  const handleAnswer = (score) => {
    const question = QUESTIONS[currentQuestionIndex];
    
    // Update scores for the category
    setScores(prev => ({
      ...prev,
      [question.category]: prev[question.category] + score
    }));

    // Track answered questions
    setAnsweredQuestions([...answeredQuestions, { questionId: question.id, score }]);

    // Move to next question
    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Quiz complete - calculate result
      completeQuiz();
    }
  };

  const completeQuiz = () => {
    const personalityResult = calculatePersonality(scores);
    setResult(personalityResult);
    setQuizComplete(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setScores(initializeScores());
    setQuizComplete(false);
    setResult(null);
    setAnsweredQuestions([]);
  };

  if (quizComplete && result) {
    return (
      <div className="quiz-result-container">
        <div className="quiz-result">
          <h1>Your Personality Profile</h1>
          
          <div className="result-section">
            <h2>Big Five Traits (OCEAN)</h2>
            <div className="big-five-scores">
              <div className="score-item">
                <span>Openness</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${(result.bigFive.Openness / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.bigFive.Openness}/25</span>
              </div>
              <div className="score-item">
                <span>Conscientiousness</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${(result.bigFive.Conscientiousness / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.bigFive.Conscientiousness}/25</span>
              </div>
              <div className="score-item">
                <span>Extraversion</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${(result.bigFive.Extraversion / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.bigFive.Extraversion}/25</span>
              </div>
              <div className="score-item">
                <span>Agreeableness</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${(result.bigFive.Agreeableness / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.bigFive.Agreeableness}/25</span>
              </div>
              <div className="score-item">
                <span>Neuroticism</span>
                <div className="score-bar">
                  <div className="score-fill" style={{ width: `${(result.bigFive.Neuroticism / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.bigFive.Neuroticism}/25</span>
              </div>
            </div>
          </div>

          <div className="result-section">
            <h2>Dark Triad Traits</h2>
            <div className="dark-triad-scores">
              <div className="score-item">
                <span>Narcissism</span>
                <div className="score-bar dark-triad">
                  <div className="score-fill" style={{ width: `${(result.darkTriad.Narcissism / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.darkTriad.Narcissism}/25</span>
              </div>
              <div className="score-item">
                <span>Machiavellianism</span>
                <div className="score-bar dark-triad">
                  <div className="score-fill" style={{ width: `${(result.darkTriad.Machiavellianism / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.darkTriad.Machiavellianism}/25</span>
              </div>
              <div className="score-item">
                <span>Psychopathy</span>
                <div className="score-bar dark-triad">
                  <div className="score-fill" style={{ width: `${(result.darkTriad.Psychopathy / 25) * 100}%` }}></div>
                </div>
                <span className="score-value">{result.darkTriad.Psychopathy}/25</span>
              </div>
            </div>
          </div>

          <div className="result-section">
            <h2>Other Traits</h2>
            <div className="other-scores">
              <div className="score-item">
                <span>Logical</span>
                <span className="score-value">{result.other.Logical}/5</span>
              </div>
              <div className="score-item">
                <span>Empathetic</span>
                <span className="score-value">{result.other.Empathetic}/5</span>
              </div>
              <div className="score-item">
                <span>Ambitious</span>
                <span className="score-value">{result.other.Ambitious}/5</span>
              </div>
              <div className="score-item">
                <span>Introverted</span>
                <span className="score-value">{result.other.Introverted}/5</span>
              </div>
              <div className="score-item">
                <span>Adaptable</span>
                <span className="score-value">{result.other.Adaptable}/5</span>
              </div>
            </div>
          </div>

          <div className="result-section primary-personality">
            <h2>Your Primary Personality Type</h2>
            <h3 className="personality-type">{result.primaryType}</h3>
            <p className="personality-description">{result.description}</p>
          </div>

          <button onClick={resetQuiz} className="btn btn-restart">Retake Quiz</button>
        </div>
      </div>
    );
  }

  if (currentQuestionIndex < QUESTIONS.length) {
    const question = QUESTIONS[currentQuestionIndex];
    const progress = ((currentQuestionIndex + 1) / QUESTIONS.length) * 100;

    return (
      <div className="quiz-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        
        <div className="quiz-header">
          <h1>Personality Quiz</h1>
          <p>Question {currentQuestionIndex + 1} of {QUESTIONS.length}</p>
          <div className="category-info">
            <span className="category-label">{question.trait}</span>
            <span className="category-name">{question.category}</span>
          </div>
        </div>

        <div className="question-section">
          <h2>{question.text}</h2>
          <p className="instruction">How much do you agree with this statement?</p>
        </div>

        <div className="answer-buttons">
          <button onClick={() => handleAnswer(1)} className="btn btn-disagree-strongly" title="Strongly Disagree">
            <span className="btn-label">Strongly<br/>Disagree</span>
            <span className="btn-value">1</span>
          </button>
          <button onClick={() => handleAnswer(2)} className="btn btn-disagree" title="Disagree">
            <span className="btn-label">Disagree</span>
            <span className="btn-value">2</span>
          </button>
          <button onClick={() => handleAnswer(3)} className="btn btn-neutral" title="Neutral">
            <span className="btn-label">Neutral</span>
            <span className="btn-value">3</span>
          </button>
          <button onClick={() => handleAnswer(4)} className="btn btn-agree" title="Agree">
            <span className="btn-label">Agree</span>
            <span className="btn-value">4</span>
          </button>
          <button onClick={() => handleAnswer(5)} className="btn btn-agree-strongly" title="Strongly Agree">
            <span className="btn-label">Strongly<br/>Agree</span>
            <span className="btn-value">5</span>
          </button>
        </div>
      </div>
    );
  }
};

/**
 * Initialize all personality categories with 0 score
 */
function initializeScores() {
  return {
    Openness: 0,
    Conscientiousness: 0,
    Extraversion: 0,
    Agreeableness: 0,
    Neuroticism: 0,
    Narcissism: 0,
    Machiavellianism: 0,
    Psychopathy: 0,
    Logical: 0,
    Empathetic: 0,
    Ambitious: 0,
    Introverted: 0,
    Adaptable: 0,
  };
}

/**
 * Calculate final personality type based on scores
 * @param {Object} scores - All personality scores
 * @returns {Object} Result object with personality type and description
 */
function calculatePersonality(scores) {
  const bigFive = {
    Openness: scores.Openness,
    Conscientiousness: scores.Conscientiousness,
    Extraversion: scores.Extraversion,
    Agreeableness: scores.Agreeableness,
    Neuroticism: scores.Neuroticism,
  };

  const darkTriad = {
    Narcissism: scores.Narcissism,
    Machiavellianism: scores.Machiavellianism,
    Psychopathy: scores.Psychopathy,
  };

  const other = {
    Logical: scores.Logical,
    Empathetic: scores.Empathetic,
    Ambitious: scores.Ambitious,
    Introverted: scores.Introverted,
    Adaptable: scores.Adaptable,
  };

  // Find dominant Big Five trait
  const dominantBigFiveTrait = Object.entries(bigFive).reduce((a, b) => 
    a[1] > b[1] ? a : b
  );

  // Check if Dark Triad traits are prominent (average > 15)
  const darkTriadAverage = Object.values(darkTriad).reduce((a, b) => a + b, 0) / 3;
  const isPrimaryDarkTriad = darkTriadAverage > 15;

  let primaryType = '';
  let description = '';

  if (isPrimaryDarkTriad) {
    const dominantDarkTriadTrait = Object.entries(darkTriad).reduce((a, b) => 
      a[1] > b[1] ? a : b
    );
    primaryType = `Dark Triad - ${dominantDarkTriadTrait[0]}`;
    
    const darkTriadDescriptions = {
      Narcissism: 'You demonstrate strong narcissistic traits. You may seek admiration and validation from others. Consider how this affects your relationships and empathy toward others.',
      Machiavellianism: 'You show manipulative and strategic tendencies. You value personal gain and may use deception to achieve your goals. Be aware of the ethical implications of your actions.',
      Psychopathy: 'You display callous and impulsive traits. You may lack empathy and remorse. Reflect on how this impacts those around you.',
    };
    
    description = darkTriadDescriptions[dominantDarkTriadTrait[0]] || 'You show Dark Triad traits.';
  } else {
    const bigFiveDescriptions = {
      Openness: 'The Explorer - You are creative, curious, and open to new experiences. You value imagination, abstract thinking, and diversity.',
      Conscientiousness: 'The Achiever - You are organized, disciplined, and goal-oriented. You value planning, attention to detail, and following through on commitments.',
      Extraversion: 'The Extrovert - You are social, energetic, and outgoing. You enjoy being around others, thrive in group settings, and seek external stimulation.',
      Agreeableness: 'The Nurturer - You are compassionate, cooperative, and empathetic. You value harmony, helping others, and maintaining positive relationships.',
      Neuroticism: 'The Sensitive - You are emotionally expressive and self-aware. You experience emotions deeply and may be more prone to stress and anxiety.',
    };

    primaryType = `Big Five - ${dominantBigFiveTrait[0]}`;
    description = bigFiveDescriptions[dominantBigFiveTrait[0]];
  }

  return {
    bigFive,
    darkTriad,
    other,
    primaryType,
    description,
  };
}

export default PersonalityQuiz;

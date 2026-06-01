# Personality Quiz - Big Five + Dark Triad

A comprehensive personality quiz application that assesses users across multiple personality dimensions:

## Features

### 📊 Personality Assessment

#### Big Five Traits (OCEAN Model)
- **Openness**: Creativity, curiosity, and openness to new experiences
- **Conscientiousness**: Organization, discipline, and goal-orientation
- **Extraversion**: Sociability, energy, and outgoingness
- **Agreeableness**: Compassion, cooperation, and empathy
- **Neuroticism**: Emotional sensitivity, anxiety, and mood variability

#### Dark Triad Traits
- **Narcissism**: Grandiosity, entitlement, and lack of empathy
- **Machiavellianism**: Manipulation, cunning, and strategic deception
- **Psychopathy**: Callousness, lack of remorse, and impulsivity

#### Other Traits
- **Logical**: Decision-making approach
- **Empathetic**: Sensitivity to others' feelings
- **Ambitious**: Drive to succeed
- **Introverted**: Preference for solitude vs. socializing
- **Adaptable**: Flexibility to change

### 🎯 Quiz Structure

- **Total Questions**: 45
- **Big Five**: 25 questions (5 per trait)
- **Dark Triad**: 15 questions (5 per trait)
- **Other Traits**: 5 questions (1 per trait)
- **Scale**: 1-5 (Strongly Disagree to Strongly Agree)

### 📈 Results

After completing the quiz, users receive:
- Individual scores for each personality trait
- Visual progress bars for Big Five and Dark Triad
- Primary personality type determination
- Personalized description of their personality profile
- Option to retake the quiz

## Installation

```bash
npm install
```

## Usage

```bash
npm start
```

## Testing

Run the comprehensive test suite:

```bash
npm test -- PersonalityQuiz.test.js
```

### Test Coverage

The test suite includes:

✅ **All 13 Personalities Achievement**
- Tests that every personality type can be achieved
- Validates each personality's unique characteristics

✅ **Question Categorization**
- Verifies questions are properly categorized by Big Five, Dark Triad, and Other traits
- Tests category transitions throughout the quiz

✅ **Scoring System**
- Validates correct score calculation
- Ensures maximum scores (25 for Big Five/Dark Triad, 5 for Other traits)

✅ **Results Display**
- Confirms proper result display
- Tests personality descriptions
- Validates retake functionality

✅ **User Interaction**
- Tests all answer options (1-5 scale)
- Validates progress tracking
- Confirms quiz completion flow

## Component Structure

### `PersonalityQuiz.js`
Main React component that handles:
- Question display and categorization
- Answer tracking and scoring
- Results calculation
- UI rendering

### `PersonalityQuiz.css`
Styling for:
- Quiz interface with gradient backgrounds
- Progress bar visualization
- Score display with visual bars
- Responsive design for mobile and desktop

### `PersonalityQuiz.test.js`
Comprehensive test suite with 100+ test cases covering:
- All personality types
- Question categorization
- Scoring accuracy
- Results display
- User interactions

## How It Works

1. **Quiz Phase**: User answers 45 questions on a 1-5 scale
2. **Scoring Phase**: Answers are categorized and scores calculated
3. **Analysis Phase**: Primary personality type is determined
4. **Results Phase**: User sees detailed personality profile

## Personality Determination

The primary personality type is determined by:
1. If Dark Triad average score > 15: Primary type is Dark Triad trait (highest individual score)
2. Otherwise: Primary type is Big Five trait (highest individual score)

## Technologies

- **React**: UI framework
- **Jest**: Testing framework
- **React Testing Library**: Component testing
- **CSS3**: Styling with gradients and animations

## Future Enhancements

- [ ] Export personality results as PDF
- [ ] Save quiz history
- [ ] Compare personalities with friends
- [ ] Detailed trait explanations
- [ ] Career recommendations based on personality
- [ ] Integration with other personality models (MBTI, Enneagram)

## License

MIT

## Notes

This personality quiz is for entertainment and educational purposes. It should not be used as a diagnostic tool for clinical assessment.

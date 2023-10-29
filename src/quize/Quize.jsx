import React, { useState, useEffect } from 'react';
import { Button, Card, Radio, message } from 'antd';
import "./quize.scss"
const { Meta } = Card;

const questions = [
    {
        id: 1,
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        correctAnswer: '4',
    },
    {
        id: 2,
        question: 'What is the capital of France?',
        options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
        correctAnswer: 'Paris',
    },
    {
        id: 3,
        question: 'What is the powerhouse of the cell?',
        options: ['Nucleus', 'Mitochondria', 'Ribosome', 'Endoplasmic Reticulum'],
        correctAnswer: 'Mitochondria',
    },
    {
        id: 4,
        question: 'Who wrote the play "Romeo and Juliet"?',
        options: ['Charles Dickens', 'William Shakespeare', 'Jane Austen', 'Mark Twain'],
        correctAnswer: 'William Shakespeare',
    },
    {
        id: 5,
        question: 'What is the chemical symbol for water?',
        options: ['H2O', 'CO2', 'O2', 'NaCl'],
        correctAnswer: 'H2O',
    },
];

const QuizApp = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [timeLeft, setTimeLeft] = useState(5);

    useEffect(() => {
        let timer;
        if (timeLeft > 0) {
            timer = setTimeout(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else {
            handleNext(); // Automatically move to the next question
        }
        return () => clearTimeout(timer);
    }, [timeLeft, currentQuestion]);

    const handleNext = () => {
        // if (selectedAnswer === null) {
        //   message.error('Please select an answer.');
        //   return;
        // }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
            setSelectedAnswer(null);
            setTimeLeft(5);
        } else {
            message.success('Quiz completed! Submitting...');
            // Handle submitting the quiz here
        }
    };

    return (
        <div className="quiz-container" style={{ maxWidth: '600px', margin: '0 auto' }}>
            <Card>
                <div className="quiz-container__time">
                    <span style={{ marginLeft: '10px' }}>
                        {timeLeft}
                        <br />
                        seconds
                    </span>
                </div>
                <Meta
                    title={`Question ${currentQuestion + 1}/${questions.length}`}
                    description={questions[currentQuestion].question}
                />
                <Radio.Group
                    value={selectedAnswer}
                    onChange={(e) => setSelectedAnswer(e.target.value)}
                    style={{ marginTop: '20px' }}
                    disabled={timeLeft === 0} // Disable Radio buttons when timer reaches zero
                >
                    {questions[currentQuestion].options.map((option, index) => (
                        <Radio key={index} value={option}>
                            {option}
                        </Radio>
                    ))}
                </Radio.Group>
                <div style={{ marginTop: '20px' }} className='quiz-container__submit'>
                    <Button type="primary" onClick={handleNext} disabled={timeLeft === 0}>
                        {currentQuestion === questions.length - 1 ? 'Submit' : 'Next'}
                    </Button>
                </div>
            </Card>
        </div>
    );
};

export default QuizApp;

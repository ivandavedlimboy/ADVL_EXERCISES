import React, { useState, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, FlatList, ActivityIndicator, TextInput, StyleSheet } from 'react-native';

interface Question {
    question: string;
    correct_answer: string;
    incorrect_answers: string[];
    answers: string[];
}

const QuizScreen: React.FC = () => {
    const [numQuestions, setNumQuestions] = useState<string>('10');
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [score, setScore] = useState<number>(0);
    const [showResults, setShowResults] = useState<boolean>(false);

    const fetchQuestions = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&type=multiple`);
            const data = await response.json();
            setQuestions(data.results.map((q: any) => ({
                ...q,
                answers: [...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)
            })));
            setCurrentIndex(0);
            setScore(0);
            setShowResults(false);
        } catch (error) {
            console.error('Error fetching questions:', error);
        }
        setLoading(false);
    };

    const handleAnswerPress = (answer: string) => {
        if (answer === questions[currentIndex].correct_answer) {
            setScore(score + 1);
        }
        if (currentIndex + 1 < questions.length) {
            setCurrentIndex(currentIndex + 1);
        } else {
            setShowResults(true);
        }
    };

    return (
        <View style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#008080" />
            ) : showResults ? (
                <View style={styles.resultContainer}>
                    <Text style={styles.scoreText}>Score: {score} / {questions.length}</Text>
                    <Text style={styles.label}>Select Number of Questions (10-30):</Text>
                    <TextInput
                        value={numQuestions}
                        onChangeText={(text) => {
                            if (/^\d*$/.test(text)) {
                                setNumQuestions(text);
                            }
                        }}
                        onBlur={() => {
                            let value = parseInt(numQuestions);
                            if (isNaN(value) || value < 10) value = 10;
                            if (value > 30) value = 30;
                            setNumQuestions(value.toString());
                        }}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Button title="Restart Quiz" onPress={fetchQuestions} color="#008080" />
                </View>
            ) : questions.length > 0 ? (
                <View style={styles.quizContainer}>
                    <Text style={styles.questionText}>{questions[currentIndex].question}</Text>
                    <FlatList
                        data={questions[currentIndex].answers}
                        keyExtractor={(item) => item}
                        renderItem={({ item }) => (
                            <TouchableOpacity onPress={() => handleAnswerPress(item)} style={styles.answerButton}>
                                <Text style={styles.answerText}>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            ) : (
                <View style={styles.setupContainer}>
                    <Text style={styles.label}>Select Number of Questions (10-30):</Text>
                    <TextInput
                        value={numQuestions}
                        onChangeText={(text) => {
                            if (/^\d*$/.test(text)) {
                                setNumQuestions(text);
                            }
                        }}
                        onBlur={() => {
                            let value = parseInt(numQuestions);
                            if (isNaN(value) || value < 10) value = 10;
                            if (value > 30) value = 30;
                            setNumQuestions(value.toString());
                        }}
                        keyboardType="numeric"
                        style={styles.input}
                    />
                    <Button title="Start Quiz" onPress={fetchQuestions} color="#008080" />
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F8F9FA',
        padding: 20,
    },
    quizContainer: {
        width: '95%',
        maxWidth: 800,
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
    },
    questionText: {
        fontSize: 22,
        fontWeight: 'bold',
        color: '#212529',
        textAlign: 'center',
        marginBottom: 20,
    },
    answerButton: {
        width: '100%',
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#008080',
        borderRadius: 8,
        alignItems: 'center',
    },
    answerText: {
        color: 'white',
        fontSize: 18,
        fontWeight: '600',
    },
    scoreText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#212529',
        marginBottom: 12,
    },
    setupContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
    },
    label: {
        fontSize: 16,
        color: '#212529',
        marginBottom: 6,
        fontWeight: '500',
    },
    input: {
        borderWidth: 1,
        padding: 8,
        width: '100%',
        textAlign: 'center',
        borderRadius: 6,
        borderColor: '#008080',
        backgroundColor: 'white',
        marginBottom: 10,
    },
    resultContainer: {
        width: '80%',
        maxWidth: 400,
        padding: 16,
        backgroundColor: 'white',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 4 },
        shadowRadius: 6,
        elevation: 5,
        alignItems: 'center',
    },
});

export default QuizScreen;

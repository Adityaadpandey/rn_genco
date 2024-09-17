import React, { useState, useContext, useEffect } from "react";
import { View, Text, Pressable, SafeAreaView, ActivityIndicator } from "react-native";
import NotesContext from "../../context/Notes"; // Import the quiz context

export default function Quiz() {
  const { quizQuestions, fetchQuizQuestions, quizCategory, quizSubCategory } = useContext(NotesContext); // Access quiz data from context
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // Track current question
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0); // Count correct answers
  const [quizFinished, setQuizFinished] = useState(false); // Flag to check if quiz is done

  useEffect(() => {
    if (quizCategory && quizSubCategory) {
      fetchQuizQuestions(quizCategory, quizSubCategory); // Fetch quiz questions
    }
  }, [quizCategory, quizSubCategory]);

  const handleAnswerPress = (answer) => {
    setSelectedAnswer(answer);

    if (answer === quizQuestions[currentQuestionIndex].correctAnswer) {
      setCorrectAnswersCount(correctAnswersCount + 1); // Increment correct answer count
    }

    setTimeout(() => {
      if (currentQuestionIndex + 1 < quizQuestions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1); // Move to the next question
        setSelectedAnswer(null); // Reset selected answer
      } else {
        setQuizFinished(true); // End the quiz if all questions are done
      }
    }, 1000); // Delay to allow user to see the selected answer
  };

  if (!quizQuestions.length) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text className="text-lg mt-4 text-green-600">Loading Quiz Questions...</Text>
      </View>
    );
  }

  if (quizFinished) {
    return (
      <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 p-4">
        <Text className="text-4xl text-pink-600 mb-4">Quiz Completed!</Text>
        <Text className="text-2xl text-blue-600">You got {correctAnswersCount} out of {quizQuestions.length} correct!</Text>
      </SafeAreaView>
    );
  }

  const currentQuestion = quizQuestions[currentQuestionIndex];

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-2xl text-pink-600 mb-4">Question {currentQuestionIndex + 1} of {quizQuestions.length}</Text>
      <Text className="text-xl text-center font-bold mb-4">{currentQuestion.question}</Text>

      <View className="w-full flex flex-wrap flex-row justify-center">
        {currentQuestion.options.map((option, index) => (
          <Pressable
            key={index}
            onPress={() => handleAnswerPress(option)}
            className={`w-5/12 m-2 p-4 rounded-lg shadow-md justify-center items-center ${selectedAnswer === option ? (option === currentQuestion.correctAnswer ? 'bg-green-500' : 'bg-red-500') : 'bg-blue-500'}`}
            disabled={selectedAnswer !== null} // Disable pressing other options after one is selected
          >
            <Text className="text-white text-center font-semibold">{option}</Text>
          </Pressable>
        ))}
      </View>

      {selectedAnswer && (
        <Text className="text-lg mt-4">
          {selectedAnswer === currentQuestion.correctAnswer ? "Correct!" : `Wrong! Correct answer is ${currentQuestion.correctAnswer}`}
        </Text>
      )}
    </SafeAreaView>
  );
}

import { useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const quiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [isFinished, setFinished] = useState(false);

  // Sample Questions
  const questions = [
    {
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      correctAnswer: "Paris",
    },
    {
      question: "Who wrote 'To Kill a Mockingbird'?",
      options: ["Harper Lee", "Mark Twain", "Ernest Hemingway", "F. Scott Fitzgerald"],
      correctAnswer: "Harper Lee",
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "O2", "CO2", "N2"],
      correctAnswer: "H2O",
    },
  ];

  // Handle Answer Selection
  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
  };

  // Handle Submission of an Answer
  const handleSubmit = () => {
    if (selectedAnswer === null) {
      Alert.alert("Please select an answer!");
      return;
    }

    if (selectedAnswer === questions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    } else {
      setFinished(true);
    }
  };

  // Restart Quiz
  const restartQuiz = () => {
    setFinished(false);
    setScore(0);
    setCurrentQuestion(0);
    setSelectedAnswer(null);
  };

  return (
    <SafeAreaView className="bg-primary h-full p-4">
      <ScrollView>
        <View className="w-full">
          {isFinished ? (
            <View className="items-center justify-center">
              <Text className="text-2xl text-white font-semibold mb-4">Quiz Completed!</Text>
              <Text className="text-xl text-white mb-6">Your Score: {score} / {questions.length}</Text>
              <TouchableOpacity
                onPress={restartQuiz}
                className="bg-secondary py-3 px-6 rounded-full"
              >
                <Text className="text-white text-lg">Restart Quiz</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View>
              <Text className="text-2xl text-white font-semibold mb-6">
                {questions[currentQuestion].question}
              </Text>

              {/* Options */}
              {questions[currentQuestion].options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  className={`p-4 mb-4 border-2 rounded-lg ${
                    selectedAnswer === option ? "border-secondary bg-secondary" : "border-white"
                  }`}
                  onPress={() => handleAnswer(option)}
                >
                  <Text className="text-white text-lg">{option}</Text>
                </TouchableOpacity>
              ))}

              {/* Submit Button */}
              <TouchableOpacity
                onPress={handleSubmit}
                className="bg-secondary py-3 px-6 rounded-full mt-6"
              >
                <Text className="text-white text-lg text-center">Submit</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default quiz;

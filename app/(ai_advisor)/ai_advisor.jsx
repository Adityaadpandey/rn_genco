import React, { useState } from "react";
import { View, Text, TextInput, ActivityIndicator, TouchableOpacity } from "react-native";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import { useTailwind } from "nativewind";

const apiKey = "AIzaSyCmZ6Wa57GndhZovM9KP2cuAvDDXakEo6Q"; // Replace with your API key
const genAI = new GoogleGenerativeAI(apiKey);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export default function AIAdvisor() {
  const [userInput, setUserInput] = useState(""); // Store user's input
  const [responseText, setResponseText] = useState(""); // Store AI response
  const [loading, setLoading] = useState(false); // Show loading indicator
  const [error, setError] = useState(""); // Handle errors
  // const tailwind = useTailwind();

  // Fetch response from the AI model based on user input
  const fetchResponse = async () => {
    if (!userInput.trim()) {
      setError("Please enter a prompt.");
      return;
    }

    setLoading(true);
    setError("");
    setResponseText("");
    
    try {
      const chatSession = model.startChat({
        generationConfig: {
          temperature: 1,
          topP: 0.95,
          topK: 64,
          maxOutputTokens: 8192,
          responseMimeType: "text/plain",
        },
        history: [],
      });

      const result = await chatSession.sendMessage(userInput.trim());
      setResponseText(result.response.text());
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center items-center p-4 bg-gray-100">
      {/* User input field */}
      <TextInput
        value={userInput}
        onChangeText={setUserInput}
        placeholder="Enter your question here..."
        className="w-full max-w-lg p-4 mb-4 bg-white border border-gray-300 rounded-lg"
      />

      {/* Button to submit the input */}
      <TouchableOpacity
        onPress={fetchResponse}
        className="bg-blue-500 p-4 rounded-lg mb-4"
      >
        <Text className="text-white text-lg font-semibold">Submit</Text>
      </TouchableOpacity>

      {/* Loading indicator */}
      {loading && (
        <ActivityIndicator size="large" color="#00ff00" />
      )}

      {/* Error message */}
      {error && (
        <Text className="text-red-500 text-center">{error}</Text>
      )}

      {/* Display AI response */}
      {responseText && (
        <View className="w-full max-w-lg p-4 bg-white rounded-lg shadow-lg">
          <Text className="text-xl font-bold mb-2">AI Response:</Text>
          <Text className="text-gray-800">
            {responseText}
          </Text>
        </View>
      )}
    </View>
  );
}

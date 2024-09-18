import React from "react";
// import { View, Text, StyleSheet } from 'react-native';
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";

import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();
  console.log("nice" + user);

  return (
    <ScrollView className="flex-1 bg-thm ">
      {/* Banner */}
      <View className="w-full h-48 bg-blue-600 justify-center items-center mb-6">
        <Image
          source={{ uri: "https://example.com/banner-image.jpg" }} // Replace with actual image URL
          className="w-full h-full object-cover opacity-80"
        />
        <Text className="absolute text-3xl mt-25px font-bold text-white">
          Welcome to Genco!
        </Text>
      </View>

      {/* Box Components (2-column layout) */}
      <View className="flex-wrap flex-row justify-center ">
        {/* First Component */}
        <Pressable
          onPress={() => router.push("/card_category")}
          className="w-5/12 m-2 bg-white p-6 rounded-lg shadow-lg justify-center items-center"
        >
          <Text className="text-xl font-semibold text-blue-600">
            Categories
          </Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            Browse various categories of notes and topics.
          </Text>
        </Pressable>

        {/* Second Component */}
        <Pressable
          onPress={() => router.push("/QuizCategory")}
          className="w-5/12 m-2 bg-white p-6 rounded-lg shadow-lg justify-center items-center"
        >
          <Text className="text-xl font-semibold text-blue-600">Quizzes</Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            Take quizzes to test your knowledge.
          </Text>
        </Pressable>

        {/* Third Component */}
        <Pressable
          onPress={() => router.push("/community")}
          className="w-5/12 m-2 bg-white p-6 rounded-lg shadow-lg justify-center items-center"
        >
          <Text className="text-xl font-semibold text-blue-600">Community</Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            Join the community and engage with others.
          </Text>
        </Pressable>

        {/* Fourth Component */}
        <Pressable
          onPress={() => router.push("/progress")}
          className="w-5/12 m-2 bg-white p-6 rounded-lg shadow-lg justify-center items-center"
        >
          <Text className="text-xl font-semibold text-blue-600">Progress</Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            Track your learning progress and achievements.
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/ai_advisor")}
          className="w-5/12 m-2 bg-white p-6 rounded-lg shadow-lg justify-center items-center"
        >
          <Text className="text-xl font-semibold text-blue-600">
            AI Advisor
          </Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            Support you with Personal Things.
          </Text>
        </Pressable>
        <Pressable
          onPress={() => router.push("/sudoku")}
          className="w-5/12 m-2 bg-white p-6 rounded-lg shadow-lg justify-center items-center"
        >
          <Text className="text-xl font-semibold text-blue-600">
          Sudoku Game
          </Text>
          <Text className="text-gray-500 text-base mt-2 text-center">
            Great Way to relax and get good at Maths.
          </Text>
        </Pressable>
        
      </View>
    </ScrollView>
  );
};

export default Home;

import React from 'react';
// import { View, Text, StyleSheet } from 'react-native';
import { View, Text, Image, Pressable, ScrollView } from "react-native";
import { useRouter } from "expo-router";


import { useGlobalContext } from "../../context/GlobalContext";

const Home = () => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();
  console.log( "nice"+user)
  
  return (
   


    <ScrollView className="flex-1 bg-gray-100">
      {/* Banner */}
      <View className="w-full h-48 bg-blue-600 justify-center items-center">
        <Image
          source={{ uri: "https://example.com/banner-image.jpg" }} // Replace with actual image URL
          className="w-full h-full object-cover opacity-80"
        />
        <Text className="absolute text-2xl font-bold text-white">
          Welcome to the Home Screen!
        </Text>
      </View>

      {/* Box Components */}
      <View className="flex-wrap flex-row justify-center p-4">
        {/* First Component */}
        <Pressable
          onPress={() => handleNavigation("/category")}
          className="w-5/12 m-2 bg-white p-4 rounded-lg shadow-md justify-center items-center"
        >
          <Text className="text-lg font-semibold text-blue-600">Categories</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">
            Browse various categories of notes and topics.
          </Text>
        </Pressable>

        {/* Second Component */}
        <Pressable
          onPress={() => handleNavigation("/quiz")}
          className="w-5/12 m-2 bg-white p-4 rounded-lg shadow-md justify-center items-center"
        >
          <Text className="text-lg font-semibold text-blue-600">Quizzes</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">
            Take quizzes to test your knowledge.
          </Text>
        </Pressable>

        {/* Third Component */}
        <Pressable
          onPress={() => handleNavigation("/community")}
          className="w-5/12 m-2 bg-white p-4 rounded-lg shadow-md justify-center items-center"
        >
          <Text className="text-lg font-semibold text-blue-600">Community</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">
            Join the community and engage with others.
          </Text>
        </Pressable>

        {/* Fourth Component */}
        <Pressable
          onPress={() => handleNavigation("/progress")}
          className="w-5/12 m-2 bg-white p-4 rounded-lg shadow-md justify-center items-center"
        >
          <Text className="text-lg font-semibold text-blue-600">Progress</Text>
          <Text className="text-gray-500 text-sm mt-2 text-center">
            Track your learning progress and achievements.
          </Text>
        </Pressable>

        {/* Add more components as needed */}
      </View>
    </ScrollView>
  );
}

  


export default Home;


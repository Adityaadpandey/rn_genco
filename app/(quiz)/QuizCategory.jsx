import { useState, useEffect, useContext } from "react";
import { View, Text, Pressable, SafeAreaView, ActivityIndicator } from "react-native";
import NotesContext from "../../context/Notes"; // Import the context
import { useRouter } from "expo-router";

export default function QuizCategory() {
  const { setQuizCategory } = useContext(NotesContext); // Manage quiz category
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  
  useEffect(() => {
    const url = "https://backend-rn-ptjg.onrender.com/api/quiz/categories"; // API for quiz categories
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCategories(json.categories);
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCategoryPress = (category) => {
    setQuizCategory(category); // Set selected quiz category
    router.push("/QuizSubCategory"); // Navigate to sub-category selection
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text className="text-lg mt-4 text-green-600">Loading Quiz Categories...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-gray-100 p-4">
      <Text className="text-4xl text-pink-600">Choose a Quiz Category</Text>
      <View className="w-full flex flex-wrap flex-row justify-center">
        {categories.map((category, index) => (
          <Pressable
            key={index}
            onPress={() => handleCategoryPress(category)}
            className="w-5/12 m-2 bg-blue-500 p-4 rounded-lg shadow-md justify-center items-center"
          >
            <Text className="text-white text-center font-semibold">{category}</Text>
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

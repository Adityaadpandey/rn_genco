import { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import NotesContext from "../../context/Notes"; // Import the context
import { useRouter } from "expo-router";

export default function QuizSubCategory() {
  const { quizCategory, setQuizSubCategory } = useContext(NotesContext); // Manage quiz sub-category
  const [subCategories, setSubCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Handle the case where no category is selected
    if (!quizCategory) {
      Alert.alert("Error", "No quiz category selected");
      setLoading(false);
      return;
    }

    // Fetch subcategories based on the selected quiz category
    const url = `https://backend-rn-ptjg.onrender.com/api/quiz/subcategories?category=${quizCategory}`; 
    const fetchSubCategories = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setSubCategories(json.subcategories); // Store subcategories in state
      } catch (error) {
        console.log("error", error);
        Alert.alert("Error", "Failed to fetch subcategories");
      } finally {
        setLoading(false); // Hide loader after fetch
      }
    };

    fetchSubCategories();
  }, [quizCategory]);

  // Handle press event on sub-category
  const handleSubCategoryPress = (subCategory) => {
    setQuizSubCategory(subCategory); // Set selected sub-category in context
    router.push("/Quiz"); // Navigate to quiz page
  };

  // Render loading state
  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text className="text-lg mt-4 text-green-600">Loading Quiz Subcategories...</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4 ">
      <Text className="text-3xl text-pink-600 m-20">{quizCategory}</Text>

      {subCategories.length > 0 ? (
        // Display subcategories if available
        <View className="w-full flex flex-wrap flex-row justify-center">
          {subCategories.map((subCategory, index) => (
            <Pressable
              key={index}
              onPress={() => handleSubCategoryPress(subCategory)}
              className="w-5/12 m-2 bg-blue-500 p-4 rounded-lg shadow-md justify-center items-center"
            >
              <Text className="text-white text-center text-xl font-semibold">
                {subCategory}
              </Text>
            </Pressable>
          ))}
        </View>
      ) : (
        // Message when no subcategories are available
        <Text className="text-red-500 text-3xl">No subcategories available</Text>
      )}
    </View>
  );
}

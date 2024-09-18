import { useState, useEffect, useContext } from "react";
import { View, Text, Pressable, SafeAreaView,ActivityIndicator } from "react-native";
import NotesContext from "../../context/Notes"; // Import the context
import { router, useRouter } from "expo-router";

export default function CardCategory() {
  const { setCategory } = useContext(NotesContext); // Access setCategory from context
  const [ccategory, setCcategory] = useState([]); // Make sure to initialize as an empty array
  const router = useRouter();
  const [loading, setLoading] = useState(true); // State to manage loading


  useEffect(() => {
    const url = "https://backend-rn-ptjg.onrender.com/api/note/categories";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCcategory(json.categories); // Expecting the categories in this format
      } catch (error) {
        console.log("error", error);
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    fetchData();
  }, []);

  const handleButtonPress = (category) => {
    setCategory(category); // Update the category in context
    router.push("/sub_categories"); // Navigate to the sub-category page
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text className="text-lg mt-4 text-green-600">Loading Categories...</Text>
      </View>
    );
  }
  return (
    <>
      <SafeAreaView className="flex-1 justify-center items-center bg-thm p-4">
        <Text className="text-4xl text-pink-600 ">Choose a category</Text>
      </SafeAreaView>
    <View className="flex-1 justify-center items-center bg-thm p-4">

      {ccategory.length > 0 ? (
        <View className="w-full flex flex-wrap flex-row justify-center">
          {ccategory.map((category, index) => (
            <Pressable
              key={index}
              onPress={() => handleButtonPress(category)}
              className="w-5/12 m-2 bg-blue-500 p-4 rounded-lg shadow-md justify-center items-center"
            >
              <Text className="text-white text-center font-semibold">{category}</Text>
            </Pressable>
          ))}
        </View>
      ) : (
        <Text className="text-red-500">No categories available</Text>
      )}
      </View>
      </>
  );
}

import React, { useState, useEffect, useContext } from "react";
import { View, Text, Pressable } from "react-native";
import NotesContext from "../../context/Notes"; // Import the context
import { router, useRouter } from "expo-router";

export default function CardCategory() {
  const { setCategory } = useContext(NotesContext); // Access setCategory from context
  const [ccategory, setCcategory] = useState([]); // Make sure to initialize as an empty array
  const [selectedCategory, setSelectedCategory] = useState(null); // To track the selected category
  const router = useRouter();

  useEffect(() => {
    const url = "https://backend-rn-ptjg.onrender.com/api/note/categories";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setCcategory(json.categories); // Expecting the categories in this format
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const handleButtonPress = (category) => {
    setCategory(category); // Update the category in context
    setSelectedCategory(category); // Track selected category
    router.push("/card");
  };

  return (
    <View className="flex-1 justify-center items-center bg-gray-100 p-4">
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

      {selectedCategory && (
        <Text className="mt-5 text-lg text-blue-500">
          Selected Category: {selectedCategory}
        </Text>
      )}
    </View>
  );
}

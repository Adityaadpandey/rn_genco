import React, { useEffect, useState, useContext } from "react";
import { View, Text, Pressable, ActivityIndicator, Alert } from "react-native";
import NotesContext from "../../context/Notes"; // Import the context
import { useRouter } from "expo-router";

export default function SubCategory() {
  const { category, setSubCategory } = useContext(NotesContext); // Access category and setSubCategory from context
  const [subCategory, setSubCategoryState] = useState([]); // Initialize as an empty array
  const [loading, setLoading] = useState(true); // State to manage loading
  const [selectedSubCategory, setSelectedSubCategory] = useState(null); // Track selected subcategory
  const router = useRouter();

  useEffect(() => {
    const fetchSubCategories = async () => {
      if (!category) {
        Alert.alert("Error", "No category selected");
        setLoading(false);
        return;
      }

      const url = `https://backend-rn-ptjg.onrender.com/api/note/subcategories?category=${category}`; // Use category from context

      try {
        const response = await fetch(url);
        const json = await response.json();
        if (json.subcategories) {
          setSubCategoryState(json.subcategories); // Set the fetched subcategories
        } else {
          Alert.alert("Error", "No subcategories available");
        }
      } catch (error) {
        console.log("error", error);
        Alert.alert("Error", "Failed to fetch subcategories");
      } finally {
        setLoading(false); // Stop the loader
      }
    };

    fetchSubCategories();
  }, [category]); // Fetch subcategories whenever the category changes
    try {
      console.log("subcategories " + subCategory + " has been fetched");
    }
    catch (error) {
      console.error(error)
    }
  const handleSubCategoryPress = (subCategory) => {
    setSubCategory(subCategory); // Set the selected subcategory in context
    setSelectedSubCategory(subCategory); // Track the selected subcategory
    router.push("/card"); // Navigate to the notes page
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#00ff00" />
        <Text className="text-lg mt-4 text-green-600">Loading subcategories...</Text>
      </View>
    );
  }

  return (
      <View className="flex-1 justify-center items-center bg-gray-100 p-4 ">
          <Text className="text-3xl text-pink-600 m-20">{category}</Text>
      {subCategory?.length > 0 ? (
        <View className="w-full flex flex-wrap flex-row justify-center">
        {subCategory.map((item, index) => (
          <Pressable
            key={index}
            onPress={() => handleSubCategoryPress(item)}
            className="w-5/12 m-2 bg-blue-500 p-4 rounded-lg shadow-md justify-center items-center"
          >
            <Text className="text-white text-center text-xl font-semibold">
              Chapter {item}
            </Text>
          </Pressable>
        ))}
      </View>
      
      ) : (
        <Text className="text-3xl text-red-500">No subcategories available</Text>
      )}

      {selectedSubCategory && (
        <Text className="text-lg text-blue-500 mt-4">
          Selected SubCategory: {selectedSubCategory}
        </Text>
      )}
    </View>
  );
}
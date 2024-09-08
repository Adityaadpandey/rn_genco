import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import NotesContext from "../../context/Notes"; // Import the context
import { router,useRouter } from "expo-router";

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
    router.push('/card')
    
  };

  return (
    <View style={styles.container}>
      {ccategory.length > 0 ? (
        ccategory.map((category, index) => (
          <Button
            key={index}
            title={category}
            onPress={() => handleButtonPress(category)
              
            } // On pressing, update the selected category
          />
        ))
      ) : (
        <Text>No categories available</Text>
      )}

      {selectedCategory && (
        <Text style={styles.selectedText}>Selected Category: {selectedCategory}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedText: {
    marginTop: 20,
    fontSize: 18,
    color: "blue",
  },
});

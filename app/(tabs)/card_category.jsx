import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const { width, height } = Dimensions.get("window");

export default function card_category() {
  const [ccategory, setCcategory] = useState([null]);

  useEffect(() => {
    const url = "https://backend-rn-ptjg.onrender.com/api/note/categories";

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json);
        setCcategory(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, []);

  const categories = ccategory.categories || [];

  return (
    <View style={styles.container}>
      {categories.length > 0 ? (
        categories.map((category, index) => (
          <Button
            key={index}
            title={category}
            onPress={() => handleButtonPress(category)}
          />
        ))
      ) : (
        <Text>No categories available</Text>
      )}
    </View>
  );
}
const handleButtonPress = (category) => {
  console.log(`You pressed: ${category}`);
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

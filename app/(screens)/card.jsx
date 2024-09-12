import React, { useContext } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesContext from "../../context/Notes"; // Import the context
import { SafeAreaView } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

export default function Card() {
  const { notes, category } = useContext(NotesContext); // Access notes and category from context
console.log("Card")
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView style={styles.container}>
      <Text style={styles.categoryHeader}>{category}</Text>

      {category ? ( // Only show notes if a category is selected
        <>
          <FlatList
            data={notes}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.container}
          />
        </>
      ) : (
        <Text style={styles.noCategoryText}>
          Select a category to view notes
          </Text>

        )}
        </SafeAreaView>
    </GestureHandlerRootView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#F2F2F2",
    justifyContent: "center",
  },
  card: {
    width: width * 0.8, // 80% of the screen width
    height: height * 0.7, // 70% of the screen height
    backgroundColor: "#4A4A4A",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 10,
    marginHorizontal: width * 0.1, // Center the card horizontally
  },
  title: {
    fontSize: 24,
    color: "#F5A623",
    fontWeight: "bold",
    paddingBottom: 50,
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    color: "white",
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  categoryHeader: {
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
    marginBottom: 60,
    fontWeight: "bold",
    textTransform: "uppercase",
    marginVertical: 10,
    color: "#333",
  },
  noCategoryText: {
    textAlign: "center",
    fontSize: 16,
    marginVertical: 20,
    color: "#666",
  },
});

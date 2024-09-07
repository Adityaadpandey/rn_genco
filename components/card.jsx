import React, { useContext } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import NotesContext from "../context/Notes"; // Import the context


const { width, height } = Dimensions.get("window");

export default function Card() {
  const { notes } = useContext(NotesContext); // Access notes from context

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.content}>{item.content}</Text>
    </View>
  );


  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <FlatList
        data={notes}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        // contentContainerStyle={{ alignItems: "center" }}
        contentContainerStyle={styles.container}
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    // height,
  },
  card: {
    width: width * 0.8, // 80% of the screen width
    height: height * 0.7, // 50% of the screen height
    backgroundColor: "#696969",
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
    color: "#e6e6fa",
    fontWeight: "bold",
    paddingBottom: 50,
    marginBottom: 10,
  },
  content: {
    fontSize: 18,
    color: "white",
    paddingBottom: 100,
    // marginBottom: 10,
    // textAlign: 'center',
    paddingHorizontal: 20,
  },
});

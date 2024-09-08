import React, { createContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const NotesContext = createContext([]);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("cse111_1"); // Default category

  useEffect(() => {
    const url = `https://backend-rn-ptjg.onrender.com/api/note/fetchallnotes?category=${category}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        console.log(json)
        setNotes(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [category]);

  return (
    <NotesContext.Provider value={{ notes, setNotes, category, setCategory }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;
import React, { createContext, useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, FlatList, TextInput, Button } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
const NotesContext = createContext([]);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("cse111_1"); // Default category
  const [subCategory, setSubCategory] = useState(null); // Default sub-category

  useEffect(() => {
    // Fetch notes using both category and sub-category (if exists)
    const url = `https://backend-rn-ptjg.onrender.com/api/note/fetchallnotes?category=${category}${subCategory ? `&sub_category=${subCategory}` : ""}`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setNotes(json);
      } catch (error) {
        console.log("error", error);
      }
    };

    fetchData();
  }, [category, subCategory]); // Fetch notes when either category or subCategory changes

  return (
    <NotesContext.Provider value={{ notes, setNotes, category, setCategory, subCategory, setSubCategory }}>
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;

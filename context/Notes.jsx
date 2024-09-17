import React, { createContext, useState, useEffect } from "react";

const NotesContext = createContext([]);

export const NotesProvider = ({ children }) => {
  const [notes, setNotes] = useState([]);
  const [category, setCategory] = useState("cse111_1"); // Default category
  const [subCategory, setSubCategory] = useState(null); // Default sub-category
  const [quizQuestions, setQuizQuestions] = useState([]); // State to store quiz questions
  const [quizCategory, setQuizCategory] = useState(""); // Category for quiz
  const [quizSubCategory, setQuizSubCategory] = useState(""); // Sub-category for quiz

  // Fetch notes based on category and sub-category
  useEffect(() => {
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
  }, [category, subCategory]);

  // Fetch quiz questions based on category and sub-category
  const fetchQuizQuestions = async (category, subCategory) => {
    const url = `https://backend-rn-ptjg.onrender.com/api/quiz/fetchallnotes?category=${category}&sub_category=${subCategory}`;

    try {
      const response = await fetch(url);
      const json = await response.json();
      console.log("success", json);
      if (json && Array.isArray(json)) {
        setQuizQuestions(json); // Set the quiz questions in state
        setQuizCategory(category); // Update the category for quiz
        setQuizSubCategory(subCategory); // Update the sub-category for quiz
      } else {
        console.error("Quiz data not found");
      }
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <NotesContext.Provider
    value={{
      notes,
      setNotes,
      category,
      setCategory,
      subCategory,
      setSubCategory,
      quizQuestions,
      fetchQuizQuestions, // Expose fetchQuizQuestions
      quizCategory,
      setQuizCategory,
      quizSubCategory,
      setQuizSubCategory, // Expose setQuizSubCategory
    }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export default NotesContext;

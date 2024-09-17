import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, SafeAreaView, Alert, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

// Generate a valid Sudoku board
const generateSudokuBoard = () => {
  const baseBoard = [
    [5, 3, 4, 6, 7, 8, 9, 1, 2],
    [6, 7, 2, 1, 9, 5, 3, 4, 8],
    [1, 9, 8, 3, 4, 2, 5, 6, 7],
    [8, 5, 9, 7, 6, 1, 4, 2, 3],
    [4, 2, 6, 8, 5, 3, 7, 9, 1],
    [7, 1, 3, 9, 2, 4, 8, 5, 6],
    [9, 6, 1, 5, 3, 7, 2, 8, 4],
    [2, 8, 7, 4, 1, 9, 6, 3, 5],
    [3, 4, 5, 2, 8, 6, 1, 7, 9],
  ];
  return baseBoard;
};

// Create a puzzle by removing a given number of cells (emptyCells)
const createPuzzle = (board, emptyCells = 30) => {
  const puzzle = board.map(row => [...row]);
  let count = emptyCells;
  while (count > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0; // Remove this cell
      count--;
    }
  }
  return puzzle;
};

const Sudoku = () => {
  const [board, setBoard] = useState([]); // Full board with all answers
  const [puzzle, setPuzzle] = useState([]); // Puzzle with some cells removed
  const [inputPuzzle, setInputPuzzle] = useState([]); // User input puzzle

  // Initialize the board and puzzle
  useEffect(() => {
    const initialBoard = generateSudokuBoard(); // Generate a new board
    const initialPuzzle = createPuzzle(initialBoard, 40); // Create a puzzle with 40 empty cells
    setBoard(initialBoard); // Set the complete board
    setPuzzle(initialPuzzle); // Set the puzzle with empty cells
    setInputPuzzle(initialPuzzle.map(row => [...row])); // Copy the puzzle for user input
  }, []);

  // Handle input changes for each cell
  const handleInputChange = (value, row, col) => {
    const updatedPuzzle = [...inputPuzzle];
    updatedPuzzle[row][col] = parseInt(value) || 0;
    setInputPuzzle(updatedPuzzle);
  };

  // Check if the user’s input matches the solution
  const checkSolution = () => {
    const isSolved = board.every((row, rowIndex) =>
      row.every((num, colIndex) => num === inputPuzzle[rowIndex][colIndex])
    );
    Alert.alert(isSolved ? 'Congrats!' : 'Try Again!', isSolved ? 'You solved the puzzle!' : 'The solution is incorrect.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1"
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <SafeAreaView className="flex-1 bg-gray-100 justify-center items-center p-4">
          <Text className="text-4xl text-pink-600 mb-6">Sudoku</Text>

          {/* Sudoku Grid */}
          <View className="w-full flex items-center mb-6">
            {puzzle.map((row, rowIndex) => (
              <View key={rowIndex} className="flex flex-row justify-center">
                {row.map((cell, colIndex) => (
                  <View
                    key={`${rowIndex}-${colIndex}`}
                    className={`border border-gray-400 justify-center items-center ${
                      (Math.floor(rowIndex / 3) + Math.floor(colIndex / 3)) % 2 === 0
                        ? 'bg-gray-200'
                        : 'bg-white'
                    }`}
                    style={{ width: 40, height: 40 }}
                  >
                    {/* If cell is empty, allow user input */}
                    {cell === 0 ? (
                      <TextInput
                        className="text-xl text-center"
                        keyboardType="number-pad"
                        maxLength={1}
                        value={inputPuzzle[rowIndex][colIndex] === 0 ? '' : inputPuzzle[rowIndex][colIndex].toString()}
                        onChangeText={(value) => handleInputChange(value, rowIndex, colIndex)}
                        style={{ width: '100%', height: '100%' }}
                      />
                    ) : (
                      <Text className="text-xl">{cell}</Text>
                    )}
                  </View>
                ))}
              </View>
            ))}
          </View>

          {/* Button to Check Solution */}
          <Pressable
            className="bg-blue-500 p-4 rounded-lg w-full max-w-xs"
            onPress={checkSolution}
          >
            <Text className="text-white text-center font-semibold">Check Solution</Text>
          </Pressable>
        </SafeAreaView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default Sudoku;

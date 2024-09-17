import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router'

const _layout = () => {
  return (
    <Stack>
        <Stack.Screen name="Quiz" options={{ headerShown: false }}/>
        <Stack.Screen name="QuizCategory" options={{ headerShown: false }}/>
        <Stack.Screen name="QuizSubCategory" options={{ headerShown: false }}/>
     </Stack>
  )
}

export default _layout

const styles = StyleSheet.create({})
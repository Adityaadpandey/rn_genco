import { StyleSheet, Text, View } from 'react-native'
import { Stack } from 'expo-router'
import React from 'react'

const _layout = () => {
  return (
      <>
      <Stack>
        <Stack.Screen name="progress" options={{ headerShown: false }}/>
     </Stack>
      </>
  )
}

export default _layout

const styles = StyleSheet.create({})
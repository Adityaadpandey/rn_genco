import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Link } from "expo-router";

export default function App() {
  return (
    <View className="flex-1 items-center justify-center bg-fuchsia-300">
      <Text className="text-2xl font-pblack">Moce</Text>
      <Link href="/home">go to home</Link>
    </View>
  );
}

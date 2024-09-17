import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image } from 'react-native';


const profile = () => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();
  console.log("nice" + user)
  try {
    i = user.img
  }
  catch (error) {
    console.error(error)
  }
  return (
    <SafeAreaView>
      {isLogged ? (
        <View>
          <Text>Welcome, {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
          {/* <Image
          source={{ uri: {i} }} // Replace with actual image URL
          className="w-full h-full object-cover opacity-80"
        /> */}
          
        </View>
      ) : (
        <Text>Please log in to see your profile.</Text>
      )}
      {/* <Loader isLoading={loading} /> */}
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </SafeAreaView>
  )
}

export default profile

const styles = StyleSheet.create({})
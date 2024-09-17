import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRouter } from "expo-router";
import { useGlobalContext } from "../../context/GlobalContext";
import { SafeAreaView } from 'react-native-safe-area-context';


const profile = () => {
  const router = useRouter();
  const { user, isLogged } = useGlobalContext();
  console.log( "nice"+user)
  return (
    <SafeAreaView>
      {isLogged ? (
        <View>
          <Text>Welcome, {user?.name}</Text>
          <Text>Email: {user?.email}</Text>
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
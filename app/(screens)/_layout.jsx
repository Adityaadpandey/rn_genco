import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs, Redirect, Stack } from "expo-router";
import { icons } from "../../constants";
import { StatusBar } from "expo-status-bar";


const TabsLayout = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Stack>
        <Stack.Screen name="card" options={{ headerShown: false }}/>
     </Stack>

      {/* <Loader isLoading={loading} /> */}
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};
export default TabsLayout;


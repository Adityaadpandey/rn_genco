import React from "react";
import { Tabs, Redirect, Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useGlobalContext } from "../../context/GlobalContext";
import Loader  from "../../components/Loader";


const TabsLayout = () => {
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;


  return (
    <>
      <Stack>
        <Stack.Screen name="Sign_in" options={{ headerShown: false }} />
        <Stack.Screen name="Sign_up" options={{ headerShown: false }} />
     </Stack>

      {/* <Loader isLoading={loading} /> */}
      <Loader isLoading={loading} />
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
};
export default TabsLayout;


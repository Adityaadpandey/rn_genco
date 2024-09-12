import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { icons } from "../../constants";

// TabIcon Component to render tab icons based on focused state and selected tab name
const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View className="flex items-center justify-center gap-2">
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        className="w-6 h-6"
      />
      <Text
        className={`${focused ? "font-psemibold" : "font-pregular"} text-xs`}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  // const { loading, isLogged } = useGlobalContext();

  // if (!loading && !isLogged) return <Redirect href="/sign-in" />;

  return (
    <>
      <Tabs>
        <Tabs.Screen
          name="card"
          options={{
            title: "card",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                // name="cards"
                focused={focused}
              />
            ),
          }}
        />
        
      </Tabs>

      {/* <Loader isLoading={loading} /> */}
      {/* <StatusBar backgroundColor="#161622" style="light" /> */}
    </>
  );
};
export default TabsLayout;

const styles = StyleSheet.create({});

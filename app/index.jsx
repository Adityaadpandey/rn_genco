import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView, ImageBackground } from "react-native";
import { useRouter,Redirect } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import Genco from "../assets/hmbg.png";
import { useGlobalContext } from "../context/GlobalContext";
// import pic from '../assets/images/cards.png';

export default function App() {
  const router = useRouter();
  const { loading, isLogged } = useGlobalContext();

  if (!loading && isLogged) return <Redirect href="/home" />;

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <StatusBar barStyle="light-content" />
      
      {/* <ScrollView contentContainerStyle={{ flexGrow: 1 }}> */}
        <View className="flex-1 justify-center items-center px-4 mt-50 mb-16">
          <Text className="text-8xl mt-0.5 text-white text-center font-Poppins-Medium ">
            Genco
          </Text>

          <Image
            source={Genco}
            className="max-w-200  max-h-60 m-10"
            resizeMode="contain"
          />

          <View className="mt-5 mb-11">
          {/* <Text className="text-3xl text-white font-psemibold text-center">
              Let's Start
            </Text> */}
            <Text className="text-3xl text-white font-psemibold text-center">
              Supercharge your learning with our app!
            </Text>
          </View>

          {/* <CustomButton
            title=" Let's Start"
            handlePress={() => router.push("/home")}
            containerStyles="w-full mt-5"
          /> */}
          <CustomButton
            title=" Let's Start"
            handlePress={() => router.push("/Sign_in")}
            containerStyles="w-full mt-5"
          />
        </View>
        {/* </ScrollView> */}
    </SafeAreaView>
  );
}

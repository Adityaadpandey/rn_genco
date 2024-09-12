import { StatusBar } from "expo-status-bar";
import { Text, View, Image, ScrollView, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomButton from "../components/CustomButton";
import Genco from "../assets/icon.png";
import { LinearGradient } from "expo-linear-gradient";
// import pic from '../assets/images/cards.png';

export default function App() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-primary h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="flex-1 justify-center items-center px-4 mt-16 mb-16">
          <Text className="text-7xl text-white text-center font-Poppins-Medium ">
            Genco
          </Text>

          <Image
            source={Genco}
            className="max-w-full w-full h-72 m-15px"
            resizeMode="contain"
          />

          <View className="mt-5 mb-11">
            <Text className="text-lg text-purple-300 font-psemibold text-center">
              Supercharge your learning with our app! Flashcards, quizzes,
              simulation, and community support—all in one place. I, earn,
              connect, and grow with us!
            </Text>
          </View>

          <CustomButton
            title="Continue with Email"
            handlePress={() => router.push("/home")}
            containerStyles="w-full mt-5"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

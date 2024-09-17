import React, { createContext, useContext, useState } from "react";
import * as SecureStore from 'expo-secure-store';
import { Alert } from "react-native";


const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLogged, setIsLogged] = useState(false);

  const handleLogin = async (email, password) => {
    try {
      const response = await fetch('https://backendrn-production.up.railway.app/api/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const json = await response.json();

      if (json.success) {
        const token = json.authtoken;
        // console.log(json);
        await SecureStore.setItemAsync('authtoken', token);
        setIsLogged(true);

        // Fetch user data after login
        await fetchUserData();
        Alert.alert('Success', 'Sign-in Successful!');
      } else {
        Alert.alert('Error', json.message || 'Login failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleSignup = async (name, email, password) => {
    try {
      const response = await fetch('https://backendrn-production.up.railway.app/api/user/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const json = await response.json();

      if (json.success) {
        Alert.alert('Success', 'Sign-up Successful!');
        console.log(json);
        await handleLogin(email, password); // Log in the user after sign-up
      } else {
        Alert.alert('Error', json.message || 'Sign-up failed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const fetchUserData = async () => {
    const token = await SecureStore.getItemAsync('authtoken');
    if (token) {
      try {
        const response = await fetch('https://backendrn-production.up.railway.app/api/user/getuser', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'auth-token': token,
          },
        });
        const json = await response.json();
        if (json!==null) {
          setUser(json); // Store user data in context
          console.log(json);
        } else {
          Alert.alert('Error', 'Failed to fetch user data');
        }
      } catch (error) {
        Alert.alert('Error', error.message);
      }
    } else {
      setIsLogged(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        user,
        setUser,
        isLogged,
        setIsLogged,
        handleLogin,
        handleSignup,
        fetchUserData,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => useContext(GlobalContext);

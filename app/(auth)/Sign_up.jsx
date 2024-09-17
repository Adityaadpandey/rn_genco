import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import { GlobalContext } from '../../context/GlobalContext';
import { Link } from 'expo-router';

const Sign_up = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { handleSignup } = useContext(GlobalContext);

  const onSignUp = async () => {
    const result = await handleSignup(email, password);
    if (result.success) {
      Alert.alert('Success', 'Sign-up Successful!');
    } else {
      Alert.alert('Error', result.message || 'Sign-up failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={onSignUp} />

      {/* Link to sign-in page */}
      <Link href="/auth/sign-in" style={styles.link}>
        Already have an account? Sign In
      </Link>
    </View>
  );
};

export default Sign_up;

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  link: {
    fontSize: 16,
    color: '#3498db',
    marginVertical: 10,
    textAlign: 'center',
  },
});

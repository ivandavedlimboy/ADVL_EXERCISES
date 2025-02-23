import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    Alert.alert('Login Pressed', `Email: ${email}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>LOG-IN</Text>
      <View style={styles.loginBox}>
        <Text style={styles.title}>ADVL_EXERCISE PORTAL</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.registerButton} onPress={() => router.push('/register')}>
          <Text style={styles.registerText}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 45,
    alignItems: 'center',
    backgroundColor: '#F0F2F5', 
  },
  mainTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'medium',
    marginBottom: 18,
  },
  loginBox: {
    backgroundColor: '#fff',
    width: 400,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    elevation: 5,
    },
  input: {
    height: 45,
    width: '100%',
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  loginButton: {
    backgroundColor: 'teal',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  registerButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 5,
    borderColor: 'teal',
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  registerText: {
    color: 'teal',
    fontWeight: 'bold',
  },
});

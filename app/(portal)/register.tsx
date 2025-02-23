import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from "expo-router";

export default function Register() {
  const defaultImage = require("../../assets/images/no_profile.webp"); 
  const [image, setImage] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setImage(result.assets[0].uri);
    }
  };

  const handleRegister = () => {
    Alert.alert('Register Pressed', `Name: ${name}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>REGISTER</Text>
      <View style={styles.registerBox}>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
          <Image source={image ? { uri: image } : defaultImage} style={styles.image} />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
        />
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
        <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.loginButton} onPress={() => router.push('/login')}>
          <Text style={styles.buttonTextAlt}>Login</Text>
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
  registerBox: {
    backgroundColor: '#fff',
    width: 400,
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.2)",
    elevation: 5,
  },
  
  imagePicker: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  registerButton: {
    backgroundColor: 'teal',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
  },
  loginButton: {
    marginTop: 10,
    padding: 12,
    borderRadius: 5,
    borderColor: 'teal',
    borderWidth: 1,
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#fff',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonTextAlt: {
    color: 'teal',
    fontWeight: 'bold',
  },
});

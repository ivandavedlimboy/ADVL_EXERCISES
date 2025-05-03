import React, { useEffect, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { auth } from "@/config/firebase";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";

export default function Dashboard() {
  const [userName, setUserName] = useState<string | null>(null);
  const [userImage, setUserImage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setUserName(user.displayName);
      setUserImage(user.photoURL);
    }
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.mainTitle}>Welcome to the Dashboard</Text>
      <View style={styles.userInfo}>
        <Image
          source={userImage ? { uri: userImage } : require("../../assets/images/no_profile.webp")}
          style={styles.profileImage}
        />
        <Text style={styles.userName}>{userName || "No name available"}</Text>
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0F2F5",
  },
  mainTitle: {
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 68,
  },
  userInfo: {
    alignItems: "center",
    marginBottom: 30,
  },
  profileImage: {
    width: 180,
    height: 180,
    borderRadius: 90,
    marginBottom: 30,
    resizeMode: "cover",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "teal",
    padding: 12,
    borderRadius: 5,
    width: 200,
    alignItems: "center",
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
});

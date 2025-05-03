import { Button, Text, View } from "react-native";
import { useEffect, useState } from "react";
import { auth } from "@/config/firebase";
import { router } from "expo-router";

export default function Dashboard() {

  useEffect(() => {
    console.log("Settings");
    console.log(auth.currentUser);
  }, []);


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}>
        <Text>Settings</Text>
    </View>
  );
}
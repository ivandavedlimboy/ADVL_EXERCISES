import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="login"/>
      <Stack.Screen name="register"/>
      <Stack.Screen name="dashboard" options={{ title: "Home" }}/>
      <Stack.Screen name="settings"/>
    </Stack>
  );
}




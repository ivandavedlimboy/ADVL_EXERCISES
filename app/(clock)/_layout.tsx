import { Tabs } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="clock"
        options={{
          title: "CLOCK",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="schedule" color={color} />
          ),
        }}
      />
            <Tabs.Screen
        name="timer"
        options={{
          title: "TIMER",
          tabBarIcon: ({ color }) => (
            <MaterialIcons size={28} name="timer" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}

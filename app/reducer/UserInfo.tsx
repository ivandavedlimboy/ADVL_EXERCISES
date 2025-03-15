import { useContext } from "react";
import { View, Text } from "react-native";
import { UserInfoContext } from "./_layout";

export default function UserInfo() {
  const user = useContext(UserInfoContext);
  if (!user) return <Text>No user data available.</Text>;

  return (
    <View>
      <Text>Name: {user.name}</Text>
      <Text>Email: {user.email}</Text>
    </View>
  );
}

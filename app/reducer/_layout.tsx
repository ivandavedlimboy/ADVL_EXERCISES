import { Stack } from "expo-router";
import { createContext, ReactNode } from "react";

interface UserInfo {
  name: string;
  email: string;
}

export const UserInfoContext = createContext<UserInfo | null>(null);

export default function RootLayout() {
  const user: UserInfo = {
    name: "User Name",
    email: "email@email.com",
  };

  return (
    <UserInfoContext.Provider value={user}>
      <Stack />
    </UserInfoContext.Provider>
  );
}

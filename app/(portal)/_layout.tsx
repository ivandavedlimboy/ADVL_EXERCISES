import { Stack } from "expo-router";

export default function layout() {
    return (
        <Stack>
            <Stack.Screen
            name="login"
            options={{ headerTitle: "", }}/>;
            <Stack.Screen
            name="register"
            options={{ headerTitle: "", }}/>
        </Stack>
    )
}

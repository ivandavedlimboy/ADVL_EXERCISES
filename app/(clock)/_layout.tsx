import { Stack } from "expo-router";

export default function Layout() {
    return (
        <Stack>
            <Stack.Screen
            name="tally"/>
             <Stack.Screen
            name="stopwatch"/>
        </Stack>
    )
}
import { Tabs } from "expo-router";
import MaterialIcons from '@expo/vector-icons/MaterialIcons';


export default function Layout() {


    return(
        <Tabs>
            <Tabs.Screen
            name="index"
            options={{
                title: "Home",
                tabBarIcon: ({ color }) =>
                    <MaterialIcons size={(28)} name="home" color={color}/>
            }}
            />
            <Tabs.Screen
            name="exercise"
            options={{
                title: "Exercise",
                tabBarIcon: ({ color }) =>
                    <MaterialIcons size={(28)} name="add-card" color={color}/>
            }}
            />
        </Tabs>
    )
}

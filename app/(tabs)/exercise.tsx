import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import HTMLView from 'react-native-htmlview';
import { useRouter } from "expo-router";

export default function Exercise() {
    const router = useRouter();

    const c1 = `<strong><p>React-Native introduction</p></strong>
    <ul>
    <li>Create a React-Native window in Visual Code</li>
    <li>Input full name in the display</li>
    </ul>
    <p>STATUS: COMPLETED</p>`;

    const c2 = `<strong><p>React-Native Home-Exercise web project<p></strong>
    <ul>
    <li>Home – In the Home tab, display your full name</li>
    <li>Exercise – In the Exercises tab, create cards that list the exercises with descriptions rendered in HTML</li>
    </ul>
    <p>STATUS: COMPLETED</p>`;

    const c3 = `<strong><p>Log-in Screen<p></strong>
    <ul>
    <li>Must incorporate;</li>
    <li>Email (Text Input)</li>
    <li>Password (Text Input)</li>
    <li>Login (Button)</li>
    </ul>
    <p>STATUS: COMPLETED</p>`;

    const c5 = `<strong><p>Register Screen<p></strong>
    <ul>
    <li>Must incorporate;</li>
    <li>Image (Image picker when image selected should display the image selected)</li>
    <li>Email (Text Input)</li>
    <li>Name (Text Input)</li>
    <li>Password (Text Input)</li>
    <li>Register (Button)</li>
    </ul>
    <p>STATUS: COMPLETED</p>`;
    
    const c4 = `<strong><p>Stopwatch<p></strong>
    <ul>
    <li>Using the useState and useEffect hooks, create a stopwatch with two buttons:</li>
    <li>one for Start/Stop</li>
    <li>and one for Reset</li>
    </ul>
    <p>STATUS: COMPLETED</p>`;

    const [tasks, setTasks] = useState([
        { note: 'Exercise 1', content: c1, isHtml: true, key: '1', expanded: false },
        { note: 'Exercise 2', content: c2, isHtml: true, key: '2', expanded: false },
        { note: 'Exercise 3', content: c3, isHtml: true, key: '3', expanded: false },
        { note: 'Exercise 4', content: c4, isHtml: true, key: '4', expanded: false },
        { note: 'Exercise 5', content: c5, isHtml: true, key: '5', expanded: false },
        { note: 'Exercise 6', content: '', isHtml: false, key: '6', expanded: false },
    ]);

    const toggleContent = (key: string) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.key === key ? { ...task, expanded: !task.expanded } : task
            )
        );
    };

    const handleLongPress = (key: string) => {
        if (key === '3') {
            router.push('/login');
        } else if (key === '4') {
            router.push('/timer');
        } else if (key === '5') {
        router.push('/register');
        } else if (key === '6') {
            router.push('/reducer/usereducer')
        }
    };

    return (
        <View style={styles.container}>
            <ScrollView>
                {tasks.map((item) => (
                    <TouchableOpacity
                        key={item.key}
                        onPress={() => toggleContent(item.key)}
                        onLongPress={() => handleLongPress(item.key)}
                    >
                        <View style={styles.item}>
                            <Text style={styles.text}>{item.note}</Text>
                            {item.expanded && item.isHtml && (
                                <HTMLView value={item.content} stylesheet={htmlStyles} />
                            )}
                        </View>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingTop: 20,
        paddingHorizontal: 25,
    },
    item: {
        marginTop: 10,
        padding: 25,
        borderRadius: 20,
        backgroundColor: 'teal',
    },
    text: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    }
});

const htmlStyles = StyleSheet.create({
    p: {
        fontSize: 20,
        color: 'white',
        textAlign: 'left',
        margin: 0,
        padding: 0,
    },
    strong: {
        fontWeight: 'bold',
    },
    ul: {
        textAlign: 'left',
        margin: 0,
        padding: 0,
    },
    li: {
        color: 'white',
        margin: 0,
        padding: 0,
    }
});
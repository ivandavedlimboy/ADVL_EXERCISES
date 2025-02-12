import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import HTMLView from 'react-native-htmlview';

export default function Exercise() {

const content1 = `<strong><p>React-Native introduction</p></strong>
<ul>
<li>Create a React-Native window in Visual Code</li>
<li>Input full name in the display</li>
</ul>
<p>STATUS: COMPLETED</p>`;

const content2 = `<strong><p>React-Native Home-Exercise web project<p></strong>
<ul>
<li>Home – In the Home tab, display your full name</li>
<li>Exercise – In the Exercises tab, create cards that list the exercises with descriptions rendered in HTML</li>
</ul>
<p>STATUS: COMPLETED</p>`;

    const [task, setTask] = useState([
        { note: 'Exercise 1', content: content1, isHtml: true, key: '1' },
        { note: 'Exercise 2', content: content2, isHtml: true, key: '2' },
        { note: 'Exercise 3', content: '', isHtml: false, key: '3' },
        { note: 'Exercise 4', content: '', isHtml: false, key: '4' },
        { note: 'Exercise 5', content: '', isHtml: false, key: '5' },
        { note: 'Exercise 6', content: '', isHtml: false, key: '6' },
    ]);

    return (
        <View style={styles.container}>
            <ScrollView>
                {task.map((item) => {
                    return (
                        <View key={item.key} style={styles.item}>
                            <Text style={styles.text}>{item.note}</Text>
                            {item.isHtml ? (
                                <HTMLView value={item.content} stylesheet={htmlStyles} />
                            ) : null}
                        </View>
                    );
                })}
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
        fontSize: 50,
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

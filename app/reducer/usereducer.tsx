import { useReducer, useState } from "react";
import { View, TextInput, Button, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";

// Reducer function
function handleTodoReducer(state: { id: number; title: string }[], action: any) {
    switch (action.type) {
        case "add":
            return [...state, { id: Date.now(), title: action.todo }];
        case "delete":
            return state.filter((todo) => todo.id !== action.id);
        case "update":
            return state.map((todo) => (todo.id === action.id ? { ...todo, title: action.newTitle } : todo));
        case "clear":
            return [];
        default:
            return state;
    }
}

export default function UsereducerScreen() {
    const [todos, todosDispatch] = useReducer(handleTodoReducer, []);
    const [todo, setTodo] = useState("");
    const [editing, setEditing] = useState<{ id: number | null; text: string }>({ id: null, text: "" });

    function addTodo() {
        if (todo.trim() !== "") {
            todosDispatch({ type: "add", todo });
            setTodo("");
        }
    }

    function deleteTodo(id: number) {
        todosDispatch({ type: "delete", id });
    }

    function updateTodo() {
        if (editing.text.trim() !== "") {
            todosDispatch({ type: "update", id: editing.id, newTitle: editing.text });
            setEditing({ id: null, text: "" });
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Todo List</Text>

            <TextInput
                value={todo}
                onChangeText={setTodo}
                placeholder="Enter a task"
                style={styles.input}
            />
            <Button onPress={addTodo} title="Add Todo" color="#007BFF" />

            {editing.id !== null && (
                <View style={styles.editContainer}>
                    <TextInput
                        value={editing.text}
                        onChangeText={(text) => setEditing({ ...editing, text })}
                        placeholder="Edit task"
                        style={styles.input}
                    />
                    <Button onPress={updateTodo} title="Update Todo" color="green" />
                </View>
            )}

            <FlatList
                data={todos}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <View style={styles.todoItem}>
                        <Text style={styles.todoText}>{item.title}</Text>
                        <View style={styles.todoActions}>
                            <TouchableOpacity onPress={() => setEditing({ id: item.id, text: item.title })}>
                                <Text style={styles.editButton}>Edit</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => deleteTodo(item.id)}>
                                <Text style={styles.deleteButton}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />

            {todos.length > 0 && (
                <Button onPress={() => todosDispatch({ type: "clear" })} title="Clear All" color="red" />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20, backgroundColor: "#fff" },
    header: { fontSize: 22, fontWeight: "bold", marginBottom: 10, textAlign: "center" },
    input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 10, borderRadius: 5 },
    editContainer: { marginTop: 10 },
    todoItem: { flexDirection: "row", justifyContent: "space-between", padding: 10, borderBottomWidth: 1, borderColor: "#ddd" },
    todoText: { fontSize: 16 },
    todoActions: { flexDirection: "row", gap: 10 },
    editButton: { color: "blue", marginRight: 10 },
    deleteButton: { color: "red" },
});


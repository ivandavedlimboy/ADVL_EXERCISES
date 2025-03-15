import { useEffect, useRef, useState } from "react";
import { Text, View, Button, TextInput } from "react-native";

export default function Useref() {
  const count = useRef<number>(0);
  const viewElement = useRef<View | null>(null);
  const textInputRef = useRef<TextInput | null>(null);
  const [state, setState] = useState(0); // To trigger re-renders

  useEffect(() => {
    if (viewElement.current) {
      viewElement.current.setNativeProps({ style: { backgroundColor: "pink" } });
    }
    textInputRef.current?.focus();
  }, []);

  return (
    <View ref={viewElement} style={{ padding: 20 }}>
      <Text style={{ fontSize: 100 }}>{state}</Text>
      <Button
        onPress={() => {
          count.current += 1;
          setState(count.current); // Force re-render
        }}
        title="Click Me!"
      />
      <TextInput ref={textInputRef} style={{ borderColor: "#000", borderWidth: 1, marginTop: 20 }} />
    </View>
  );
}

import { useState } from "react";
import { Button, Text, View } from "react-native";


export default function tally() {
    const [count, setCount] = useState(0);

    function handleButtonPress() {

        setCount(function (c) {
            return c + 1;
        })
    }


    return (
        <View style = {{ padding: 20}}>
            <Text
            style = {{fontSize: 100, fontWeight: 600 }}>
                {count}
            </Text>
            <Button
            onPress={handleButtonPress}
            title="Push"
            />
        </View>
    );


}


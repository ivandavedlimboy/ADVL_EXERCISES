import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";

export default function stopwatch() {
  const [time, setTime] = useState(0);  
  const [start, setStart] = useState(false);  

  useEffect(() => {
    let interval = null;

   
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 1);  
      }, 1000); 
    } else {
      clearInterval(interval);  
    }

  
    return () => clearInterval(interval);
  }, [start]);  

  function handleStart() {
    setStart(!start);  
  }

  function handleReset() {
    setTime(0);  
    setStart(false); 
  }

 
  const hours = Math.floor(time / 3600); 
  const minutes = Math.floor((time % 3600) / 60);  
  const seconds = time % 60;  
  
  const formattedTime = `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 48 }}>
        {formattedTime}
      </Text>

      <Button title="Reset" onPress={handleReset} />
      <Button 
        onPress={handleStart} 
        title={!start ? "Start" : "Stop"} 
      />
    </View>
  );
}
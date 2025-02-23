import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function timer() {
  const [time, setTime] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (start) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [start]);

  function handleStart() {
    setStart(!start);
  }

  function handleReset() {
    setTime(0);
    setStart(false);
  }

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = Math.floor((time % 1000) / 10);

  return (
    <View style={styles.container}>
      <View style={styles.timerContainer}>
        <Text style={styles.timeBox}>{String(hours).padStart(2, "0")}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.timeBox}>{String(minutes).padStart(2, "0")}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.timeBox}>{String(seconds).padStart(2, "0")}</Text>
        <Text style={styles.separator}>:</Text>
        <Text style={styles.timeBox}>{String(milliseconds).padStart(2, "0")}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleStart}>
          <Text style={styles.buttonText}>{start ? "Stop" : "Start"}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleReset}>
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  timeBox: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#003d3d",
    backgroundColor: "white",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  separator: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#003d3d",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  button: {
    backgroundColor: "#33a6a6",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});

import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { AntDesign } from "@expo/vector-icons";

export default function Clock() {
  const [time, setTime] = useState(new Date());
  const [alarms, setAlarms] = useState([{ id: 1, hour: "12", minute: "00", ampm: "AM" }]);
  const [selectedAlarm, setSelectedAlarm] = useState<number | null>(null);
  const [displayTime, setDisplayTime] = useState<{ hour: string; minute: string; ampm: string } | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number | string): string => String(num).padStart(2, "0");

  const getTimeParts = () => {
    if (displayTime) {
      return { ...displayTime, second: "00" };
    }

    const hour = formatNumber(
      time.toLocaleString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", hour12: true }).split(" ")[0]
    );
    const minute = formatNumber(
      time.toLocaleString("en-US", { timeZone: "Asia/Manila", minute: "2-digit" })
    );
    const second = formatNumber(
      time.toLocaleString("en-US", { timeZone: "Asia/Manila", second: "2-digit" })
    );
    const ampm = time.toLocaleString("en-US", { timeZone: "Asia/Manila", hour: "2-digit", hour12: true }).split(" ")[1];
    return { hour, minute, second, ampm };
  };

  const { hour, minute, second, ampm } = getTimeParts();

  const incrementHour = () => {
    if (!displayTime) return;
    let newHour = parseInt(displayTime.hour) + 1;
    if (newHour > 12) newHour = 1;
    setDisplayTime({ ...displayTime, hour: formatNumber(newHour) });
  };

  const incrementMinute = () => {
    if (!displayTime) return;
    let newMinute = parseInt(displayTime.minute) + 1;
    if (newMinute > 59) newMinute = 0;
    setDisplayTime({ ...displayTime, minute: formatNumber(newMinute) });
  };

  const toggleAmPm = () => {
    if (!displayTime) return;
    setDisplayTime({ ...displayTime, ampm: displayTime.ampm === "AM" ? "PM" : "AM" });
  };

  const addAlarm = () => {
    setAlarms([...alarms, { id: alarms.length + 1, hour: "12", minute: "00", ampm: "AM" }]);
  };

  const removeAlarm = (id: number) => {
    setAlarms(alarms.filter(alarm => alarm.id !== id));
    setSelectedAlarm(null);
    setDisplayTime(null);
  };

  return (
    <View style={styles.container}>
      <View style={[styles.timerContainer, { marginTop: 15, marginBottom: 5 }]}> 
        <TouchableOpacity onPress={incrementHour} disabled={!displayTime} style={[styles.timeBox, !displayTime && styles.disabled]}>
          <Text style={styles.timeText}>{hour}</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>:</Text>

        <TouchableOpacity onPress={incrementMinute} disabled={!displayTime} style={[styles.timeBox, !displayTime && styles.disabled]}>
          <Text style={styles.timeText}>{minute}</Text>
        </TouchableOpacity>

        <Text style={styles.separator}>:</Text>

        <Text style={styles.timeBox}>{second}</Text>

        <Text style={styles.separator}>:</Text>

        <TouchableOpacity onPress={toggleAmPm} disabled={!displayTime} style={[styles.timeBox, !displayTime && styles.disabled]}>
          <Text style={styles.timeText}>{ampm}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.alarmList} contentContainerStyle={styles.alarmListContent}>
        {alarms.map((item) => (
          <TouchableOpacity 
            key={item.id} 
            style={[styles.alarmRow, selectedAlarm === item.id && styles.selectedAlarmRow]} 
            onPress={() => {
              setSelectedAlarm(selectedAlarm === item.id ? null : item.id);
              setDisplayTime(selectedAlarm === item.id ? null : { hour: item.hour, minute: item.minute, ampm: item.ampm });
            }}
          >
            <Text style={styles.alarmText}>{`${item.hour}:${item.minute} ${item.ampm}`}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.addButton} onPress={selectedAlarm ? () => removeAlarm(selectedAlarm) : addAlarm}>
        <View style={styles.buttonCircle}>
          <AntDesign name={selectedAlarm ? "delete" : "plus"} size={40} color={selectedAlarm ? "red" : "#003d3d"} />
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#e9ecef",
  },
  timerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  timeBox: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#003d3d",
    backgroundColor: "white", // Ensure it remains white in all modes
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 80,
    textAlign: "center",  
    marginHorizontal: 5,
    marginTop: 15,
    marginBottom: 15,
  },
  disabled: {
    opacity: 0.5,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#003d3d",
  },
  separator: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#003d3d",
  },
  alarmList: {
    width: "30%",
    height: "88%",
    marginRight: 10,
    backgroundColor: "#e9ecef",
  },
  alarmListContent: {
    alignItems: "center",
  },
  alarmRow: {
    padding: 6,
    backgroundColor: "white",
    width: "100%",
    alignItems: "center",
    borderRadius: 5,
    marginVertical: 5,
  },
  selectedAlarmRow: {
    backgroundColor: "#e0e0e0",
  },
  alarmText: {
    fontSize: 40,
    color: "#003d3d",
  },
  addButton: {
    marginTop: 20,
  },
  buttonCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    marginBottom: 15,
  },
});

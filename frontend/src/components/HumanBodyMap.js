import React, { useState } from "react";
import { StyleSheet, Switch, Text, View } from "react-native";
import Body from "react-native-body-highlighter";

const HumanBodyMap = ({ 
  onBodyPartSelect = () => {} // Use default parameter
}) => {
  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false);
  const [isMale, setIsMale] = useState(true);

  const toggleSwitch = () => setIsBackSideEnabled((previousState) => !previousState);
  const toggleGenderSwitch = () => setIsMale((previousState) => !previousState);

  const handleBodyPartPress = (e) => {
    onBodyPartSelect(e);
  };

  return (
    <View style={styles.container}>
      <Body
        data={[
          { slug: "chest", intensity: 1 },
          { slug: "abs", intensity: 2 },
          { slug: "upper-back", intensity: 1 },
          { slug: "lower-back", intensity: 2 },
          { slug: "biceps", intensity: 2 }, // Add more body parts if needed
        ]}
        onBodyPartPress={handleBodyPartPress}
        gender={isMale ? "male" : "female"}
        side={isBackSideEnabled ? "back" : "front"}
        scale={1.7}
      />
      <View style={styles.switchContainer}>
        <View style={styles.switch}>
          <Text>Side ({isBackSideEnabled ? "Back" : "Front"})</Text>
          <Switch onValueChange={toggleSwitch} value={isBackSideEnabled} />
        </View>
        <View style={styles.switch}>
          <Text>Gender ({isMale ? "Male" : "Female"})</Text>
          <Switch onValueChange={toggleGenderSwitch} value={isMale} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  switchContainer: {
    flexDirection: "row",
    marginTop: 20,
  },
  switch: {
    flex: 1,
    alignItems: "center",
  },
});

export default HumanBodyMap;

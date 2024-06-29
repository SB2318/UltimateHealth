import React, { useState } from "react";
import { StyleSheet, Text, View, Switch } from "react-native";
import Body from "react-native-body-highlighter";
import { Dropdown } from 'react-native-element-dropdown';

const HumanBodyMap = ({ onBodyPartSelect = () => {} }) => {
  const [isBackSideEnabled, setIsBackSideEnabled] = useState(false);
  const [isMale, setIsMale] = useState(true);
  const [selectedBodyPart, setSelectedBodyPart] = useState({ slug: '', intensity: 0 });
  const [bodyParts] = useState([
    { slug: "chest", intensity: 1 },
    { slug: "abs", intensity: 2 },
    { slug: "upper-back", intensity: 1 },
    { slug: "lower-back", intensity: 2 },
    { slug: "biceps", intensity: 2 },
    // Add more body parts as needed
  ]);

  const toggleSwitch = () => setIsBackSideEnabled(previousState => !previousState);
  const toggleGenderSwitch = () => setIsMale(previousState => !previousState);

  const handleBodyPartPress = (e) => {
    setSelectedBodyPart(e);
    onBodyPartSelect(e);
  };

  const handleDropdownSelect = (item) => {
    const part = bodyParts.find(bp => bp.slug === item.value);
    setSelectedBodyPart(part);
    onBodyPartSelect(part);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.selectedText}>Selected: {selectedBodyPart.slug || 'None'}</Text>

      <Dropdown
        style={styles.dropdown}
        data={bodyParts.map(bp => ({ label: bp.slug, value: bp.slug }))}
        onSelect={(item) => handleDropdownSelect(item)}
      />

      <Body
        data={bodyParts}
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
  selectedText: {
    fontSize: 16,
    marginBottom: 10,
  },
  dropdown: {
    height: 40,
    width: '80%',
    marginBottom: 20,
    backgroundColor: '#FFF',
    borderRadius: 10,
    paddingHorizontal: 10,
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

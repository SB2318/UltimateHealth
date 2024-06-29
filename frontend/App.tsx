import React from "react";
import { StyleSheet, View } from "react-native";
import HumanBodyMap from "./HumanBodyMap"; // Adjust the import path as necessary

const App = () => {
  const handleBodyPartSelect = (part) => {
    console.log("Selected body part:", part);
  };

  return (
    <View style={styles.container}>
      <HumanBodyMap onBodyPartSelect={handleBodyPartSelect} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;

import { Button, Text, View } from "react-native";

export default function HomeScreen( setToken, navigation) {
  
  return (
    <View>
      <Text>Welcome home!</Text>
      <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </View>
  );
}

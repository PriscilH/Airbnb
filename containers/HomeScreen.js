import { Button, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/core";

export default function HomeScreen({}) {
  const navigation = useNavigation();
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

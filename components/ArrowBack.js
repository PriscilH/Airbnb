import { AntDesign } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const ArrowBack = () => {
  const navigation = useNavigation();
  return (
    <AntDesign
      name="arrowleft"
      size={24}
      color="#717171"
      onPress={() => {
        navigation.goBack();
      }}
    />
  );
};

export default ArrowBack;
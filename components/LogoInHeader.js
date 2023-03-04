import { Image, StyleSheet } from "react-native";

const LogoInHeader = () => {
  return <Image source={require("../assets/airbnb-icon.png")} style={styles.logo} />;
};

export default LogoInHeader;

const styles = StyleSheet.create({
  logo: { 
    width: 30, 
    height: 30, 
    resizeMode: "contain",
    marginTop: 10,
    marginBottom: 10,
},
});
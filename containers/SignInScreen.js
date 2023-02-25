import { useNavigation } from "@react-navigation/core";
import { Button, Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from "react-native";
import Logo from "../assets/airbnb-icon.png";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.align}>
      <Image source={Logo} style={styles.logo}/>
      <Text style={styles.sign}>Sign in</Text>
      </View>
      <View>
        <View style={styles.block} >
          {/* <Text>Name: </Text> */}
        <View style={styles.input}><TextInput placeholder="Email" /></View>
        {/* <Text>Password: </Text> */}
        <View style={styles.input}><TextInput placeholder="Password" secureTextEntry={true} /></View>
        </View>
        
        <Button
          title="Sign in"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <Text>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  logo:{
    width: 100,
    height: 100,
    marginTop: 70,
    marginBottom: 25,
  },
  align:{
    alignItems: "center",
    marginBottom: 100,
  },
  sign:{
    fontSize: 25,
    color: '#717171',
    fontWeight: "bold",
  },
  block:{
    marginLeft: 35,
    marginRight: 35,
  },
  input:{
    borderBottomWidth: 1,
    borderBottomColor: '#EB5A62',
    marginBottom: 25,
    paddingBottom: 5,
  },
});
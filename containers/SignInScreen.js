import { useNavigation } from "@react-navigation/core";
import { Pressable, Text, TextInput, View, Image, TouchableOpacity, StyleSheet } from "react-native";
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
        {/* BUTTON SIGN IN */}
      <View style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}>Sign in</Text>
        </View> 
      </View>
       
        
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignUp");
          }}
        >
          <View style={styles.align2}>
           <Text style={styles.subsentence}>No account ? Register</Text> 
          </View>
          
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
    marginBottom: 80,
  },
  input:{
    borderBottomWidth: 1,
    borderBottomColor: '#EB5A62',
    marginBottom: 25,
    paddingBottom: 5,
  },
  button:{
    backgroundColor: 'white',
    color: '#717171',
    fontWeight: "bold",
  },
  border:{
    alignItems: "center",
    height: 50,
    borderWidth: 2,
    borderColor: '#EB5A62',
    marginBottom: 20,
    width: 200,
    fontWeight: "bold",
    padding: 5,
    justifyContent: "center",
    borderRadius: 50,
  },
  align2:{
    alignItems: "center",
  },
  subsentence:{
    color: '#717171',
    fontWeight: "bold",
  }
});
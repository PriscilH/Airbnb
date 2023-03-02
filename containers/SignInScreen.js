import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Logo from "../assets/airbnb-icon.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");


  const handleSubmit = async () => {
    // setErrorMessage("");
    if (email && password) {
      try {
        const {data} = await axios.post(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in`,
          {
            email,
            password,
          }
        );
        // const token = response.data.token;
        //   setToken(token);
        console.log("response>>", data);
          alert("Connexion réussie");
          
      } catch (error) {
        setErrorMessage("Your email or password doesn't exist!");
      }
    } else {
      setErrorMessage("Please fill the field");
    }
  };


  return (
    <ScrollView style={styles.container}>

      <View style={styles.align}>
      <Image source={Logo} style={styles.logo}/>
      <Text style={styles.sign}>Sign in</Text>
      </View>
      <View>

      <KeyboardAwareScrollView>
        <View style={styles.block} >
          {/* <Text>Name: </Text> */}
        <View style={styles.input}><TextInput placeholder="Email" onChangeText={(text) => {
          // réinitialisation du message d'erreur dès que l'utilisateur change la valeur de l'input
          setErrorMessage("");
          setEmail(text);
        }} /></View>
        {/* <Text>Password: </Text> */}
        <View style={styles.input}><TextInput placeholder="Password"  secureTextEntry={true}
        onChangeText={(text) => {
          setErrorMessage("");
          setPassword(text);
        }} />
        
        </View>
        </View>
        {/* Affichage du message d'erreur */}
      {errorMessage  && <View style={styles.error}><Text style={styles.red} >{errorMessage}</Text></View>}
        </KeyboardAwareScrollView>


        {/* BUTTON SIGN IN */}
      <TouchableOpacity style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={handleSubmit}
          >Sign in</Text>
        </View> 
      </TouchableOpacity>
       
        
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
    </ScrollView>
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
    marginBottom: 90,
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
    marginBottom: 30,
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
  },
  error:{
    alignItems: "center",
    marginBottom: 10,
  },
  red:{
    color: '#EB5A62',
    fontWeight: "bold",
  },
});
import { Text, TextInput, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../assets/airbnb-icon.png"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

export default function SignUpScreen({ setToken, navigation }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async () => {
    // console.log({ email, username, description, password, confirmPassword });
    if (email && username && description && password && confirmPassword) {
      if (password === confirmPassword) {
        try {
          const { data } = await axios.post(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/sign_up",
            { email, username, description, password }
          );

          
          console.log("response>>", data);
          alert(data.token);
        } catch (error) {
          console.log("catch>>", error.response.data);
          setErrorMessage("Error, this email or username already exist !");
        }
      } else {
        setErrorMessage("Passwords must be the same");
      }
    } else {
      setErrorMessage("Please fill all fields");
    }
  };

  return (
    <ScrollView style={styles.container}>

      <View style={styles.align}>
        <Image source={Logo} style={styles.logo}/>
        <Text style={styles.sign}>Sign up</Text>
      </View>

      <KeyboardAwareScrollView>
      <View style={styles.block}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => {
          // réinitialisation du message d'erreur dès que l'utilisateur change la valeur de l'input
          setErrorMessage("");
          setEmail(text);
        }} />
        <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => {
          setErrorMessage("");
          setUsername(text);
        }}  />
        <TextInput style={styles.area} multiline = {true} numberOfLines = {4}
        placeholder="Describe yourself in a few words..." onChangeText={(text) => {
          setDescription(text);
        }}/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true} 
        onChangeText={(text) => {
          setErrorMessage("");
          setPassword(text);
        }}/>
        <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry={true}
        onChangeText={(text) => {
          setErrorMessage("");
          setConfirmPassword(text);
        }} />
        {/* Affichage du message d'erreur */}
      {errorMessage && <View style={styles.error}><Text style={styles.red}>{errorMessage}</Text></View>}
      </View> 
      </KeyboardAwareScrollView> 

      {/* BUTTON SIGN UP */}

      <TouchableOpacity style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={handleSubmit}
          >Sign up</Text>
        </View> 
      </TouchableOpacity>
        
      <TouchableOpacity
          onPress={() => {
            navigation.navigate("SignIn");
          }}
        >
          <View style={styles.align2}>
           <Text style={styles.subsentence}>Already have an account ? Sign in</Text> 
          </View>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  logo:{
    width: 90,
    height: 90,
    marginTop: 30,
    marginBottom: 30,
  },
  align:{
    alignItems: "center",
    marginBottom: 25,
  },
  sign:{
    fontSize: 25,
    color: '#717171',
    fontWeight: "bold",
  },
  block:{
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 30,
  },
  input:{
    borderBottomWidth: 1,
    borderBottomColor: '#EB5A62',
    marginBottom: 30,
    paddingBottom: 5,
  },
  area:{
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#EB5A62',
    marginBottom: 30,
    paddingBottom: 5,
    height: 80, 
    textAlignVertical: 'top',
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
    marginBottom: 15,
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
    marginBottom: 12,
  },
  error:{
    alignItems: "center",
  },
  red:{
    color: '#EB5A62',
    fontWeight: "bold",
  },
});
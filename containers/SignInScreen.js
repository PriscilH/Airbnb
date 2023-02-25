import { useNavigation } from "@react-navigation/core";
import { Text, TextInput, View, Image, TouchableOpacity, StyleSheet, ScrollView } from "react-native";
import Logo from "../assets/airbnb-icon.png";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import axios from "axios";

export default function SignInScreen({ setToken }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const navigation = useNavigation();

  const handleSubmit = async () => {
    if (email && password) {
      if (errorMessage !== null) {
        setErrorMessage(null);
      }

      try {
        const response = await axios.post(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/log_in`,
          {
            email,
            password,
          }
        );

        if (response.data.token && response.data.id) {
          const token = response.data.token;
          const id = response.data.id;
          setToken(token);
          setId(id);
        } else {
          setErrorMessage("An error occurred");
        }
      } catch (error) {
        if (error.response.status === 401) {
          setErrorMessage("Incorrect credentials");
        } else {
          setErrorMessage("An error occurred");
        }
      }
    } else {
      setErrorMessage("Please fill all fields");
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
        <View style={styles.input}><TextInput placeholder="Email" setFunction={setEmail} /></View>
        {/* <Text>Password: </Text> */}
        <View style={styles.input}><TextInput placeholder="Password" setFunction={setPassword} secureTextEntry={true} /></View>
        </View>
        </KeyboardAwareScrollView>


        {/* BUTTON SIGN IN */}
      <View style={styles.align2}>
        <View style={styles.border}>
        <Message message={errorMessage} color="error" />
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
  }
});
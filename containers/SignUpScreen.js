import { Button, Text, TextInput, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import Logo from "../assets/airbnb-icon.png"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/core";

export default function SignUpScreen({ setToken }) {
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

      <View style={styles.align}>
        <Image source={Logo} style={styles.logo}/>
        <Text style={styles.sign}>Sign up</Text>
      </View>

      <KeyboardAwareScrollView>
      <View style={styles.block}>
        <TextInput style={styles.input} placeholder="Email" />
        <TextInput style={styles.input} placeholder="Username"  />
        <TextInput style={styles.area} multiline = {true} numberOfLines = {4}
        placeholder="Describe yourself in a few words..."/>
        <TextInput style={styles.input} placeholder="Password" secureTextEntry={true}/>
        <TextInput style={styles.input} placeholder="Confirm password" secureTextEntry={true} />
      </View> 
      </KeyboardAwareScrollView> 

      {/* BUTTON SIGN UP */}

      <View style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}>Sign up</Text>
        </View> 
      </View>
        
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
    marginTop: 15,
    marginBottom: 15,
  },
  align:{
    alignItems: "center",
    marginBottom: 15,
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
    borderTopColor: '#EB5A62', 
    borderBottomWidth: 1,
    borderBottomColor: '#EB5A62',
    borderLeftWidth: 1,
    borderLeftColor: '#EB5A62',
    borderRightWidth: 1,
    borderRightColor: '#EB5A62',
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
    marginBottom: 10,
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
});
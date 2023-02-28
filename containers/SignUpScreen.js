import { Button, Text, TextInput, View, Image, StyleSheet, ScrollView } from "react-native";
import Logo from "../assets/airbnb-icon.png"
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";


export default function SignUpScreen({ setToken }) {
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

      <View>
        <Button
          title="Sign up"
          onPress={async () => {
            const userToken = "secret-token";
            setToken(userToken);
          }}
        />
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
    width: 90,
    height: 90,
    marginTop: 20,
    marginBottom: 20,
  },
  align:{
    alignItems: "center",
    marginBottom: 20,
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
    height: 80, textAlignVertical: 'top',
  },
});
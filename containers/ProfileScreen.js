import { TextInput, Text, View, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ setToken, id, userToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);

  const navigation = useNavigation();

  const accessLibrary = async () => {
    try {
      // Demander l'autorisation d'accéder à la gallerie
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();

      if (status == "granted") {
        // Ouvrir la gallerie
        const result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true, // indispensable pour simulateur Iphone
          aspect: [4, 3],
        });
        console.log("result>>>", result);

        if (!result.canceled) {
          setPicture(result.assets[0].uri);
        } else {
          // Si aucune photo sélectionnée
          alert("Selection photo annulée");
        }
      } else {
        alert("Accès gallerie refusé");
      }
    } catch (error) {
      console.log("catch>>>", error);
    }
  };

  const accessCamera = async () => {
    try {
      // Demander l'autorisation d'accéder à l'appareil photo
      const { status } = await ImagePicker.requestCameraPermissionsAsync();

      if (status == "granted") {
        // Ouvrir l'appareil photo
        const result = await ImagePicker.launchCameraAsync({});
        console.log("result>>>", result);
        if (!result.canceled) {
          setPicture(result.assets[0].uri);
        } else {
          // Si aucune photo prise
          alert("Prise de photo annulée");
        }
      } else {
        alert("Permission caméra refusée");
      }
    } catch (error) {
      console.log("catch camera>>>", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${id}`,
        {
          headers: {
            Authorization: "Bearer " + userToken,
          },
        }
      ); 
      setUsername(response.data.username);
      setEmail(response.data.email);
      setDescription(response.data.description);
      if (response.data.photo) {
        setPicture(response.data.photo.url);
      }

      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }}

  return (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView >
      <View style={styles.block}>
        <TextInput style={styles.input} placeholder="Email" onChangeText={(text) => {
          setEmail(text);
        }} />
        

        <TextInput style={styles.input} placeholder="Username" onChangeText={(text) => {
          setUsername(text);
        }}  />
        <TextInput style={styles.area} multiline = {true} numberOfLines = {4}
        placeholder="Describe yourself in a few words..." onChangeText={(text) => {
          setDescription(text);
        }}/>
      </View>
      

      <TouchableOpacity style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          // onPress={handleSubmit}
          >Update</Text>
        </View> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={() => {
            setToken(null);
          }}
          >Log Out</Text>
        </View> 
      </TouchableOpacity>
      {/* <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      /> */}
      </KeyboardAwareScrollView> 
      </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  block:{
    marginTop: 250,
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
  button:{
    backgroundColor: 'white',
    color: '#717171',
    fontWeight: "bold",
  },
})
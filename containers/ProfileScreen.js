import { Button, TextInput, View, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

export default function ProfileScreen({ setToken, id, userToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);

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
    <View>
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
      </View>
      </KeyboardAwareScrollView> 

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
})
import { TextInput, Text, View, StyleSheet, TouchableOpacity, ScrollView, Image, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";

export default function ProfileScreen({ setToken, userId, userToken }) {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [picture, setPicture] = useState(null);
  const [pictureModified, setPictureModified] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [inputModified, setInputModified] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/${userId}`,
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
          setPictureModified(true)
        } else {
          // Si aucune photo sélectionnée
          alert("Selection photo annulée");
        }
      } else {
        alert("Accès gallerie refusé");
      }
    } catch (error) {
      console.log("catch Library>>>", error);
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
          setPictureModified(true);
        } else {
          // Si aucune photo prise
          alert("Prise de photo annulée");
        }
      } else {
        alert("Permission caméra refusée");
      }
    } catch (error) {
      console.log("catch camera>>>", error.response);
    }
  };

  

    const handleUpdate = async () => {
      setIsUpdating(true);
      try {
        if (pictureModified) {
          // console.log("avatar modifié");
  
          const extension = picture.split(".").pop();
  
          const formData = new FormData();
          formData.append("photo", {
            uri: picture,
            name: `my-pic.${extension}`,
            type: `image/${extension}`,
          });
  
          // ---------A--MODIFIER--ROUTE--UPLOAD--PICTURE--AVEC-NOTRE--BACK--NGROCK----

          const { data } = await axios.post(
            "https://7ec3-2a01-cb05-8e65-df00-217e-ec90-f1f6-5fda.eu.ngrok.io/upload",
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
                authorization: `Bearer ${userToken}`,
              },
            }
          );
  
          console.log("data>>>", data);
          setPicture(data.photo.url);
        } else {
          console.log("avatar non modifié");
        }
        // ---------------------------------------
        if (inputModified) {
          console.log("modifié");
  
          const { data } = await axios.put(
            "https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/user/update",
            {
              email,
              description,
              username,
            },
            {
              headers: {
                authorization: `Bearer ${userToken}`,
              },
            }
          );
          console.log("data input>>", data);
  
          setEmail(data.email);
          setDescription(data.description);
          setUsername(data.username);
  
          if (data.photo) {
            setPicture(data.photo.url);
          }
        } else {
          console.log("no modification");
        }
      } catch (error) {
        console.log("catch update>>>", error.response);
      }
      setIsUpdating(false);
    };
  
    return isLoading ? (
      <ActivityIndicator />
    ) : (
    <ScrollView style={styles.container}>
      <KeyboardAwareScrollView >

      <View style={styles.firstPart}>
      <View style={styles.avatarBloc}>
          {picture ? (
            <Image
              source={{
                uri: picture,
              }}
              // resizeMode="contain"
              style={styles.picture}
            />
          ) : (
            <Text>No avatar</Text>
          )}
        </View>

        <View>
          <MaterialIcons
            name="add-a-photo"
            size={24}
            color="black"
            onPress={accessCamera}
          />
          <MaterialIcons
            name="add-photo-alternate"
            size={24}
            color="black"
            onPress={accessLibrary}
          />
        </View>
        </View>

      <View style={styles.block}>
        <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={(text) => {
          setEmail(text); setInputModified(true);
        }} />
        

        <TextInput style={styles.input} placeholder="Username" value={username} onChangeText={(text) => {
          setUsername(text); setInputModified(true);
        }}  />
        <TextInput style={styles.area} multiline = {true} numberOfLines = {4}
        placeholder="Describe yourself in a few words..." value={description} onChangeText={(text) => {
          setDescription(text); setInputModified(true);
        }}/>
      </View>
      

      <TouchableOpacity style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={handleUpdate}
          >Update</Text>
        </View> 
      </TouchableOpacity>

      <TouchableOpacity style={styles.align2}>
        <View style={styles.border}>
        <Text style={styles.button}
          onPress={() => {
            setToken(null, null);
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
    marginTop: 50,
    marginLeft: 35,
    marginRight: 35,
    marginBottom: 30,
  },
  avatarBloc: {
    borderWidth: 1,
    width: 150,
    height: 150,
    borderRadius: 150,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 30,
    marginTop: 20,
    marginRight: 10,
    borderColor: '#EB5A62',
  },
  firstPart: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  picture: {
    width: "100%",
    height: "100%",
    borderRadius: 150,
    borderWidth: 1,
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
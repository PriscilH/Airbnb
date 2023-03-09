import { Button, Text, View } from "react-native";
import { useState, useEffect } from "react";
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
      <Text>Hello Settings</Text>

      <Button
        title="Log Out"
        onPress={() => {
          setToken(null);
        }}
      />
    </View>
  );
}

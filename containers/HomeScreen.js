import { useNavigation } from "@react-navigation/core";
import { View, StyleSheet, Image, FlatList, Text, ActivityIndicator, ImageBackground, TouchableOpacity} from "react-native";

import { useState, useEffect } from "react";
import axios from "axios";

import { functionStars } from "../utils/functionStars";

export default function HomeScreen({}) {
  const [rooms, setRooms] = useState([]);
  const [isLoading, setIsloading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {data} = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        // console.log("data>>>", data);
        setRooms(data);
      } catch (error) {
        console.log(error.response);
      }
      setIsloading(false);
    };
    fetchData();
  }, []);

  return isLoading ? (
   <ActivityIndicator size="large" color="purple" style={{ marginTop: 100 }} />
  ) : (
    // style={styles.container}
    <View>
      <FlatList 
          data={rooms}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
              onPress={() => navigation.navigate("Room", { id: item._id })}
            >
              <ImageBackground source={{ uri: item.photos[0].url }} 
              style={styles.imageBg}
               >
                <View style={styles.priceBloc}>
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
              </ImageBackground>
            
              <View style={styles.descBloc}>
                <View>
                  <Text>{item.title}</Text>
                  {/* La fonction displayStars vient du fichier du même nom qui se trouve dans le dossier "utils" */}
                  <Text>{functionStars(item.ratingValue)}</Text>
                  <Text>{item.reviews} reviews</Text>
                </View>

                <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.avatar}
                 /> 
               </View> 
             </TouchableOpacity>
  );
}}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: 'white',
    flex: 1,
  },
  logo:{
    width: 40,
    height: 40,
    marginTop: 50,
    marginBottom: 5,
  },
  align:{
    alignItems: "center",
    marginBottom: 90, 
    borderBottomWidth: 0.5,
    borderColor: 'lightgrey'
  },
});
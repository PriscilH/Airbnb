// import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useEffect, useState } from "react";
import axios from "axios";
import { functionStars } from "../utils/functionStars";

export default function RoomScreen({ route }) {
  const { id } = route.params;
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms/${id}`
        );

        console.log("data room>>>>", data);
        setRoom(data);
      } catch (error) {
        console.log("catch>>>", error.response);
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  return isLoading ? (
    <ActivityIndicator size="large" />
  ) : (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: room.photos[0].url }}
        style={styles.imageBg}
      >
        <View style={styles.priceBlock}>
          <Text style={styles.price}>{room.price} €</Text>
        </View>
      </ImageBackground>

      <View style={styles.descBlock}>
        <View>
        <View style={styles.titleBlock}>
          {/* Pour afficher/cacher le text qui dépasse, on peut changer la valeur de numberOfLines={0} (0 est la valeur par défaut) en fonction d'un state. */}
          <Text style={styles.title} numberOfLines={1}> {room.title}</Text>
          <View>
                    <Image
                  source={{ uri: room.user.account.photo.url }}
                  style={styles.avatar}
                 /> 
            </View>
        </View>

          <View style={styles.rate}>       
          {/* La fonction functionStars vient du fichier du même nom qui se trouve dans le dossier "utils" */}
          <Text>{functionStars(room.ratingValue)}</Text>
          <Text style={styles.reviews}>{room.reviews} reviews</Text>
          </View>
          <View><Text>{room.description}</Text></View>
        </View>
        </View>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container:{
    height: "100%",
    paddingVertical: 10,
    backgroundColor: "white",
  },
  imageBg: {
    width: "100%",
    height: 230,
    justifyContent: "flex-end",
  },
  priceBlock: {
    backgroundColor: "black",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  price: {
    color: "white",
    fontWeight: "bold",
    fontSize: 15,
  },
  title: {
    fontSize: 19,
  },
  titleBlock: {
    flexDirection: "row",
    width: 287,
  },
  rate:{
    flexDirection: "row",
    marginTop: -30,
    marginBottom: 20,
  },
  reviews: {
    marginTop: 4,
    marginLeft: 5,
    color: '#BBBBBB',
  },
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  descBlock: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
});
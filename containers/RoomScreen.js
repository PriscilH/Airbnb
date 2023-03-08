// import { useRoute } from "@react-navigation/core";
import {
  Text,
  View,
  ImageBackground,
  Image,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { useEffect, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import axios from "axios";
import { functionStars } from "../utils/functionStars";
import Swiper from "react-native-swiper";
import MapView, { PROVIDER_GOOGLE, Marker, Callout } from "react-native-maps";

export default function RoomScreen({ route }) {
  const { id } = route.params;
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [showText, setShowText] = useState(false);

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
    <>
      <View tyle={styles.container}>
      <View style={styles.carrousel}>
      <Swiper
          dotStyle={styles.dot}
          dotColor="#808080"
          activeDotStyle={styles.dot}
          activeDotColor="white"
        >
          {room.photos.map((photo) => {
            return (
      <ImageBackground
        source={{ uri: photo.url }}
        style={styles.imageBg}
        key={photo.picture_id}
      >
        <View style={styles.priceBlock}>
          <Text style={styles.price}>{room.price} €</Text>
        </View>
      </ImageBackground>
      );
    })}
  </Swiper>
  </View>

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

          {showText === true ? (
            <Text style={styles.offerDescription}>{room.description}</Text>
            ) : (
            <Text 
            style={styles.offerDescription}
            numberOfLines={3}>{room.description}
            </Text>
             )}

            <TouchableOpacity onPress={() => {
          setShowText(!showText);
        }}>

            {showText ? (
            <Text style={{ color: "grey" }}>
              Show less <AntDesign name="caretup" size={10} color="grey" />
            </Text>
          ) : (
            <Text style={{ color: "grey" }}>
              Show more <AntDesign name="caretdown" size={10} color="grey" />
            </Text>
          )}
          </TouchableOpacity>

        </View>
        </View>
        <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: room.location[1],
          longitude: room.location[0],
          latitudeDelta: 0.09,
          longitudeDelta: 0.09,
        }}
        style={{ width: "100%", height: "30%" }}
      >
        <Marker
          coordinate={{
            latitude: room.location[1],
            longitude: room.location[0],
          }}
        >
          <Callout>
            <Text>{room.title}</Text>
            <Text>{room.price}€</Text>
          </Callout>
        </Marker>
      </MapView>
      </View>
  </>
 
    
  );
}

const styles = StyleSheet.create({
  carrousel: {
    width: "100%",
    height: "38%",
  },
  container:{
    height: "100%",
    backgroundColor: "white",
  },
  imageBg: {
    width: "100%",
    height: 230,
    justifyContent: "flex-end",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 50,
  },
  priceBlock: {
    backgroundColor: "black",
    height: 40,
    width: 70,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
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
    // marginBottom: 20,
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
  offerDescription: {
    fontSize: 14,
    marginTop: 10,
  },
});
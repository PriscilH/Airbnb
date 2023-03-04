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
   <ActivityIndicator size="large" color="#EB5A62" style={{ marginTop: 100 }} />
  ) : (
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
                <View style={styles.priceBlock}>
                  <Text style={styles.price}>{item.price} €</Text>
                </View>
              </ImageBackground>
            
              <View style={styles.descBlock}>
                <View>
                  <View style={styles.titleBlock}>
                    <Text style={styles.title} numberOfLines={1}>{item.title}</Text>
                  <View>
                    <Image
                  source={{ uri: item.user.account.photo.url }}
                  style={styles.avatar}
                 /> 
                  </View>
                  </View>
                  

                  <View style={styles.rate}>
                   {/* La fonction functionStars vient du fichier du même nom qui se trouve dans le dossier "utils" */}
                  <Text>{functionStars(item.ratingValue)}</Text>
                   <Text style={styles.reviews}>{item.reviews} reviews</Text>
                  </View>
                </View>
                <View style={styles.border}></View>
               </View> 
             </TouchableOpacity>
  );
}}
style={styles.flatlist}
/>
    </View>
  );
}

const styles = StyleSheet.create({
  flatlist: {
    paddingHorizontal: 15,
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
  avatar: {
    height: 80,
    width: 80,
    borderRadius: 50,
  },
  descBlock: {
    marginVertical: 20,
  },
  border:{
    borderBottomColor: '#BBBBBB',
    borderBottomWidth: 1,
    opacity: 0.3,
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
});
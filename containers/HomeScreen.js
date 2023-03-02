import { Button, View, Image, StyleSheet, ScrollView, FlatList, Text} from "react-native";
import { useNavigation } from "@react-navigation/core";
import { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/airbnb-icon.png";

export default function HomeScreen({}) {
  const [data, setData] = useState(null);
  const [isLoading, setIsloading] = useState(true);

  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://lereacteur-bootcamp-api.herokuapp.com/api/airbnb/rooms`
        );
        setData(response.data);
        setIsloading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>
    <View style={styles.align}>
      <Image source={Logo} style={styles.logo} />
    </View>

    <View>
      <FlatList data={data}
          keyExtractor={(item) => String(item._id)}
          renderItem={({ item }) => {
            <View>
              <Text>{item._id}</Text>
              <Image style={{ height: 200 }}
            source={{ uri: item.photos[0].url }}/>;
            </View>
          }}/> 
    </View>


    <Button
        title="Go to Profile"
        onPress={() => {
          navigation.navigate("Profile", { userId: 123 });
        }}
      />
    </ScrollView>
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
import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  StatusBar,
  View,
  Text,
  ScrollView,
  Button,
  SafeAreaView
} from "react-native";
import {
  useMoralis,
  useMoralisWeb3Api,
  useMoralisWeb3ApiCall,
} from "react-moralis";
import Blockie from "../Blockie";
import { TouchableOpacity } from "react-native-gesture-handler";
import Address from "../Address";
import TextArea from "../HtmlComponents/TextArea";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import { set } from "react-native-reanimated";
import axios from "axios";

const Profile = ({ navigation }) => {

  const [text, changeText] = useState("Loading . . .");

  const {
    authenticate,
    authError,
    isAuthenticating,
    isAuthenticated,
    logout,
    Moralis,
    user,
    setUserData,
    refetchUserData,
  } = useMoralis();

  const logoutUser = () => {
    if (isAuthenticated) {
      logout();
      navigation.replace("Auth");
    }
  };

  const setDescription = async() => {
    await setUserData({ description: text});
    alert("Your description has been saved 😀!");
  }

  useEffect(() => {
    (async function getUserData() {
      await refetchUserData();
  
      if(user && user.get("description")) {
        changeText(user.get("description"));
      }else{
        setUserData({ description: "This is my main wallet . . ." });
        await refetchUserData();
        changeText(user.get("description"));
      }
  
      console.log(text);
    })();
  }, []);

  const getENSdomain = async() => {
    try{
      console.log("getting ENS")
      const response = await axios.get(
        "https://deep-index.moralis.io/api/v2/resolve/0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045/reverse", 
        {
          headers: {
          'X-API-Key': 'hjesS0XpkuVITpdLSoVTjFRZWOqV1524CimyVdnh0IcxDT6RYcdx3tnaE0MxxefZ'
          }
        }
      );
      console.log(response);
    }catch(err){
      console.log(err);
    }
  }


  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      <ScrollView>

        <Text style={styles.title}>👨‍💻 Profile</Text>

       {/*<View style={{ marginBottom: "5%" }}>
          <View style={{ marginTop: "5%" }}>
            {user.name ? <Text>{user.name}</Text> : <Address avatar copyable size="4" />}
          </View>

          <TouchableOpacity style={styles.editNameButton}>
            {user.name ? <Text style={styles.editNameButtonText}>Edit Username</Text> : <Text style={styles.editNameButtonText}>Set Username</Text>}
          </TouchableOpacity>
        </View>

        <HorizontalLine width={1} color={"grey"} marginBottom={10} marginTop={10} />*/}

        <View style={{ padding: 5, marginTop: "5%", marginBottom: "2%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>Wallet Address:</Text>
          <Text style={{ color: "darkgrey", fontSize: 12 }}><Address avatar copyable size="5" /></Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginTop: "2%", marginBottom: "2%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>ENS Domain:</Text>
          <Text style={{ color: "darkgrey", fontSize: 15 }}>none</Text>
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5, marginBottom: "6%" }}>
          <Text style={{ color: "black", fontSize: 15 }}>Unstoppable Domain:</Text>
          <Text style={{ color: "darkgrey", fontSize: 15 }}>none</Text>
        </View>

        <View style={styles.accountDescriptionView}>
          <Text style={{ color: "black", fontSize: 15 }}>Add description to this account:</Text>
          <TextArea 
            multiline
            numberOfLines={4}
            onChangeText={text => changeText(text)}
            style={styles.textArea}
            value={text}
            />
          <TouchableOpacity onPress={setDescription}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>

      <TouchableOpacity
        style={styles.button}
        onPress={logoutUser}
        loadingProps={{ animating: true }}>
          <Text style={{ fontSize: 22, textAlign: "center", color: "white", fontWeight: "900" }}>Logout</Text>
      </TouchableOpacity>

      </ScrollView>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
    paddingLeft: "4%",
    paddingRight: "4%",
  },
  title: {
    fontWeight: "bold",
    fontSize: 30,
    marginTop: "5%",
  }, 
  button: {
    width: "100%",
    backgroundColor: "#246EE9",
    borderRadius: 5,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 5,
    padding: 12,
  },
  headerText: {
    fontSize: 35,
    marginTop: 2,
  },
  pfp: {
    width: 100,
    height: 100,
    alignItems: "center",
  },
  editNameButton: {
    marginTop: "5%",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 100,
    backgroundColor: "darkgrey",
    width: "50%",
    alignItems: "center",
    alignSelf: "center",
    marginTop: 40,
  },
  editNameButtonText: {
    fontSize: 17,
  },
  textArea: {
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 5,
    width: "100%",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 8,
  },
  accountDescriptionView: {
    padding: 5,
    marginBottom: "10%"
  },
  header: {
    marginBottom: "8%",
  },
  saveButtonText: {
    fontWeight: "900",
    fontSize: 20,
    color: "grey",
    textAlign: "center",
    marginEnd: "2%",
    marginStart: "2%",
  }
});

export default Profile;

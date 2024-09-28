import React, { useEffect } from "react";
//import {  } from "react-moralis";
import { useMoralisDapp } from "../../providers/MoralisDappProvider/MoralisDappProvider";
import {
  StyleSheet,
  View,
  FlatList,
  StatusBar,
  SafeAreaView,
  ScrollView,
  Text,
  Image,
} from "react-native";
import WrongNetwrok from "./WrongNetwrok.js";
import CoinFlip from "./CoinFlip.js";



export default function GamesHome() {
  //Variables, state, ...:
  const { chainId } = useMoralisDapp();


  //Functions
  console.log("Chain");
  console.log(chainId);

  useEffect(() => {
    checkChain();
  }, [chainId]);

  useEffect(() => {
    checkChain();
  }, [])

  const checkChain = () => {
    if(chainId === "0x13881") {
      return <CoinFlip />
    }else{
      return <WrongNetwrok />
    }
  }



  //Return:
  if("0x13881" === "0x13881") {
    return <CoinFlip />
  }else{
    return <WrongNetwrok />
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
});

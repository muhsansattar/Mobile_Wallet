import React, { useEffect, useState } from "react";
import { useMoralis } from "react-moralis";
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



export default function GamesHome(props) {
  const { Moralis } = useMoralis();

  const [win, setWin] = useState(null);
  const [userSideText, setUserSideText] = useState(null);
  const [botSideText, setBotSideText] = useState(null);
  
  
  useEffect(() => {
    props.userSide === props.botSide ? setWin(true) : setWin(false);
    props.userSide === 1 ? setUserSideText("Head") : setUserSideText("Tails");
    props.botSide === 1 ? setBotSideText("Head") : setBotSideText("Tails");
  }, [])
  
  
  const getDarkerBackgroudColor = () => {
    if(win){ 
      return "#abed9b";
      //return "#48d425";  //Dark green
    }else{
      return "#FF5C5C";
      //return "#FF2E2E";  //Dark red
    }
  }

  return(
    <View style={styles.box}>
      <View style={styles.sideViews}>
        <Text style={styles.labelText}>You:</Text>
        <Text style={styles.dataText}>{userSideText}</Text>
      </View>
      <View style={{...styles.winView, backgroundColor: getDarkerBackgroudColor() }}>
        <Text style={styles.stateText}>{win ? "🏆" : "😱"}</Text>
        <Text style={styles.stateText}>{win ? "WIN" : "LOSE"}</Text>
      </View>
      <View style={styles.sideViews}>
        <Text style={styles.labelText}>Bot:</Text>
        <Text style={styles.dataText}>{botSideText}</Text>
      </View>
    </View>
  );
}

const getBackgroundColor = () => {
  /*if(win){
    //return "#abed9b"; //Light green
  }else{
    //return "#FF5C5C"; //Light red
  }*/
  return "#e3e3e3"; //grey
}


const styles = StyleSheet.create({
  box: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
    flexDirection: "row",
    backgroundColor : getBackgroundColor(),
    justifyContent: "space-between",
    paddingLeft: "7%",
    paddingRight: "7%",
    paddingTop: "3%",
    paddingBottom: "3%",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 8,
    borderRadius: 100,
    margin: "2%",
    marginBottom: "4%",
  },
  labelText: {
    color: "grey",
    fontSize: 16,
  },
  dataText: {
    color: "black",
    fontSize: 18,
  },
  stateText: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  winView: {
    borderRadius: 100,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 10,
    paddingTop: 8,
    paddingBottom: 8,
    paddingRight: 15,
    paddingLeft: 15,
  },
  sideViews: {
    justifyContent: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
});

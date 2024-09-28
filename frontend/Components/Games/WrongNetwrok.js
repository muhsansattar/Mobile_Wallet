import React, { useEffect } from "react";
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
  Pressable,
} from "react-native";


export default function GamesHome() {
    //const {  } = useMoralisDapp();

    /*const addMumbaiTestnet = async() => {
        const chainId = 80001;
        const chainName = "Mumbai Testnet";
        const currencyName = "MATIC";
        const currencySymbol = "MATIC";
        const rpcUrl = "https://rpc-mumbai.matic.today/";
        const blockExplorerUrl = "https://mumbai.polygonscan.com/";

        await addNetwork(
            chainId, 
            chainName, 
            currencyName, 
            currencySymbol, 
            rpcUrl,
            blockExplorerUrl
        );
    }*/

    return (
        <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
            <ScrollView>
                <View>
                    <Pressable
                        style={styles.btn}
                        //onPress={() => switchNetwork("0x13881")}
                    >
                        <Text style={styles.btnText}>Switch to Matic Mumbai</Text>
                    </Pressable>

                    <Pressable
                        //onPress={() => addMumbaiTestnet()}
                    >
                        <View style={styles.btn}>
                            <Text style={styles.btnText}>Add Matic Mumbai to your wallet</Text>
                        </View>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white",
  },
  btn: {
    backgroundColor: "#f52e20",
    borderRadius: 10,
    margin: "5%",
    shadowColor: "#f52e20",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 10,
      width: 10
    },
    elevation: 5,
    elevation: 5,
    padding: 10,
  },
  btnText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
    textAlign: "center"
  },
});

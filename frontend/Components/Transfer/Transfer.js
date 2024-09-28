import React, { useEffect } from "react";
import { useState } from "react";
import { useMoralis, useWeb3Transfer } from "react-moralis";
import { Button } from "@ui-kitten/components";
import { ActivityIndicator, Colors, Card } from "react-native-paper";
import { Blockie } from "../Blockie";
import { faAddressBook, faCoins } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import AccountsModal from "./AccountsModal.js";
import CoinModal from "./CoinsModal.js";
import { StyleSheet, SafeAreaView, StatusBar, View, Text, TextInput, Pressable } from "react-native";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
import ERC20Balance from "../Assets/ERC20Balance";
import { useWalletConnect } from "../../WalletConnect";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import Icon from 'react-native-vector-icons/FontAwesome';

const color = "#315399";

function Transfer() {
  const [receiver, setReceiver] = useState();
  const [token, setToken] = useState();
  const [transferType, setTransferType] = useState();
  const [tx, setTx] = useState();
  const [amount, setAmount] = useState();
  const [isPending, setIsPending] = useState(false);
  const [validatedAddress, setValidatedAddress] = useState();

  const [transferOptionsState, setTransferOptionsState] = useState();

  const { fetch, error, isFetching } = useWeb3Transfer(transferOptionsState);

  const { Moralis } = useMoralis();
  const tokenDecimals = token ? token.decimals : "18";
  const tokenAddress = token ? token.token_address : "";

  useEffect(() => {
    if (token && amount && receiver && transferType){
      if(transferType === "native") {
        setTransferOptionsState({
          amount: Moralis.Units.ETH(amount), //Moralis.Units.ETH(0.5) -- if you want to send native currency
          receiver: receiver,
          type: "native", // type: "native" -- if you want to send native currency
        });
      }else{
        setTransferOptionsState({
          amount: Moralis.Units.Token(amount, tokenDecimals), //Moralis.Units.ETH(0.5) -- if you want to send native currency
          receiver: receiver,
          type: "erc20", // type: "native" -- if you want to send native currency
          contractAddress: tokenAddress
        });
      }
    }
  }, [token, amount, receiver]);

  const TransferTheCoins = () => {
    console.log(receiver);
    console.log(token);
    console.log(transferType);
    console.log(amount);
    console.log("TRANSFER CLICKED", transferOptionsState);
    fetch();
  };

  const updateCoinState = (tokenAddress) => {
    if(tokenAddress == undefined) {
      setToken("native");
      setTransferType("native");
    }else{
      setTransferType("erc20");
      setToken(tokenAddress);
    }
  }

  const updateRecieverState = (recieverAddress) => {
    setReceiver(recieverAddress);
  }

  const getTxsStates = () => {
    console.log(receiver);
    console.log(token);
    console.log(transferType);
    console.log(amount);
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.scrollViewContainer}>

          <Text style={{...styles.headerText, marginBottom: "5%" }} category="h4">
            🚀 Transfer
          </Text>

          <View style={styles.optionsBox}>
            <AccountsModal updateRecieverState={updateRecieverState} />

            <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
              <TextInput
                style={styles.amountInput}
                onChangeText={setAmount}
                value={amount}
                placeholder="E.g. 0.125"
                keyboardType="numeric"
              />
              <View style={{ backgroundColor: "#f7f7f7" }}>
                <CoinModal updateCoinState={updateCoinState} />
              </View>
            </View>
          </View>

          <HorizontalLine width={1} color={"grey"} marginBottom={10} marginTop={10} />

          <View>
            <Pressable
              onPress={() => TransferTheCoins()}
              style={styles.transferBtn}
            >
              <View style={{ flexDirection: "row", justifyContent: "center" }}>
                <Text style={styles.transferBtnText}>Transfer</Text>
                <Icon name="send" size={20} color="white" />
              </View>
            </Pressable>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default Transfer;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  scrollViewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  viewContainer: {
    flexDirection: "row",
  },
  transferBtn: {
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
    elevation: 10,
    padding: 10,
    marginTop: "3%",
    marginBottom: "5%",
  },
  transferBtnText: {
    fontWeight: "bold",
    fontSize: 20,
    textAlign: "center",
    color: "white",
    marginEnd: "5%",
  },
  optionsBox: {
    marginBottom: "5%",
    marginTop: "20%",
    //marginLeft: "3%",
    //marginRight: "3%",
    //borderColor: "grey",
    backgroundColor: "#f7f7f7",
    //borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 10,
    paddingBottom: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    marginTop: "3%",
    elevation: 10,
  },
  amountInput: {
    borderColor: "grey",
    backgroundColor: "white",
    width: "55%",
    marginLeft: 5,
    borderRadius: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 4,
    paddingBottom: 4,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    marginTop: "3%",
    elevation: 4,
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 30,
  },
  inputView: {
    borderColor: "grey",
    borderRadius: 15,
    borderWidth: 0.5,
    justifyContent: "space-around",
    // shadowOffset: "5",
    elevation: 10,
    marginTop: 10,
    padding: 20,
    shadowColor: "grey",
    // shadowOffset: { width: 0, height: 3 },
    // shadowOpacity: 0.2,
    // shadowRadius: 10,
  },
  scrollView: {
    backgroundColor: "white",
    marginHorizontal: 10,
  },
  labelText: {
    fontSize: 20,
    fontWeight: "400",
  },
  button: {
    backgroundColor: "green",
    elevation: 5,
  },
  diabledButton: {
    backgroundColor: "grey",
  },
  justifyCenter: {
    justifyContent: "space-around",
  },
  flex1: {
    flex: 1,
  },
  flex4: {
    flex: 4,
  },
});

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
import Icon from 'react-native-vector-icons/Feather';
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import Web3 from 'web3';
import OneGame from "./OneGame";
import { TouchableOpacity } from "react-native-gesture-handler";
import uuid from 'react-native-uuid';



export default function GamesHome() {
  const { Moralis } = useMoralis();

  const contractAddress = "0x285E2b4E1cDEB5994b0d234AE959757A82B924D1";
  const abi = [
    {
      "anonymous": false,
      "inputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "side",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "resultedSide",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "win",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "indexed": false,
          "internalType": "struct CoinFlipGame.Game",
          "name": "",
          "type": "tuple"
        }
      ],
      "name": "CoinFlipped",
      "type": "event"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_side",
          "type": "uint256"
        }
      ],
      "name": "flipCoin",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "bytes32",
          "name": "requestId",
          "type": "bytes32"
        },
        {
          "internalType": "uint256",
          "name": "randomness",
          "type": "uint256"
        }
      ],
      "name": "rawFulfillRandomness",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getAllGamesForAddress",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "side",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "resultedSide",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "win",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "internalType": "struct CoinFlipGame.Game[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        },
        {
          "internalType": "uint256",
          "name": "_id",
          "type": "uint256"
        }
      ],
      "name": "getGamesForAddressById",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "side",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "resultedSide",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "win",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "internalType": "struct CoinFlipGame.Game",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getIsGameRunning",
      "outputs": [
        {
          "internalType": "bool",
          "name": "",
          "type": "bool"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "_address",
          "type": "address"
        }
      ],
      "name": "getLastGame",
      "outputs": [
        {
          "components": [
            {
              "internalType": "uint256",
              "name": "id",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "side",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "resultedSide",
              "type": "uint256"
            },
            {
              "internalType": "bool",
              "name": "win",
              "type": "bool"
            },
            {
              "internalType": "address",
              "name": "player",
              "type": "address"
            },
            {
              "internalType": "bool",
              "name": "completed",
              "type": "bool"
            }
          ],
          "internalType": "struct CoinFlipGame.Game",
          "name": "",
          "type": "tuple"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const [flipping, setFlipping] = useState(false);
  const [games, setGames] = useState([
    { userSide: 1, botSide: 1 },
    { userSide: 1, botSide: 2 },
    { userSide: 2, botSide: 1 },
    { userSide: 2, botSide: 2 },
    { userSide: 1, botSide: 2 },
    { userSide: 1, botSide: 1 },
  ]);

  const flipCoin = async() => {
    try{console.log("flip btn clicked");
    
    const options = {
      contractAddress: contractAddress,
      functionName: "flipCoin",
      abi: abi,
      params: {
        _side: 1,
      },
      awaitReceipt: false // should be switched to false
    };
    
    const tx = await Moralis.executeFunction(options);
    
    tx.on("transactionHash", (hash) => { alert("Hash: "); alert(hash) })
      .on("receipt", (receipt) => { alert("receipt: "); alert(receipt) })
      .on("confirmation", (confirmationNumber, receipt) => { alert("Confirmation: "); alert(confirmationNumber) })
      .on("error", (error) => { alert("err: "); alert(error) });

    setFlipping(prev => !prev);
    }catch(err){
      alert(err);
    }
  }

  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      <ScrollView>
        <View style={styles.innerContainer}>
          <View style={styles.titleView}>
            <Text style={styles.title}>🎯 Coin Flip</Text>
          </View>

          <View style={styles.imageContainer}>
            {
              flipping ? 
                (
                  <Image 
                    style={styles.coinFlipImg}
                    source={{uri: 'https://justflipacoin.com/img/share-a-coin.png'}}
                  />
                )
              :
                (
                  <Text>To start clikc button below!</Text>
                )
            }
          </View>

          <TouchableOpacity
            onPress={() => flipCoin()}
            style={styles.flipBtn}
          >
            <Text style={styles.flipBtnText}>Flip A Coin</Text>
          </TouchableOpacity>

          <HorizontalLine width={1} color={"#b5b5b5"} marginBottom={"5%"} marginTop={"5%"} />

          <View>
            <View style={{ paddingBottom: 20, flexDirection: "row", justifyContent: "space-between", }}>
              <Text style={styles.titleText}>🎮 Your Game History:</Text>
              <View style={styles.refreshBtnView}>
                <TouchableOpacity
                  onPress={() => console.log(games)}
                  style={styles.refreshBtn}
                >
                  <Icon name="refresh-cw" size={25} color="black" />
                </TouchableOpacity>
              </View>
            </View>

            {/*<ScrollView>
              <OneGame userSide={1} botSide={2} />
              <OneGame userSide={2} botSide={2} />
              <OneGame userSide={1} botSide={1} />
              <OneGame userSide={1} botSide={2} />
              <OneGame userSide={1} botSide={1} />
              <OneGame userSide={2} botSide={1} />
            </ScrollView>*/}

            {
              games.map(game => {
                return <OneGame key={uuid.v4()} userSide={game.userSide} botSide={game.botSide} />
              })
            }
          </View>
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
  innerContainer: {
    marginRight: "4%",
    marginLeft: "4%",
    marginTop: "3%",
    marginBottom: "3%",
  },
  coinFlipImg: {
    width: 200,
    height: 200,
    borderRadius: 1000,
    margin: "auto",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: "5%",
  },
  flipBtn: {
    backgroundColor: "blue",
    marginTop: "4%",
    borderRadius: 100,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
    paddingTop: 10,
    marginLeft: "10%",
    marginRight: "10%",
  },
  flipBtnText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 22,
    textAlign: "center",
  },
  refreshBtn: {
    borderRadius: 100,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 5,
    padding: 8,
  },
  refreshBtnView: {
    paddingRight: "3%",
  },
  titleText: {
    fontSize: 20,
    marginTop: "2%",
  },
});

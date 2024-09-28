import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Modal from "react-native-modal";
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
  Button,
  Dimensions,
  Alert,
  ActivityIndicator,
  Pressable,
  TextInput,
} from "react-native";
import uuid from 'react-native-uuid';
import TextArea from "../HtmlComponents/TextArea";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SyntheticPlatformEmitter } from "@unimodules/react-native-adapter";
import { constants } from "buffer";
import Icon from 'react-native-vector-icons/FontAwesome';
import { set } from "react-native-reanimated";
import Address from "../Address";
import Blockie from "../Blockie";
import { getChainDetails } from "../../helpers/networks";
import useNativeBalance from "../../hooks/useNativeBalance"
import useERC20Balance from "../../hooks/useERC20balance";
import Assets from "../Assets/Assets";
import { get } from "http";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


export default function CoinsModal(props) {
  const { setUserData, userError, isUserUpdating, user, refetchUserData } = useMoralis();
  const [visible, setVisible] = useState(false);
  const [getting, setGetting] = useState(false);
  const [coins, setCoins] = useState([]);
  const [selectedCoin, setSelectedCoin] = useState(null);
  const { chainId } = useMoralisDapp();
  const { nativeBalance } = useNativeBalance(chainId);
  const { fetchERC20Balance, assets } = useERC20Balance({ chain: chainId });

  
    const getChainName = () => {
      console.log(chainId);
      let chain = getChainDetails(chainId);
      console.log(chain);
      return chain.chainName;
    }
    const getChainSymbol = () => {
        console.log(chainId);
        let chain = getChainDetails(chainId);
        console.log(chain);
        return chain.currencySymbol;
    }
    
    const fetchContacts = async() => {
        setGetting(true);
        await fetchERC20Balance();
        let currency = getChainSymbol();
        let name = getChainName();
        let allAssests = [...assets, {
            symbol: currency,
            balance: nativeBalance,
            logo: getLogoUrl(chainId),
            name: name,
        }]
        setCoins(allAssests);
        console.log(coins);
        setGetting(false);
    }
    
  /*useEffect(() => {
        (async function getContacts() {
        setGetting(true);
        let currency = getChainSymbol();
        let name = getChainName();
        let allAssests = [...assets, {
            symbol: currency,
            balance: nativeBalance,
            logo: getLogoUrl(chainId),
            name: name,
        }]
        setCoins(allAssests);
        console.log(coins);
        setGetting(false);
      })();
  }, []);*/

  const coinSelected = (coin) => {
    console.log("Selected coin");
    setSelectedCoin(coin);
    setVisible(false);
    console.log(coin);
    props.updateCoinState(coins.address);
  }

  return(
      <ScrollView style={styles.container}>

        <TouchableOpacity
          style={{...styles.selectCoinBtn, padding: 5, backgroundColor: "#f7f7f7" }}
          onPress={() => setVisible(true)}
        >
          {
              selectedCoin ? 
              (
                <View>
                <View style={{...styles.selectedCoin, flexDirection: "row", backgroundColor: "#f7f7f7", }}>
                  {
                    selectedCoin.logo == null || selectedCoin.logo == undefined ?
                    (
                      <Image
                        source={{
                          uri: getLogoUrl("0x")
                        }}
                        style={styles.logo1}
                      />
                    ) 
                      :
                    (
                      <Image
                        source={{
                          uri: `${selectedCoin.logo}`
                        }}
                        style={styles.logo1}
                      />
                    )
                  }
                  <Text>{selectedCoin.symbol}</Text>
                </View>
                  <Text style={{ fontSize: 10, textAlign: "center" }}>{selectedCoin.name}</Text>
                </View>
              )
              :
              (
                <Text style={styles.tokenBtn}>Token</Text>
              )
            }
        </TouchableOpacity>

        <Modal
          isVisible={visible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          avoidKeyboard={false}
          propagateSwipe
          onBackdropPress={() => setVisible(false)}
        >
          <ScrollView style={{ flex: 1, backgroundColor: "white", marginLeft: "6%", marginRight: "6%", marginBottom: "20%", borderRadius: 15 }}>
            <View style={{ flex: 3, padding: 20 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "5%" }}>
                    <Text style={styles.modalTitle}>Token To Send . . .</Text>
                    <Pressable
                    onPress={() => setVisible(false)}
                    style={styles.closeBtn}
                    >
                    <Icon name="close" size={25} color="black" />
                    </Pressable>
                </View>

                <Text>All your tokens on {getChainName()}.</Text>

                <Pressable
                  onPress={() => fetchContacts()}
                  style={styles.refreshBtn}
                >
                  <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
                    <Text style={styles.addBtnText}>Refresh Balances</Text>
                    <Text style={styles.addBtnIcon}>
                      <Icon name="refresh" size={15} color="black" />
                    </Text>
                  </View>
                </Pressable>
                <HorizontalLine width={1} color={"grey"} marginBottom={10} marginTop={10} />

                {
                getting ? 
                  (
                    <View style={styles.noContactsView}>
                      <Text style={styles.noContactsText}>Fetching Your Balances!</Text>
                      <Text style={styles.noContactsText}>Please wait a bit :)</Text>
                    </View>            
                  )
                :
                  (
                    coins ? 
                    (
                      coins.length>0?
                      (
                        coins.map((coin) => {
                          console.log(coin);
                          return(
                            <Pressable
                              key={uuid.v4()}
                              onPress={() => coinSelected(coin)}
                              style={styles.coinBtn}
                            >
                              <SingleCoin
                                name={coin.name}
                                address={coin.address}
                                logo={coin.logo}
                                symbol={coin.symbol}
                              />
                            </Pressable>
                          )
                        })
                      )
                      :
                      (
                        <View style={styles.noContactsView}>
                          <Text style={styles.noContactsText}>You don't hodl any coins!</Text>
                        </View>
                      )
                    )
                    :
                    (
                      <View style={styles.noContactsView}>
                        <Text style={styles.noContactsText}>You don't hodl any coins!</Text>
                        <Text style={styles.noContactsText}>If missing try refreshing!</Text>
                      </View>
                    )
                  )
                }
            </View>
          </ScrollView>
        </Modal>
      
      </ScrollView>
  )
}

const SingleCoin = (props) => {
  return(
    <View style={{ flexDirection: "row" }}>
      {
        props.logo == null || props.logo == undefined ?
        (
          <Image
            source={{
              uri: getLogoUrl()
            }}
            style={styles.logo2}
          />
        ) 
          :
        (
          <Image
            source={{
              uri: props.logo
            }}
            style={styles.logo2}
          />
        )
      }
      <Text style={{ fontSize: 15 }}>{props.name}</Text>
      <Text style={{ marginStart: 5, fontSize: 15 }}>({props.symbol})</Text>
    </View>
  )
} 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  selectCoinBtn: {
    backgroundColor: "#f7f7f7",
  },
  addBtnText: {
    textAlign: "center",
    fontSize: 15,
    //color: "#1f75ff",
    color: "black",
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
  },
  addBtnIcon: {
    /*borderRadius: 100,
    backgroundColor: "white",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 5,*/
    padding: 4,
  },
  refreshBtn: {
    marginBottom: "3%",
    marginTop: "5%",
    borderRadius: 20,
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#f7f7f7",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10,
  }, 
  coinBtn: {
    borderRadius: 100,
    marginTop: "4%",
    backgroundColor: "#f7f7f7",
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 8,
    paddingRight: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4,
  },
  selectedCoin: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#f7f7f7",
    //width: "40%",
    paddingStart: 20,
  },
  tokenBtn: {
    borderColor: "grey",
    backgroundColor: "white",
    //borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    paddingStart: 30,
    paddingEnd: 30,
    paddingTop: 12,
    paddingBottom: 12,
    marginTop: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4,
    textAlign: "center",
    //fontWeight: "500",
    fontSize: 16,
  },
  pfp: {
    height: 35,
    width: 35,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  pfpText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: "#f7f7f7",
  },


  modalTitle: {
    fontWeight: "bold",
    fontSize: 20,
  },  
  input: {
    backgroundColor: "white",
    borderRadius: 100,
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
    paddingBottom: 5,
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
    marginTop: "2%",
    marginBottom: "5%",
  },
  saveBtn: {
    borderRadius: 20,
    backgroundColor: "white",
    padding: 2,
  },
  saveBtnText: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center"
  }, 
  textArea: {
    backgroundColor: "white",
    borderRadius: 10,
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 8,
  },
  addBtn: {
    borderRadius: 20,
    marginRight: "4%",
    marginLeft: "4%",
    padding: 15,
    backgroundColor: "#f7f7f7",
    //backgroundColor: "#f7f7f7",
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 5,
      width: 5
    },
    elevation: 10,
    margin: "4%",
    /*
    width: "92%",
    margin: "4%",
    backgroundColor: "#ebf2ff",
    padding: 15,
    borderRadius: 10,*/
  },
  contact: {
    marginRight: "4%",
    marginLeft: "4%",
    marginTop: "4%",
    padding: 15,
    backgroundColor: "#f7f7f7",
  },
  contactBody: {
    marginTop: "5%",
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  contactButtons: {
    flexDirection: "column",
  },
  sendBtn: {
    marginTop: "8%",
    borderRadius: 10,
    borderColor: "grey",
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },
  saveBtn: {
    marginTop: "10%",
    borderRadius: 10,
    borderColor: "grey",
    padding: 10,
    backgroundColor: "white",
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 30,
    paddingRight: 30,
  },



  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  logo1: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    width: 20,
    height: 20,
    marginRight: 10,
  },
  logo2: {
    textAlign: 'center',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    textAlignVertical: 'center',
    alignContent: 'center',
    width: 25,
    height: 25,
    marginRight: 15,
  },
  noContactsView: {
    alignSelf: "center",
    marginTop: "10%",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 5,
    backgroundColor: "#f7f7f7",
    marginBottom: "5%",
  },
  noContactsText: {
    textAlign: "center",
    fontSize: 18,
  }
});


const getLogoUrl = (chain) => {
  if (chain == "0x1")
    return "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
  else if (chain == "0x38")
    return "https://cryptologos.cc/logos/binance-coin-bnb-logo.png"
  else if (chain == "0x89")
    return "https://cryptologos.cc/logos/polygon-matic-logo.png"
  else if (chain == "0xfa")
    return "https://avatars.githubusercontent.com/u/39045722?s=280&v=4" 
  else if (chain == "0xa86a")
    return "https://miro.medium.com/max/1400/1*p8-OJvYzk135KMU55d_piQ.png"
  else
    return "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"
};

const getLogo = (chain) => {
  if (chain == "0x1")
    return (
      <Image
        source={{
          uri:
            "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png",
        }}
        style={styles.logo}></Image>
    );
  else if (chain == "0x38")
    return (
      <Image
        source={{
          uri:
            "https://cryptologos.cc/logos/binance-coin-bnb-logo.png",
        }}
        style={styles.logo}></Image>
    );
  else if (chain == "0x89")
    return (
      <Image
        source={{ uri: "https://cryptologos.cc/logos/polygon-matic-logo.png" }}
        style={styles.logo}></Image>
    );
  else if (chain == "0xfa")
  return (
    <Image
      source={{ uri: "https://avatars.githubusercontent.com/u/39045722?s=280&v=4" }}
      style={styles.logo}></Image>
  );
  else if (chain == "0xa86a")
  return (
    <Image
      source={{ uri: "https://miro.medium.com/max/1400/1*p8-OJvYzk135KMU55d_piQ.png" }}
      style={styles.logo}></Image>
  );
  else
    return (
      <Image
        source={{
          uri:
            "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png",
        }}
        style={styles.logo}></Image>
    );
};
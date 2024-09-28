import React, { useState, useEffect } from "react";
import { useMoralis } from "react-moralis";
import Modal from "react-native-modal";
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
import TextArea from "../HtmlComponents/TextArea";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SyntheticPlatformEmitter } from "@unimodules/react-native-adapter";
import { constants } from "buffer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { set } from "react-native-reanimated";
import Address from "../Address";
import Blockie from "../Blockie";

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


export default function AccountsModal(props) {
  const { setUserData, userError, isUserUpdating, user, refetchUserData } = useMoralis();
  const [visible, setVisible] = useState(false);
  const [getting, setGetting] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  const fetchContacts = async() => {
    setGetting(true);
    await refetchUserData();
    const userContacts = await user.get("contacts");
    setContacts(userContacts);
    setGetting(false);
  }

  useEffect(() => {
      (async function getContacts() {
        setGetting(true);
        await refetchUserData();
        const userContacts = await user.get("contacts");
        setContacts(userContacts);
        setGetting(false);
      })();
  }, []);

  const contactSelected = (contact) => {
    console.log("Selected contac");
    setSelectedContact(contact);
    setVisible(false);
    console.log(contact);
    props.updateRecieverState(contact.address);
  }
  
  return(
      <ScrollView style={styles.container}>

        <TouchableOpacity
          style={{ backgroundColor: "#f7f7f7", padding: 5 }}
          onPress={() => setVisible(true)}
        >
            {
              selectedContact ? 
              (
                <View style={{ flexDirection: "row" }}>
                  <View style={{ ...styles.pfp, backgroundColor: "#" + getRandomColor(), }}>
                    <Text style={styles.pfpText}>{(selectedContact.name).charAt(0)}</Text>
                  </View>
                  <Text>{selectedContact.name} ({displayAddress(selectedContact.address)})</Text>
                </View>
              )
              :
              (
                <Text style={styles.addressBtn}>Select Address</Text>
              )
            }
        </TouchableOpacity>

        <Modal
          isVisible={visible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          propagateSwipe
          avoidKeyboard={false}
          onBackdropPress={() => setVisible(false)}
        >
          <ScrollView style={{ flex: 1, backgroundColor: "white", marginLeft: "6%", marginRight: "6%", marginBottom: "20%", borderRadius: 15 }}>
            <View style={{ flex: 1, padding: 20 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "5%" }}>
                <Text style={styles.modalTitle}>Send to . . .</Text>
                <Pressable
                onPress={() => setVisible(false)}
                style={styles.closeBtn}
                >
                <Icon name="close-thick" size={25} color="black" />
                </Pressable>
              </View>

              <Pressable
                onPress={() => fetchContacts()}
              >
                <Text>ReFetch Contatcs</Text>
              </Pressable>

              {
              getting ? 
                (
                  <View style={styles.noContactsView}>
                    <Text style={styles.noContactsText}>Fetching Contacts!</Text>
                    <Text style={styles.noContactsText}>Please wait a bit :)</Text>
                  </View>            
                )
              :
                (
                contacts ?
                  (
                    contacts.map((contact) => {
                      console.log(contact);
                      return(
                        <Pressable
                          key={contact.address}
                          onPress={() => contactSelected(contact)}
                        >
                          <SingleContact name={contact.name} address={contact.address} /> 
                        </Pressable>
                    )
                    })
                  )
                :
                  (
                    <View style={styles.noContactsView}>
                      <Text style={styles.noContactsText}>You don't have any contacts!</Text>
                      <Text style={styles.noContactsText}>Add them in Contacts page :)</Text>
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

const displayAddress = (address) => {
    let fullAddress = address;
    let firstLetters = fullAddress.substring(0, 5);
    let lastLetters = fullAddress.substring(fullAddress.length-6, fullAddress.length-1);
    return `${firstLetters}...${lastLetters}`;
}

const SingleContact = (props) => {
    return(
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
            <Text>{props.name}</Text>
            <Text>{displayAddress(props.address)}</Text>
        </View>
    )
}

const getRandomColor = () => {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}  

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
  addressBtn: {
    borderColor: "grey",
    backgroundColor: "white",
    //borderWidth: 1,
    width: "100%",
    borderRadius: 10,
    paddingStart: 20,
    paddingEnd: 20,
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
    //textAlign: "center",
    //fontWeight: "500",
    fontSize: 16,
    color: "black",
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
  addBtnText: {
    textAlign: "center",
    fontSize: 17,
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
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
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import TextArea from "../HtmlComponents/TextArea";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import SingleContact from "./SingleContact";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SyntheticPlatformEmitter } from "@unimodules/react-native-adapter";
import { constants } from "buffer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const deviceWidth = Dimensions.get("window").width;
const deviceHeight =
  Platform.OS === "ios"
    ? Dimensions.get("window").height
    : require("react-native-extra-dimensions-android").get(
        "REAL_WINDOW_HEIGHT"
      );


export default function AddNewContact() {
  const { setUserData, userError, isUserUpdating, user, refetchUserData } = useMoralis();
  const [isCreateModalVisible, setIsCreateModalVisible] = useState(false);
  const [isSavingModalVisible, setIsSavingModalVisible] = useState(false);
  const [name, onChangeName] = useState("");
  const [address, onChangeAddress] = useState("");
  const [description, setDescription] = useState("");


  const createNewContact = async() => {
    try{
      if(name.length>0 && description.length>0 && address.length>0) {
        let prevContacts = [];
        const usersContacts = await user.get("contacts");
        prevContacts.push(usersContacts);
        console.log(prevContacts[0])
        if(prevContacts[0] != undefined) {
          let addressAlreadyExists = false;

          prevContacts.map((contact) => {
            if(contact.address === address) {
              addressAlreadyExists = true;
            }
          });

          if(addressAlreadyExists === false) {
            await setUserData({ 
              contacts: [
                ...prevContacts,
                {
                  "name": name,
                  "address": address,
                  "description": description,
                }
              ]
            });
            afterContactSaved();
          }else{
            alert("Contact with this address already exists!");
          }
        }else{
          await setUserData({ 
            contacts: [
              {
                "name": name,
                "address": address,
                "description": description,
              }
            ]
          });
          afterContactSaved();
        }
      }else{
        alert("Pleas fill in all the fields!");
      }
    }catch(err){
      console.log(err);
    }
  }


  const afterContactSaved = () => {
    alert("Contact Saved! :)");
    setIsCreateModalVisible(false);
    onChangeName("");
    onChangeAddress("");
    setDescription("");
  }
  
  
  return(
      <ScrollView style={styles.container}>

        <TouchableOpacity 
          style={styles.addBtn}
          onPress={() => setIsCreateModalVisible(true)}
        >
          <View style={{ flexDirection: 'row', justifyContent: "space-between" }}>
            <Text style={styles.addBtnText}>Add New Contact</Text>
            <Text style={styles.addBtnIcon}>
              <Icon name="plus" size={25} color="black" />
            </Text>
          </View>
        </TouchableOpacity>

        <Modal
          isVisible={isCreateModalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
          avoidKeyboard={false}
          onBackdropPress={() => setIsCreateModalVisible(false)}
        >
          <View style={{ flex: 1, backgroundColor: "#ebf2ff", marginLeft: "6%", marginRight: "6%", borderRadius: 20, padding: 20, }}>
            <View style={{ flex: 1 }}>
              <View style={{ flexDirection: "row", justifyContent: "space-between", marginBottom: "5%" }}>
                <Text style={styles.modalTitle}>Create Contact!</Text>
                <Pressable
                  onPress={() => setIsCreateModalVisible(false)}
                  style={styles.closeBtn}
                >
                  <Icon name="close-thick" size={25} color="black" />
                </Pressable>
              </View>

            <Text>Contact Name:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeName}
              value={name}
              placeholder="E.g. Joh Smith"
            />

            <Text>Contact Address - make sure it is right!:</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeAddress}
              value={address}
              placeholder="Address - double check it!"
            />

            <Text>Contact Description:</Text>
            <TextArea 
              multiline
              numberOfLines={3}
              onChangeText={_text => setDescription(_text)}
              style={styles.textArea}
              value={description}
              maxLength = {150}
              placeholder="E.g. John's main wallet . . . EMOJIS ALSO SUPPORTED "
            />

            <Pressable
              onPress={() => createNewContact()}
              style={styles.saveBtn}
            >
              <Text style={styles.saveBtnText}>Save</Text>
            </Pressable>
            </View>
          </View>
          <View style={{ flex: 1 }}></View>
        </Modal>

        <Modal
          isVisible={isSavingModalVisible}
          deviceWidth={deviceWidth}
          deviceHeight={deviceHeight}
        >
          <View style={{ flex: 1, backgroundColor: "white", }}>
            <Text>Saving Contact!</Text>
            <TouchableOpacity 
              onPress={() => setIsSavingModalVisible(false)}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>
        
      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
  },
  saveBtnText: {
    fontWeight: "500",
    fontSize: 18,
    textAlign: "center"
  }, 
  textArea: {
    shadowColor: "black",
    shadowOffset: {
      width: 10,
      height: 10
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    elevation: 2,
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
  }
});
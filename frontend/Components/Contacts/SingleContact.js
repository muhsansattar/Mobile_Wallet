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
  Pressable,
} from "react-native";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import TextArea from "../HtmlComponents/TextArea";
import Blockie from "../Blockie";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SyntheticPlatformEmitter } from "@unimodules/react-native-adapter";
import { constants } from "buffer";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SingleContact(props) {
  const [description, setDescription] = useState("Add notes to this contact . . .");
  const { setUserData, userError, isUserUpdating, user } = useMoralis();

  const updateDescription = async(_address) => {
    try{
      console.log(_address);
      let currentContact;
      let prevContacts = [];
      const allContacts = user.get("contacts");
      allContacts.map((contact) => {
        if(_address !== contact.address && contact != undefined) { prevContacts.push(contact); }
        else { currentContact = contact; }
      });
      const name = currentContact.name;

      await setUserData({ 
        contacts: [
          ...prevContacts,
          {
            "name": name,
            "address": _address,
            "description": description,
          }
        ]
      });

      alert("Changes updated!");
    }catch(err){
      console.log(err);
      alert(err);
    }
  }

  const deleteContact = async() => {
    try{
      console.log("deleting");
      let contactToDelete;
      let contactsToLeave = [];
      const allContacts = user.get("contacts");
      allContacts.map((contact) => {
        if(contact.address === props.address) {
          contactToDelete = contact;
        }else{
          contactsToLeave.push(contact);
        }
      });

      await setUserData({ 
        contacts: [
          ...contactsToLeave
        ]
      });

      alert("Contact Deleted Successfully!");
    }catch(err){ 
      alert(err);
    }
  }


  useEffect(() => {
    setDescription(props.description);
  }, [])

  return(
    <View style={styles.outerBox}>
      <Collapse style={styles.contact}>
        <CollapseHeader>
          <View style={styles.contactHeader}>
            <View style={{ flexDirection: "row" }}>
              <View style={{ ...styles.pfp, backgroundColor: "#" + getRandomColor(), }}>
                <Text style={styles.pfpText}>{(props.name).charAt(0)}</Text>
              </View>
              <View style={styles.contactText}>
                <Text style={styles.contactName}>{props.name}</Text>
                <Text style={styles.contactAddress}>{displayAddress(props.address)}</Text>
              </View>
            </View>
            <View>
              <Pressable
                onPress={() => deleteContact()}
                style={styles.deleteBtn}
              >
                <Text style={{
                  textAlign: 'center',
                  alignSelf: 'center',
                  justifyContent: 'center',
                  alignItems: 'center',
                  textAlignVertical: 'center',
                  alignContent: 'center',
                }}>
                  <Icon name="delete-forever-outline" size={25} color="black" />
                </Text>
              </Pressable>
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.contactBody}>
            <TextArea 
              multiline
              numberOfLines={3}
              onChangeText={_text => setDescription(_text)}
              style={styles.textArea}
              value={description}
              maxLength={150}
            />
            <View style={styles.contactButtons}>
              <Pressable style={styles.sendBtn}>
                <Text>Send</Text>
              </Pressable>
              <Pressable 
                style={styles.saveBtn}
                onPress={() => updateDescription(props.address)}
              >
                <Text>Save</Text>
              </Pressable>
            </View>
          </View>
        </CollapseBody>
      </Collapse>
    </View>
  )
}


const getRandomColor = () => {
  const randomColor = Math.floor(Math.random()*16777215).toString(16);
  return randomColor;
}

const displayAddress = (address) => {
  let fullAddress = address;
  let firstLetters = fullAddress.substring(0, 7);
  let lastLetters = fullAddress.substring(fullAddress.length-8, fullAddress.length-1);
  return `${firstLetters}...${lastLetters}`;
}


const styles = StyleSheet.create({
  outerBox: {
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
      height: 1,
      width: 1
    },
    elevation: 5,
    marginBottom: "4%",
  },
  deleteBtn: {
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
  pfp: {
    height: 40,
    width: 40,
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
  textArea: {
    borderColor: "grey",
    backgroundColor: "white",
    //borderWidth: 1,
    borderRadius: 10,
    width: "65%",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 8,
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4,
  },
  addBtn: {
    width: "92%",
    margin: "4%",
    backgroundColor: "#ebf2ff",
    padding: 15,
    borderRadius: 10,
  },
  addBtnText: {
    textAlign: "center",
    fontSize: 17,
    color: "#1f75ff",
  },
  contactBody: {
    marginTop: "3%",
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
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4,
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
    shadowColor: "#000000",
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1
    },
    elevation: 4,
  },
  contactHeader: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  contactText: {
    marginLeft: "15%",
  }
});


/*<Collapse style={styles.contact}>
        <CollapseHeader>
          <View style={styles.contactHeader}>
            <View style={styles.contactText}>
              <Text style={styles.contactName}>{props.name}</Text>
              <Text style={styles.contactAddress}>{props.address}</Text>
            </View>
          </View>
        </CollapseHeader>
        <CollapseBody>
          <View style={styles.contactBody}>
            <TextArea 
              multiline
              numberOfLines={3}
              onChangeText={_text => setText(_text)}
              style={styles.textArea}
              value={text}
            />
            <View style={styles.contactButtons}>
              <TouchableOpacity style={styles.sendBtn}>
                <Text>Send</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.saveBtn}>
                <Text>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </CollapseBody>
  </Collapse>*/
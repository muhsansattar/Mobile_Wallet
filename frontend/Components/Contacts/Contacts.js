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
  Pressable
} from "react-native";
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';
import TextArea from "../HtmlComponents/TextArea";
import HorizontalLine from "../HtmlComponents/HorizontalLine";
import SingleContact from "./SingleContact";
import AddNewContact from "./AddNewContact";
import { TouchableOpacity } from "react-native-gesture-handler";
import { SyntheticPlatformEmitter } from "@unimodules/react-native-adapter";
import { constants } from "buffer";
import Icon from 'react-native-vector-icons/Feather';


export default function Contacts() {
  const [text, setText] = useState("Add notes to this contact . . .");
  const [contacts, setContacts] = useState([]);
  const [getting, setGetting] = useState(true);
  const { setUserData, userError, isUserUpdating, user, refetchUserData } = useMoralis();

  useEffect(() => {
    getUserContacts();
  }, [])

  const getUserContacts = async() => {
    try{
      await refetchUserData();
      setContacts(user.get("contacts"));
      console.log(user.get("contacts"));
      setGetting(false);
    }catch(err){
      alert(err);
    }
  }

  return(
      <ScrollView style={styles.container}>

        <AddNewContact />

        <View style={{marginLeft: "4%", marginRight: "4%"}}><HorizontalLine width={1} color={"#b5b5b5"} marginBottom={10} marginTop={10} /></View>

        <View style={{ marginLeft: "4%", marginRight: "4%", marginBottom: "6%", marginTop: "2%", flexDirection: "row", justifyContent: "space-between", }}>
          <Text style={styles.titleText}>👨‍👩‍👧‍👦 Your Contacts:</Text>
          <Pressable
            onPress={() => getUserContacts()}
            style={styles.refreshBtn}
          >
            <Icon name="refresh-cw" size={25} color="black" />
          </Pressable>
        </View>

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
              contacts && contacts.length>0 ?
                (
                  contacts.map((contact) => {
                    console.log(contact);
                    return(
                      <SingleContact 
                        name={contact.name}
                        address={contact.address}
                        description={contact.description}
                        key={contact.address}
                      />
                    )
                  })
                )
              :
                (
                  <View style={styles.noContactsView}>
                    <Text style={styles.noContactsText}>You don't have any contacts!</Text>
                    <Text style={styles.noContactsText}>Add them above :)</Text>
                  </View>
                )
            )
        }

      </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
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
    marginRight: "5%"
  },
  textArea: {
    borderColor: "grey",
    backgroundColor: "white",
    borderRadius: 10,
    width: "65%",
    paddingStart: 10,
    paddingEnd: 10,
    paddingTop: 4,
    paddingBottom: 4,
    marginTop: 8,
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
  titleText: {
    fontSize: 20,
    marginTop: "2%",
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
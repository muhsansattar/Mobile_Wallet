import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import useERC20Balance from "../../hooks/useERC20balance";
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
import NativeBalance from "./NativeBalance";
import ERC20Balance from "./ERC20Balance";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUniversity } from "@fortawesome/free-solid-svg-icons";
import { Card } from "@ui-kitten/components";
import HorizontalLine from "../HtmlComponents/HorizontalLine.js";


export default function Assets() {
  const { Moralis } = useMoralis();
  // const nativeName = useMemo(() => getNativeByChain(options?.chain || chainId), [options, chainId]);🏦
  return (
    <SafeAreaView style={[StyleSheet.absoluteFill, styles.container]}>
      <ScrollView>
        <View style={styles.viewContainer}>
          <Text style={styles.headerText} category="h4">
            Assets
          </Text>
          <Text style={styles.headerDescription}>Here are fetched all your assets from 5 most used blockchains 😀</Text>

          <View style={styles.balancesBox}>
            <View style={{ flexDirection: 'row', marginBottom: "7%" }}>
              <Image source={{ uri: "https://cryptologos.cc/logos/avalanche-avax-logo.png" }} style={styles.logo} />
              <Text style={styles.chainText} category="c2">
                Avalanche C-Chain
              </Text>
            </View>
            <NativeBalance chain="0xa86a" />
            <ERC20Balance chain="0xa86a" />
          </View>

          <View style={styles.balancesBox}>
            <View style={{ flexDirection: 'row', marginBottom: "7%" }}>
              <Image source={{ uri: "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"}} style={styles.logo} />
              <Text style={styles.chainText} category="c2">
                Ethereum
              </Text>
            </View>
            <NativeBalance chain="0x1" />
            <ERC20Balance />
          </View>

          <View style={styles.balancesBox}>
            <View style={{ flexDirection: 'row', marginBottom: "7%" }}>
              <Image source={{ uri: "https://assets.trustwalletapp.com/blockchains/smartchain/info/logo.png" }} style={styles.logo} />
              <Text style={styles.chainText} category="c2">
                Binance Smart Chain
              </Text>
            </View>
            <NativeBalance chain="0x38" />
            <ERC20Balance chain="0x38" />
          </View>
    
          <View style={styles.balancesBox}>
            <View style={{ flexDirection: 'row', marginBottom: "7%" }}>
              <Image source={{ uri: "https://assets.coingecko.com/coins/images/4713/large/matic-token-icon.png?1624446912" }} style={styles.logo} />
              <Text style={styles.chainText} category="c2">
                Polygon Chain
              </Text>
            </View>
            <NativeBalance chain="0x89" />
            <ERC20Balance chain="0x89" />
          </View>

          <View style={{ ...styles.balancesBox, marginBottom: 20 }}>
            <View style={{ flexDirection: 'row', marginBottom: "7%" }}>
              <Image source={{ uri: "https://cryptologos.cc/logos/fantom-ftm-logo.png" }} style={styles.logo} />
              <Text style={styles.chainText} category="c2">
                Fantom Chain
              </Text>
            </View>
            <NativeBalance chain="0xfa" />
            <ERC20Balance chain="0xfa" />
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
    //marginTop: StatusBar.currentHeight || 0,
    backgroundColor: "white",
  },
  chainText: {
    fontSize: 20,
    color: "#414a4c",
    paddingHorizontal: 5,
    fontWeight: "600",
  },
  headerText: {
    color: "black",
    fontWeight: "600",
    fontSize: 33,
    marginTop: 10,
    marginBottom: "4%",
  },
  viewContainer: {
    paddingHorizontal: 20,
    paddingTop: 10,
    flex: 10,
  },
  balancesBox: {
    backgroundColor: "#F5F5F5",
    marginTop: 25,
    borderWidth: 1,
    borderRadius: 20,
    borderColor: "#F5F5F5",
    padding: 12,
  },
  logo: {
    height: 28,
    width: 28,
    borderRadius: 500,
    marginRight: 5,
  },
  headerDescription: {
    marginBottom: "5%",
  }
});

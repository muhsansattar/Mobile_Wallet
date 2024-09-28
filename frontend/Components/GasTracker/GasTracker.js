import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';
import BottomModal from './BottomSheet/BottomSheet';

export default function App() {

  const [ethPrice, setEthPrice] = useState(0);

  const [slow, setSlow] = useState(0);
  const [slowUsd, setSlowUsd] = useState(0);

  const [normal, setNormal] = useState(0);
  const [normalUsd, setNormalUsd] = useState(0);

  const [fast, setFast] = useState(0);
  const [fastUsd, setFastUsd] = useState(0);

  const [instant, setInstant] = useState(0);
  const [instantUsd, setInstantUsd] = useState(0);
  const [ethStats, setEthStats] = useState({})

  useEffect(() => {
    fetchData();
  }, [])

  const fetchEth = async() => {
    setEthPrice(0);
    await fetch("https://api.coinpaprika.com/v1/tickers/eth-ethereum")
    .then(response => response.json())
    .then(data => {
      setEthPrice((data.quotes.USD.price).toFixed(2));
      setEthStats(data)
      console.log(data.quotes.USD.ath_date)
    });
  }

  const fetchData = async() => {
    setSlow(0);
    setSlowUsd(0);
    
    setNormal(0);
    setNormalUsd(0);
    
    setFast(0);
    setFastUsd(0);
    
    setInstant(0);
    setInstantUsd(0);
    console.log("Fetching Data!");
    fetch('https://owlracle.info/eth/gas')
    .then(response => response.json())
    .then(data => {
      setSlow(Math.round(data.speeds[0].gasPrice * 10) / 10);
      setSlowUsd(Math.round(data.speeds[0].estimatedFee * 100) / 100);
      
      setNormal(Math.round(data.speeds[1].gasPrice * 10) / 10);
      setNormalUsd(Math.round(data.speeds[1].estimatedFee * 100) / 100);
      
      setFast(Math.round(data.speeds[2].gasPrice * 10) / 10);
      setFastUsd(Math.round(data.speeds[2].estimatedFee * 100) / 100);
      
      setInstant(Math.round(data.speeds[3].gasPrice * 10) / 10);
      setInstantUsd(Math.round(data.speeds[3].estimatedFee * 100) / 100);
    });

    await fetchEth();
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ethereum Gas Tracker</Text>

      <BottomModal ethPrice={ethPrice} ethStats={ethStats} fetchData={fetchEth}/>

      <View style={styles.gasGrid}>
        <ScrollView style={styles.gasBox}>
          <Text style={styles.gasTitle}>Slow 🐌</Text>
          <Text style={styles.gwei}>{slow} gwei</Text>
          <Text style={styles.usd}>~${slowUsd}</Text>
        </ScrollView>
        <ScrollView style={styles.gasBox}>
          <Text style={styles.gasTitle}>Normal ⏳</Text>
          <Text style={styles.gwei}>{normal} gwei</Text>
          <Text style={styles.usd}>~${normalUsd}</Text>
        </ScrollView>
        <ScrollView style={styles.gasBox}>
          <Text style={styles.gasTitle}>Fast 🚀</Text>
          <Text style={styles.gwei}>{fast} gwei</Text>
          <Text style={styles.usd}>~${fastUsd}</Text>
        </ScrollView>
        <ScrollView style={styles.gasBox}>
          <Text style={styles.gasTitle}>Instant ⚡</Text>
          <Text style={styles.gwei}>{instant} gwei</Text>
          <Text style={styles.usd}>~${instantUsd}</Text>
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={fetchData}
      >
        <Text style={styles.btnText}>Refresh</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  usd: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
    color: "#c0c0c0",
  },
  gwei: {
    marginTop: "10%",
    marginBottom: "5%",
    color: "white",
    fontSize: 25,
    textAlign: "center",
    color: "#c0c0c0",
  },
  container: {
    flex: 1,
    backgroundColor: '#232628',
  },
  title: {
    color: "white",
    fontSize: 35,
    marginTop: 40,
    textAlign: "left",
    marginLeft: "2%"
  },
  gasBox: {
    display: "flex",
    backgroundColor: "#383F4C",
    width: "46%",
    height: "44%",
    margin: "2%",
    borderRadius: 25,
    padding: "3%",
    shadowColor: "white",
  },
  gasGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'flex-start'
  },
  gasTitle: {
    color: "white",
    textAlign: "center",
    fontSize: 30
  },
  ethPriceBox: {
    backgroundColor: "#383F4C",
    margin: "2%",
    marginTop: "10%",
    marginBottom: "5%",
    borderRadius: 20,
    padding: "5%",
    shadowColor: "white",
  },
  ethPriceText: {
    color: "white",
    fontSize: 22,
  },
  btn: {
    marginBottom: "6%",
    padding: "5%",
    margin: "2%",
    backgroundColor: "#383F4C",
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  }
});

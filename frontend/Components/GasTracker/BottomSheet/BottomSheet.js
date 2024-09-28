import React, { useRef, useState } from "react";
import { SafeAreaView, TouchableOpacity, Text, StyleSheet, Dimensions, View, ScrollView, Image } from "react-native";
import BottomSheet from "react-native-gesture-bottom-sheet";
import Hr from "../../HtmlComponents/HorizontalLine.js";
import Table from "../PriceChangeTable/PriceChangeTable";


const BottomModal = (props) => {
  const bottomSheet = useRef();
  const bottomModalHeight = Dimensions.get("window").height * 0.85;

  const getFormatedNum = (num) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  const getColor = (num) => {
    if(num < 0) return "red";
    if(num >= 0) return "#7CFC00";
  }

  return (
    <SafeAreaView>
      <BottomSheet hasDraggableIcon sheetBackgroundColor={"#383F4C"} ref={bottomSheet} radius={30} hasDraggableIcon={true} height={bottomModalHeight}>
        <ScrollView style={styles.sheetContent}>
          <View style={{ flexDirection: 'row' }}>
            <Image
              style={styles.coinLogo}
              source={{ uri: "https://seeklogo.com/images/E/ethereum-logo-EC6CDBA45B-seeklogo.com.png"}}
            />
            <Text style={styles.coinTitle}>Ethereum (ETH)</Text>
          </View>
          {
            props.ethStats.quotes===undefined ? null : 
            (
            <View>
              <View>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: "7%" }}>
                  <Text style={{ color: "white", ...styles.coinPriceChangeText }}>${props.ethPrice}</Text>
                  <Text style={{ color: getColor(props.ethStats.quotes.USD.percent_change_24h), ...styles.coinPriceChangeText }}>{props.ethStats.quotes.USD.percent_change_24h}%</Text>
                </View>
              
                <Table ethStats={props.ethStats} getColor={getColor}/>

                <View style={styles.statsBox}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>Market Cap:</Text>
                    <Text style={styles.detailsText}>${getFormatedNum(props.ethStats.quotes.USD.market_cap)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>Market Cap 24h Change:</Text>
                    <Text style={styles.detailsText}>{getFormatedNum(props.ethStats.quotes.USD.market_cap_change_24h)}%</Text>
                  </View>
                  <Hr width={1} mbt={"4%"} color={"grey"} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>Volume 24h:</Text>
                    <Text style={styles.detailsText}>${getFormatedNum(props.ethStats.quotes.USD.volume_24h)}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>Volume 24h Change:</Text>
                    <Text style={styles.detailsText}>{getFormatedNum(props.ethStats.quotes.USD.volume_24h_change_24h)}%</Text>
                  </View>
                  <Hr width={1} mbt={"4%"} color={"grey"} />
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>All Time High:</Text>
                    <Text style={styles.detailsText}>${getFormatedNum((props.ethStats.quotes.USD.ath_price).toFixed(2))}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>All Time High Date:</Text>
                    <Text style={styles.detailsText}>{props.ethStats.quotes.USD.ath_date}</Text>
                  </View>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Text style={styles.detailsText}>Since All Time High:</Text>
                    <Text style={styles.detailsText}>{getFormatedNum(props.ethStats.quotes.USD.percent_from_price_ath)}%</Text>
                  </View>
                </View>
              </View>
            </View>
          )}
          <TouchableOpacity
            style={styles.refreshBtn}
            onPress={() => props.fetchData()}
          >
            <Text style={styles.refreshBtnText}>Refresh</Text>
          </TouchableOpacity>
        </ScrollView>
      </BottomSheet>
      
      <TouchableOpacity
        style={styles.button}
        onPress={() => bottomSheet.current.show()}
        >
        <Text style={styles.btnText}>Ethereum (ETH):  ${props.ethPrice}</Text>  
      </TouchableOpacity>
    
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  refreshBtn: {
    padding: "4%",
    backgroundColor: "#4d525a",
    borderColor: "grey",
    borderWidth: 2,
    borderRadius: 20,
  },
  refreshBtnText: {
    color: "white",
    textAlign: "center",
    fontSize: 25,
  },
  sheetContent: {
    marginTop: "2%",
    marginBottom: 0,
    height: "100%",
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 5,
  },
  button: {
    backgroundColor: "#383F4C",
    margin: "2%",
    marginTop: "10%",
    marginBottom: "5%",
    borderRadius: 20,
    padding: "5%",
  },
  btnText: {
    textAlign: "left",
    color: "white",
    fontSize: 22,
    fontWeight: "600",
  },
  coinTitle: {
    color: "white",
    fontSize: 25,
    marginTop: "2%",
    marginStart: "5%"
  },
  detailsText: {
    fontSize: 15,
    color: "white",
    margin: "1.25%",
  },
  statsBox: {
    borderColor: "grey",
    borderRadius: 30,
    borderWidth: 2,
    padding: "3%",
    marginTop: "8%",
    marginBottom: "8%",
    backgroundColor: "#4d525a",
  },
  coinLogo: {
    borderRadius: 100,
    width: 50,
    height: 50,
    borderColor: "white",
    borderWidth: 2,
  },
  coinPriceChangeText: {
    fontWeight: "900",
    fontSize: 27,
    marginLeft: "3%",
    marginRight: "3%",
    marginTop: "5%",
  }
});

export default BottomModal;




/**
    shadowOpacity: 0.7,
 * 
 *     shadowColor: "white",
    shadowOffset: {
      height: 4,
      width: 4,
    },
    shadowRadius: 5,
    elevation: 6,



        backgroundColor: "#414855",

 */
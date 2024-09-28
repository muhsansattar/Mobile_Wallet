import React, { useState } from "react";
import { useMoralis } from "react-moralis";
import {
  FlatList,
  View,
  Text,
  Image,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
import { getEllipsisTxt } from "../../utils/formatters";
import useERC20Balance from "../../hooks/useERC20balance";
import useTokenPrice from "../../hooks/useTokenPrice";
import { Divider } from "@ui-kitten/components";
import TextArea from "../HtmlComponents/TextArea.js"
import {Collapse,CollapseHeader, CollapseBody, AccordionList} from 'accordion-collapse-react-native';

const DefaultLogoBasedOnChain = ({ chain }) => {
  if (chain == "0x1")
    return (
      <Image
        source={{
          uri:
            "https://ethereum.org/static/6f05d59dc633140e4b547cb92f22e781/a7715/eth-diamond-purple-white.jpg",
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

const Item = ({ name, logo, balance, symbol, price, tokenAddress, chain }) => {
  const priceOptions = { chain: chain, address: tokenAddress };

  const { tokenPrice } = useTokenPrice(priceOptions);
  const [isUSDMode, setIsUSDMode] = useState(true);
  const toggleDisplayStyle = () => setIsUSDMode(!isUSDMode);
  const tokenPriceFormatted =
    tokenPrice && (isUSDMode ? tokenPrice.usdPrice : tokenPrice.nativePrice);
  const balanceFormatted = Math.round(balance * 100) / 100;
  const tokenPriceInNumber = tokenPriceFormatted
    ? parseFloat(tokenPriceFormatted.substring(1).replace(/,/g, "")).toFixed(5)
    : 0;

    const [value, onChangeText] = useState('Useless Multiline Placeholder');

  return (
    <Collapse>
      <View style={styles.itemContainer}>
      <CollapseHeader>
        <View style={styles.itemView}>
          <View style={{ flex: 1 }}>
            {logo ? (
              <Image source={{ uri: logo }} style={styles.logo} />
            ) : (
              <DefaultLogoBasedOnChain chain={chain} />
            )}
          </View>
          <View style={{ flex: 2, justifyContent: "center" }}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.balance} ellipsizeMode={"tail"}>
              {balanceFormatted} {symbol}
            </Text>
          </View>
          <View
            style={{
              flex: 2,
              justifyContent: "center",
              alignItems: "flex-end",
            }}>
            <Text style={styles.dollarBalance}>{tokenPriceFormatted}</Text>
            <Text style={styles.balance}>
              ${parseFloat(tokenPriceInNumber * balanceFormatted).toFixed(3)}
            </Text>
          </View>
        </View>
        </CollapseHeader>
        <CollapseBody>
        <TextArea 
          multiline
          numberOfLines={3}
          onChangeText={text => onChangeText(text)}
          style={{padding: 10}}
          placeholder={"Add notes to your token . . ."}
        />

        <Divider style={{ width: "95%" }} />
        </CollapseBody>
      </View>
    </Collapse>
  );
};

function ERC20Balance(props) {
  const { assets } = useERC20Balance(props);
  const { Moralis } = useMoralis();

  const renderItem = ({ item }) => {
    return (
      <Pressable onPress={() => (props.setToken ? props.setToken(item) : null)}>
        <Item
          name={item.name}
          logo={item.logo}
          balance={parseFloat(
            Moralis.Units.FromWei(item.balance, item.decimals).toFixed(6)
          )}
          symbol={item.symbol}
          tokenAddress={item.token_address}
          chain={props.chain}
        />
      </Pressable>
    );
  };

  return (
    <FlatList
      style={styles.assetsViewer}
      scrollEnabled={false}
      data={assets}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
    />
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 5,
    borderRadius: 10,
    borderColor: "red",
  },
  itemView: {
    backgroundColor: "white",
    padding: 20,
    // marginVertical: 8,
    marginHorizontal: 2,
    flex: 1,
    flexDirection: "row",
    borderRadius: 10,
  },
  balance: {
    fontSize: 15,
    color: "grey",
    fontWeight: "400",
  },
  dollarBalance: {
    fontSize: 15,
    color: "#414a4c",
    fontWeight: "600",
  },
  name: {
    fontSize: 15,
    color: "black",
    fontWeight: "500",
  },
  logo: {
    height: 40,
    width: 40,
  },
  assetsViewer: {
    borderRadius: 10,
  },
});

export default ERC20Balance;

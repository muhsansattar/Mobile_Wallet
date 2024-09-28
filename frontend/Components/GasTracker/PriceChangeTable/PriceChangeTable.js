import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';

export default function Table(props) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 2, borderTopWidth: 2, borderRightWidth: 1, borderTopLeftRadius: 15, backgroundColor: "#4d525a" }} >
                    <Text style={styles.tableHeadText}>1h</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 2, borderRightWidth: 1, backgroundColor: "#4d525a" }} >
                    <Text style={styles.tableHeadText}>24h</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 2, borderRightWidth: 1, backgroundColor: "#4d525a" }} >
                    <Text style={styles.tableHeadText}>7d</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 2, borderRightWidth: 1, backgroundColor: "#4d525a" }} >
                    <Text style={styles.tableHeadText}>30d</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 2, borderRightWidth: 2, borderTopRightRadius: 15, backgroundColor: "#4d525a" }} >
                    <Text style={styles.tableHeadText}>1y</Text>
                </View>
            </View>
            <View style={{ flex: 1, alignSelf: 'stretch', flexDirection: 'row' }}>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 2, borderTopWidth: 0, borderRightWidth: 1.5, borderBottomLeftRadius: 15 }} >
                    <Text style={{ color: props.getColor(props.ethStats.quotes.USD.percent_change_1h), ...styles.tableBodyText}}>{props.ethStats.quotes.USD.percent_change_1h}%</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 0, borderRightWidth: 1 }} >
                    <Text style={{ color: props.getColor(props.ethStats.quotes.USD.percent_change_24h), ...styles.tableBodyText}}>{props.ethStats.quotes.USD.percent_change_24h}%</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 0, borderRightWidth: 1 }} >
                    <Text style={{ color: props.getColor(props.ethStats.quotes.USD.percent_change_7d), ...styles.tableBodyText}}>{props.ethStats.quotes.USD.percent_change_7d}%</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 0, borderRightWidth: 1 }} >
                    <Text style={{ color: props.getColor(props.ethStats.quotes.USD.percent_change_30d), ...styles.tableBodyText}} >{props.ethStats.quotes.USD.percent_change_30d}%</Text>
                </View>
                <View style={{ flex: 1, alignSelf: 'stretch', borderColor: "grey", borderBottomWidth: 2, borderLeftWidth: 1, borderTopWidth: 0, borderRightWidth: 2, borderBottomRightRadius: 15 }} >
                    <Text style={{ color: props.getColor(props.ethStats.quotes.USD.percent_change_1y), ...styles.tableBodyText}} >{(props.ethStats.quotes.USD.percent_change_1y).toFixed(0)}%</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    tableHeadText: {
        fontWeight: "800",
        color: "white",
        textAlign: "center",
        fontSize: 20,
        marginBottom: "4%"
    },
    tableBodyText: {
        fontWeight: "800",
        textAlign: "center",
        fontSize: 15,
        padding: "8%"
    }
});

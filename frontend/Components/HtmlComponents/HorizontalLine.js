import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, ScrollView, TouchableOpacity, Dimensions } from 'react-native';


export default function HorizontalLine(props) {
    return (
        <View
        style={{
            borderBottomColor: props.color,
            borderBottomWidth: props.width,
            marginBottom: props.marginBottom,
            marginTop: props.marginTop,
        }}
        />
    );
}

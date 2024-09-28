import React from 'react';
import { View, TextInput } from 'react-native';
{/*maxLength={250}*/}

export default function TextArea(props) {
    return (
        <TextInput
            {...props}
            editable
        />
    );
}
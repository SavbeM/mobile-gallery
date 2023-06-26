import {StyleSheet, Text, View} from "react-native";
import {ImagesList} from "./ImageList";
import React from "react";

export const HomeScreen = () => (
    <View style={styles.container}>
        <ImagesList/>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1, alignItems: 'center',
        justifyContent: 'center'
    }
})

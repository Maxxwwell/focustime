import React from "react";
import { StyleSheet, View } from "react-native";
import { TimeButton } from "../../components/TimeButton";


export const Timing = ({onChangeTime}) => {
    return (
        <>
        <View style={styles.timingButton}>
            <TimeButton 
            title="10"
            onPress= {()=> onChangeTime(10)}
            />
        </View>

        <View style={styles.timingButton}>
            <TimeButton 
            title="15"
            onPress= {()=> onChangeTime(15)}
            />
        </View>

        <View style={styles.timingButton}>
            <TimeButton 
            title="20"
            onPress= {()=> onChangeTime(20)}
            />
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    timingButton: {
        flex: 1,
        alignItems: 'center',

    }
})
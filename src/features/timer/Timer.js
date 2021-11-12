import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { colors } from "../../utils/colors";
import { Countdown } from "../../components/Countdown";
import { spacing } from "../../utils/sizes";
import { ProgressBar } from "react-native-paper";
import { RoundButton, StartButton } from "../../components/RoundButton";

export const Timer = ({ focusSubject }) => {

    const startTimer = () => {
        console.log('Timer started');
        setIsStarted(true);
    };
    const timerStopped = () => {
        console.log('Timer stoped');
        setIsStarted(false);
    };
    const onProgress =(progress) => {
        setProgress(progress);
    }

    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);


    return (
        <View style={styles.container}>

            <View style={styles.countdown}>

                <Countdown isPaused={!isStarted} onProgress={onProgress} />
            </View>
            <View style={{ paddingTop: spacing.xxl }}>

                <Text style={styles.title}>Focusing on: </Text>
                <Text style={styles.task}>{focusSubject} </Text>
            </View>
            <View style={{padding: spacing.small}}>
                <ProgressBar 
                progress={progress}
                color='#5E84E2'
                style={{height: 8}}
                />
            </View>
            <View style ={styles.buttonWrapper}>
                {isStarted ? (<RoundButton title='pause' onPress={timerStopped} />)
                    :
                    (<RoundButton title='start' onPress={startTimer} />)
                }
            </View>



        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        color: colors.white,
        textAlign: 'center',
    },
    task: {
        color: colors.white,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    countdown: {
        flex: 0.4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonWrapper: {
        flex: 0.3,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },



})
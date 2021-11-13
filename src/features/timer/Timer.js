import React, { useState } from "react";
import { View, StyleSheet, Text, Vibration, Platform } from "react-native";
import { colors } from "../../utils/colors";
import { Countdown } from "../../components/Countdown";
import { spacing } from "../../utils/sizes";
import { ProgressBar } from "react-native-paper";
import { Timing } from "./Timing";
import { RoundButton, StartButton } from "../../components/RoundButton";
import { useKeepAwake } from "expo-keep-awake";


export const Timer = ({ focusSubject, onTimerEnd }) => {

    useKeepAwake();
    const DEFAULT_TIME = 0.1;

    const startTimer = () => {
        console.log('Timer started');
        setIsStarted(true);
    };
    const timerStopped = () => {
        console.log('Timer stoped');
        setIsStarted(false);
    };
    const onProgress = (progress) => {
        setProgress(progress);
    }
    const changeTime = (min) => {
        setMinutes(min);
        console.log(min)
        setProgress(1);
        setIsStarted(false);
    }

    const vibrate = () => {
        if (Platform.OS === 'ios') {
            const interval = setInterval(() => Vibration.vibrate(), 1000);
            setTimeout(() => clearInterval(interval), 10000)
        } else {
            Vibration.vibrate(10000)
            //vibrate for 10s
        }
    }

    const onEnd = () => {
        vibrate();
        setMinutes(DEFAULT_TIME);
        setProgress(1);
        setIsStarted(false);
        onTimerEnd();
    }



    const [minutes, setMinutes] = useState(DEFAULT_TIME);
    const [isStarted, setIsStarted] = useState(false);
    const [progress, setProgress] = useState(1);


    return (
        <View style={styles.container}>

            <View style={styles.countdown}>

                <Countdown minutes={minutes}
                    isPaused={!isStarted}
                    onProgress={onProgress}
                    onEnd={onEnd}
                />
            </View>
            <View style={{ paddingTop: spacing.xxl }}>

                <Text style={styles.title}>Focusing on: </Text>
                <Text style={styles.task}>{focusSubject} </Text>
            </View>
            <View style={{ padding: spacing.small }}>
                <ProgressBar
                    progress={progress}
                    color='#5E84E2'
                    style={{ height: 8 }}
                />
            </View>
            <View style={styles.buttonWrapper}>
                <Timing onChangeTime={changeTime} />
            </View>

            <View style={styles.buttonWrapper}>
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
        flexDirection: 'row',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },



})
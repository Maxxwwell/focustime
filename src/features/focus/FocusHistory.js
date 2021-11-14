import React from "react";
import { View, StyleSheet, FlatList, Text, SafeAreaView } from "react-native";
import { fontSizes, spacing } from "../../utils/sizes";
import { RoundButton } from "../../components/RoundButton";
import { colors } from "../../utils/colors";

export const FocusHistory = ({ focusHistory, onClear }) => {

    const HistoryItem = ({ item, index }) => {
        return (
            <Text style={styles.historyItem(item.status)}>
                {item.subject}
            </Text>
        )
    }

    const clearHistory = () => {
        onClear();
    }

    return (
        <>
            <SafeAreaView style={{ flex: 0.5, alignItems: 'center' }}>
                {!!focusHistory.length && (
                    <>
                        <Text style={styles.title}>
                            Things we've focused on
                        </Text>
                        <FlatList style={{ flex: 1 }}
                            contentContainerStyle={{ flex: 1, alignItems: 'center' }}
                            data={focusHistory}
                            renderItem={HistoryItem}
                        />
                        <View style={styles.clearContainer} >
                            <RoundButton title="Clear" onPress={() => onClear()} />
                        </View>
                    </>
                )}
            </SafeAreaView>

        </>
    );
};

const styles = StyleSheet.create({
    historyItem: (status) => ({
        color: status == 1 ? 'green' : 'red',
        fontSize: fontSizes.medium

    }),

    title: {
        color: colors.white,
        fontSize: fontSizes.large,
    },
    clearContainer: {
        alignItems: 'center',
        padding: spacing.medium,
    }
})
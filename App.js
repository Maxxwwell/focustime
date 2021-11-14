import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, AsyncStorage } from 'react-native';
import { Focus } from './src/features/focus/Focus'
import { FocusHistory } from './src/features/focus/FocusHistory'
import { colors } from './src/utils/colors';
import { Timer } from './src/features/timer/Timer';
import { spacing } from './src/utils/sizes';

const STATUSES = {
  COMPLETE: 1,
  CANCELED: 0,
}

export default function App() {
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusHistory, setFocusHistory] = useState([]);

  const addFocusHistorySubjectWithState = (subject, status) => {
    setFocusHistory([...focusHistory, { subject, status }]);
  };

  const onClear = () => {
    setFocusHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem("focusHistory", JSON.stringify(focusHistory));
    } catch (error) {
      console.log(error)
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem("focusHistory");

      if (history && JSON.parse(history).length) {
        setFocusHistory(JSON.parse(history));
      }
    } catch (error) {
      console.log(error)
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, [])

  useEffect(() => {
    saveFocusHistory();
  }, [focusHistory])


  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.COMPLETE);
            setFocusSubject(null);
          }}

          clearSubject={() => {
            addFocusHistorySubjectWithState(focusSubject, STATUSES.CANCELED);
            setFocusSubject(null)
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory
            focusHistory={focusHistory}
            onClear={onClear}
          />
        </>
      )}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? spacing.large : spacing.small,
    backgroundColor: colors.darkBlue,

  },
});

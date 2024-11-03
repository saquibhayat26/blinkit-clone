/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  useColorScheme,
  View,
  Text,
  StyleSheet,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <View style={styles.container}>
          <Text style={styles.quicksandRegular}>
            This text uses a quick sand font
          </Text>
          <Text style={styles.quicksandLight}>
            This text uses a quick sand light font
          </Text>
          <Text style={styles.ralewayThin}>
            This text uses a thin italic raleway font
          </Text>
          <Text style={styles.ralewayItalic}>
            This text uses a thin italic raleway font
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'lavender',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  quicksandLight: {
    fontFamily: 'Okra-Bold',
    fontSize: 20,
  },
  quicksandRegular: {
    fontFamily: 'Okra-ExtraBold',
    fontSize: 20,
  },
  ralewayItalic: {
    fontFamily: 'Okra-Medium',
    fontSize: 20,
  },
  ralewayThin: {
    fontFamily: 'Okra-MediumLight',
    fontSize: 20,
  },
});

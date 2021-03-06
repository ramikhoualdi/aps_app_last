/* eslint-disable prettier/prettier */
import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import IconIonicons from 'react-native-vector-icons/Ionicons';
import TouchID from 'react-native-touch-id';

const COLORS = {
  primary: '#68707f',
};
const optionalConfigObject = {
  title: 'Authentication Required', // Android
  imageColor: '#e00606', // Android
  imageErrorColor: '#ff0000', // Android
  sensorDescription: 'Touch sensor', // Android
  sensorErrorDescription: 'Failed', // Android
  cancelText: 'Cancel', // Android
  fallbackLabel: 'Show Passcode', // iOS (if empty, then label is hidden)
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // iOS - allows the device to fall back to using the passcode, if faceid/touch is not available. this does not mean that if touchid/faceid fails the first few times it will revert to passcode, rather that if the former are not enrolled, then it will use the passcode.
};
const optionalConfigObject1 = {
  unifiedErrors: false, // use unified error messages (default false)
  passcodeFallback: false, // if true is passed, itwill allow isSupported to return an error if the device is not enrolled in touch id/face id etc. Otherwise, it will just tell you what method is supported, even if the user is not enrolled.  (default false)
};

const TouchIDAuth = ({navigation}) => {
  const handleTouchID = () => {
    console.log('IN Touch ID ');

    TouchID.isSupported()
      .then(() => {
        console.log('Supported');
      })
      .catch(() => {
        navigation.navigate('Identification');
      });

    TouchID.authenticate(
      'to demo this react-native component',
      optionalConfigObject,
    )
      .then(success => {
        console.log(success);
        navigation.navigate('TouchIDSuccess');
      })
      .catch(error => {
        console.log({error});
      });

    // TouchID.isSupported()
    // .then(biometryType => {
    //   // Success code
    //   if (biometryType === 'FaceID') {
    //     console.log('FaceID is supported.');
    //   } else {
    //     console.log('TouchID is supported.');
    //     TouchID.authenticate("Authenticate", optionalConfigObject)
    //       .then(success => {
    //         Alert.alert('Authenticated Successfully');
    //       })
    //       .catch(error => {
    //         Alert.alert('Authentication Failed', error.toString());
    //       });
    //   }
    // })
    // .catch(error => {
    //   // Failure code
    //   console.log(error);
    // });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Touch ID</Text>
        </View>
        <View style={styles.VerifyContent}>
          <View style={styles.borderTouch}>
            <IconIonicons
              style={styles.iconVerify}
              name="finger-print"
              fontSize={50}
              color={COLORS.primary}
            />
          </View>
          <Text style={styles.title1}>Touch ID</Text>
          <Text style={styles.title2}>
            Allow premission to{'\n'}authenticate your account{'\n'}with Touch
            ID.
          </Text>
        </View>
        <View style={styles.content}>
          <TouchableOpacity style={styles.button1} onPress={handleTouchID}>
            <Text style={styles.signup}>Continue Touch ID</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TouchIDAuth;

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.primary,
    paddingVertical: 5,
  },
  headerTitle: {
    textAlign: 'center',
    fontSize: 16,
    paddingVertical: 10,
  },
  content: {
    padding: 20,
  },
  borderTouch: {
    borderColor: COLORS.primary,
    borderWidth: 0.5,
    borderRadius: 80,
    width: 150,
    height: 150,
    display: 'flex',
  },
  iconVerify: {
    textAlign: 'center',
    fontSize: 100,
    paddingVertical: 20,
  },
  VerifyContent: {
    paddingHorizontal: 20,
    paddingTop: 120,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title1: {
    textAlign: 'center',
    fontSize: 26,
    fontWeight: 'bold',
    color: COLORS.primary,
    paddingVertical: 20,
  },
  title2: {
    textAlign: 'center',
    fontSize: 22,
    color: COLORS.primary,
    paddingBottom: 50,
  },
  signup: {
    backgroundColor: COLORS.primary,
    color: 'white',
    fontSize: 18,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 4,
    marginHorizontal: 0,
    marginVertical: 10,
    fontWeight: '600',
  },
});

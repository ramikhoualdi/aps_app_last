/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import store from './redux/createStore';
import {
  Home,
  Login,
  Registration,
  VerifyAccount,
  MobileVerified,
  TouchIDAuth,
  FaceIDAuth,
  TouchIDSuccess,
  FaceIDSuccess,
  Identification,
  CreditFrontPhoto,
  CreditBackPhoto,
  DriverFrontPhoto,
  DriverBackPhoto,
  InsuranceFrontPhoto,
  InsuranceBackPhoto,
  ForgetPassword,
  CreditIdentification,
  DriverIdentification,
  InsuranceIdentification,
} from './screens';
import auth from '@react-native-firebase/auth';

const Stack = createStackNavigator();

const App = () => {

  // useEffect(() => {
  //   if(auth().currentUser){
  //     console.log('User Changed !!')
  //   }
  // }, [auth().currentUser])

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          initialeRouteName="Home"
          screenOptions={{
            headerShown: false,
          }}
          >
            {
              !user
              ?
              <>
                <Stack.Screen name="Home" component={Home} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Registration" component={Registration} />
                {/* OTP */}
                <Stack.Screen name="VerifyAccount" component={VerifyAccount} />
                <Stack.Screen name="MobileVerified" component={MobileVerified} />
                {/* Forget Password */}
                <Stack.Screen name="ForgetPassword" component={ForgetPassword} />
                {/* <Stack.Screen name="TouchIDAuth" component={TouchIDAuth} />
                <Stack.Screen name="FaceIDAuth" component={FaceIDAuth} />
                <Stack.Screen name="TouchIDSuccess" component={TouchIDSuccess} />
                <Stack.Screen name="FaceIDSuccess" component={FaceIDSuccess} /> */}
              </>
              :
              <>
                {/* Touch & Face ID */}
                <Stack.Screen name="TouchIDAuth" component={TouchIDAuth} />
                <Stack.Screen name="FaceIDAuth" component={FaceIDAuth} />
                <Stack.Screen name="TouchIDSuccess" component={TouchIDSuccess} />
                <Stack.Screen name="FaceIDSuccess" component={FaceIDSuccess} />
                {/* Touch & Face ID */}
                <Stack.Screen name="Identification" component={Identification} />
                {/* Credit */}
                <Stack.Screen name="CreditFrontPhoto" component={CreditFrontPhoto} />
                <Stack.Screen name="CreditBackPhoto" component={CreditBackPhoto} />
                {/* Driver */}
                <Stack.Screen name="DriverFrontPhoto" component={DriverFrontPhoto} />
                <Stack.Screen name="DriverBackPhoto" component={DriverBackPhoto} />
                {/* Insurance */}
                <Stack.Screen name="InsuranceFrontPhoto" component={InsuranceFrontPhoto} />
                <Stack.Screen name="InsuranceBackPhoto" component={InsuranceBackPhoto} />
                {/* Identifications */}
                <Stack.Screen name="CreditIdentification" component={CreditIdentification} />
                <Stack.Screen name="DriverIdentification" component={DriverIdentification} />
                <Stack.Screen name="InsuranceIdentification" component={InsuranceIdentification} />
              </>
            }
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;

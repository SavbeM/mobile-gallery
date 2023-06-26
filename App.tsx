/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {fetchDataThunk} from "./store/imagesReducer";
import {AppDispatch, RootStackParamList} from "./types";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {FullScreenImage} from "./components/FullScreenImage";
import {HomeScreen} from "./components/HomeScreen";


const Stack = createNativeStackNavigator<RootStackParamList>();

const App: React.FC = () => {

    const dispatch: AppDispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchDataThunk())
    }, [dispatch]);


    return (
             <NavigationContainer>
                <Stack.Navigator initialRouteName="Home" >
                    <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Your Gallery'}} />
                    <Stack.Screen name="FullScreenImage" component={FullScreenImage} options={{headerShown: false}}/>
                </Stack.Navigator>
            </NavigationContainer>
    );
}

export default App

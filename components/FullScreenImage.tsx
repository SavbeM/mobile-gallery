import React, {FC, useLayoutEffect, useState} from 'react';
import {
    StyleSheet,
    Text,
    ImageBackground,
    TouchableOpacity,
    ActivityIndicator,
    Animated,
    Dimensions, ScaledSize,
} from 'react-native';
import {useRoute, RouteProp} from '@react-navigation/native';
import {RootStackParamList} from "../types";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import Value = Animated.Value;




const screenDimensions = Dimensions.get('window');

export const FullScreenImage: FC = () => {

    const route = useRoute<RouteProp<RootStackParamList, 'FullScreenImage'>>();
    const image = useSelector((state: RootState) => state.images.images.find(image => image.id === route.params.id));
    const [showInfo, setShowInfo] = useState(true);
    const [infoPosition] = useState<Value>(new Animated.Value(1));
    const [imageWidth, setImageWidth] = useState<number>(screenDimensions.width);
    const [imageHeight, setImageHeight] = useState<number>(screenDimensions.height);




    const handlePress = () => {
        Animated.timing(infoPosition, {
            toValue: showInfo ? 0 : 1,
            duration: 300,
            useNativeDriver: true
        }).start();
        setShowInfo(!showInfo);
    };


    useLayoutEffect(() => {
        const onChange = ({ window }: { window: ScaledSize }) => {
            setImageWidth(window.width)
            setImageHeight(window.height)
        };
        Dimensions.addEventListener("change", onChange);

    }, []);

    return image ? (

        <TouchableOpacity style={{flex: 1}} activeOpacity={1} onPress={handlePress}>
            <ImageBackground
                style={{  height: imageHeight, width: imageWidth}}
                resizeMode="contain"
                source={route.params}
            />
            <Animated.View style={[style.infoContainer, {transform: [{translateY: infoPosition.interpolate({inputRange: [0, 1], outputRange: [0, 1000]})}]}]}>
                <Text style={style.author}>{image.user.name}</Text>
                <Text style={style.description}>{image.description}</Text>
                <Text style={style.views}>{`${image.likes} ${image.likes !== 1 ? "likes" : "like"}`}</Text>
            </Animated.View>
        </TouchableOpacity>
    ) : (
        <ActivityIndicator/>
    )
};

    const style = StyleSheet.create({
        infoContainer: {
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            padding: 16
        },
        author: {
            color: '#fff',
            fontSize: 18,
            marginBottom: 8,
            fontWeight: 'bold'
        },
        title: {
            color: '#fff',
            fontSize: 16,
            marginBottom: 8
        },
        description: {
            color: '#fff',
            fontSize: 14,
            marginBottom: 8
        },
        views: {
            color: '#fff',
            fontSize: 14
        }
    });

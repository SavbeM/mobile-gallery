import React, {FC, useState} from 'react';
import {StyleSheet, Image, Text, View, FlatList, ActivityIndicator, TouchableOpacity, Button} from 'react-native';
import {ImageItemI} from "../types";
import {useSelector} from "react-redux";
import {RootState} from "../store/store";
import {ParamListBase, useNavigation} from "@react-navigation/native";
import {NativeStackNavigationProp} from "@react-navigation/native-stack";


export const ImagesList: FC = () => {

    const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>()
    const [showMore, setShowMore] = useState<boolean>(false)
    const images = useSelector((state: RootState) => state.images.images)


    const RenderImage: React.FC<{ item: ImageItemI }> = ({item}) => {

        const descriptionText = item.description ? (showMore ? item.description : `${item.description.substring(0, 50)}...`) : null;
        const onPressExpand = () => {
            setShowMore(prev => !prev)
        }

        return (
            <View style={styles.imageCard}>
                <TouchableOpacity
                    onPress={() => navigation.navigate("FullScreenImage", {uri: item?.urls?.full, id: item?.id})

                    }>
                    <Image style={styles?.image || "url kakoito"} source={{uri: item.urls.small_s3}}/>
                </TouchableOpacity>
                <Text
                    style={styles.author || "https://user-images.githubusercontent.com/47315479/81145216-7fbd8700-8f7e-11ea-9d49-bd5fb4a888f1.png"}>{item.user.username || "Name"}</Text>
                <Text style={styles.description}>
                    {descriptionText && (
                        <>
                            <Text style={styles.description}>{descriptionText || "No Description"}</Text>
                            <TouchableOpacity onPress={onPressExpand}>
                                <Text style={styles.moreButton}>
                                    {showMore ? 'Hide' : 'Show'}
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                </Text>
            </View>
        )
    };

    return images.length > 0 ?
        <FlatList
            data={images}
            renderItem={RenderImage}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.container}
        />
        :
        <ActivityIndicator/>

};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 16,
        paddingHorizontal: 8,
    },
    imageCard: {
        flex: 1,
        width: 350,
        backgroundColor: '#fff',
        borderRadius: 8,
        marginBottom: 16,
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
        marginHorizontal: 8,
    },
    image: {
        width: '100%',
        height: 200,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    author: {
        padding: 12,
        fontWeight: 'bold',
        fontSize: 16,
        color: '#333',
    },
    description: {
        padding: 12,
        fontSize: 14,
        color: '#666',
        flexDirection: 'row',
    },
    moreButton: {
        color: 'grey',
        fontWeight: 'bold',
        height: 20,
        paddingLeft: 4,
        alignSelf: 'flex-end',
    }
});



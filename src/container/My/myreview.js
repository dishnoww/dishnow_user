import React, { useEffect, useState,memo } from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import {NavSwitchHead} from '../../component/common'

import * as API from '../../utill/API';
import * as Utill from '../../utill';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Dialog from "react-native-dialog";
import Toast from 'react-native-simple-toast';

export default Review = ({navigation}) =>{

    const _showReview = async() =>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reviewMe(token);
        setData(res);
        console.log(res);
    }

    useEffect(()=>{
        _showReview();
    },[])

    const [ data, setData ] = useState([]);
    const [ visible, setVisible ] = useState(false);
    const [ imageList, setImageList ] = useState([]);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ deleteReviewId, setDeleteReviewId] = useState();

    const _deleteReview = async (reviewId)=>{
        const token = await API.getLocal(API.LOCALKEY_TOKEN);
        const res = await API.reviewDelete(token,{reviewId : reviewId});
        setData(data.filter(info=>info.reviewId !== reviewId));
        console.log(res);
        Toast.show('삭제되었습니다.');
    }

    const _renderItem = ({item}) => {
        let imageUrl = JSON.stringify(item.image);
        imageUrl = ((imageUrl.substring(4,imageUrl.length-4)).split(','));
        const ImageWidth = imageUrl[0].length !==4? Utill.screen.Screen.customWidth(330) : 0;
        const ImageHeigt = imageUrl[0].length !==4? Utill.screen.Screen.customWidth(182) : 0;
        
        if(item.rating!==null){
        return (
            <View style = {styles.container}>
                <Text style={styles.name}>{item.name}</Text>
                <View style={styles.informationContainer}>
                    <Text>{item.rating}</Text>
                    <Text style={styles.date}>{item.createdAt}</Text>
                </View>
                <Image onLoad = {setIsLoaded(false)} style = {{width : ImageWidth, height :ImageHeigt}}source = {{uri : imageUrl[0]}}></Image>
                <View style={styles.contentContainer}>
                    <Text style={styles.contentText}>{item.content}</Text>
                </View>
                <View style={styles.button}>
                    <TouchableOpacity
                        onPressIn = {()=>{navigation.navigate('ReviewWrite',{
                            storeName : item.name,
                            reviewId : item.reviewId,
                            isUpdate : true,
                        }),alert('asd')}}
                        >
                        <Text style={styles.buttonText}>수정</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                     onPressIn ={()=>{setVisible(true);setDeleteReviewId(item.reviewId)}}
                     style={{marginLeft: Utill.screen.Screen.customWidth(21)}}>
                        <Text style={styles.buttonText}>삭제</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.answerContainer}>
                    {item.answer!==null ? ( <View style={styles.answerContent}>
                        <View style={styles.ownerContent}>
                        <Text style={styles.ownerText}>사장님</Text>
                        <Text style={styles.ownerDate}>그제</Text>
                        </View>
                        <Text style={styles.answerText}>{item.answer}</Text>
                    </View>) : null}
                </View>
            </View>
        )};
    }

    return(
        <View style ={
        {
            flex : 1,
            alignItems : 'center',
            justifyContent : 'center',
        }
        
        }>
        <NavSwitchHead navigation={navigation} navtitle = {'TabMy'} title={`나의 리뷰`}/>
          <FlatList
            data = {data}
            renderItem = {_renderItem}
          />
           <Dialog.Container visible = {visible}>
                <Dialog.Description>리뷰를 삭제하시겠습니까?</Dialog.Description>
                <Dialog.Title>리뷰 삭제</Dialog.Title>
                <Dialog.Button label="취소" onPress = {()=>setVisible(false)} />
                <Dialog.Button label="삭제"
                    onPress = {()=>{setVisible(false);_deleteReview(deleteReviewId)}}/>
                </Dialog.Container>
        </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
        justifyContent:'center',
    },
    name: {
        fontSize: 16,
        marginTop: Utill.screen.Screen.customHeight(20),
        marginBottom: Utill.screen.Screen.customHeight(11)
    },
    informationContainer:{
        flexDirection: 'row'
    },
    date: {
        fontSize: 12,
        color: '#555555',
        marginLeft: 5,
        marginBottom: Utill.screen.Screen.customHeight(13)
    },
    contentContainer: {
        marginTop: Utill.screen.Screen.customHeight(14),
        width: Utill.screen.Screen.customWidth(330)
    },
    contentText: {
        fontSize: 14
    },
    button: {
        flexDirection: 'row',
        marginTop: Utill.screen.Screen.customHeight(15),
        marginBottom: Utill.screen.Screen.customHeight(18)
    },
    buttonText: {
        color: '#733FFF',
        fontSize: 14
    },
    answerContainer: {
        width: Utill.screen.Screen.customWidth(330),
        backgroundColor: '#EEEEEE',
        borderRadius: 10
    },
    answerContent: {
        marginLeft: Utill.screen.Screen.customWidth(15),
        marginTop: Utill.screen.Screen.customHeight(16),
        width: Utill.screen.Screen.customWidth(300),
        marginBottom: Utill.screen.Screen.customHeight(16)
    },
    ownerContent: {
        flexDirection:'row',
        marginBottom: Utill.screen.Screen.customHeight(12),
        alignItems: "flex-end"
    },
    ownerText :{
        fontSize: 12,
        fontWeight: "bold"
    },
    ownerDate: {
        fontSize: 10,
        marginLeft: Utill.screen.Screen.customWidth(7),
        color: "#555555"
    },
    answerText :{
        fontSize: 12
    }
})
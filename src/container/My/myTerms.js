import {NavHead} from '../../component/common';
import React from 'react';
import {View,StyleSheet,Text,TouchableOpacity} from 'react-native';
import * as Utill from '../../utill'
export default myTerms = ({navigation}) => {
    return (
    <View style = {styles.container}>
        <NavHead navigation={navigation} title={`이용약관`}/>
        <View style = {{marginRight : 15,marginLeft : 15}}>
            <TouchableOpacity 
                style = {{height : 51,justifyContent : 'center',}}
                onPress = {()=>navigation.push('webView',{
                    source : {uri : 'http://dishnow.kr/terms/1.html'}
                })}    
            >
                <Text style = {styles.txt}> 서비스 이용약관 </Text>
            </TouchableOpacity>

            <View style = {styles.line}/>

            <TouchableOpacity 
                style = {{height : 51,justifyContent : 'center',}}
                onPress = {()=>navigation.push('webView',{
                    source : {uri : 'http://dishnow.kr/terms/2.html'}
                })}  
            >
                <Text style = {styles.txt}> 개인 정보 취급 방침  </Text>
            </TouchableOpacity>

            <View style = {styles.line}/>

            <TouchableOpacity style = {{height : 51,justifyContent : 'center',}}
                onPress = {()=>navigation.push('webView',{
                    source : {uri : 'http://dishnow.kr/terms/3.html'}
                })}  
            >
                <Text style = {styles.txt}> 위치기반 서비스 이용약관 </Text>
            </TouchableOpacity>

            <View style = {styles.line}/>
            
            <TouchableOpacity style = {{height : 51,justifyContent : 'center',}}
                onPress = {()=>navigation.push('webView',{
                    source : {uri : 'http://dishnow.kr/terms/4.html'}
                })}  
            >
                <Text style = {styles.txt}> 마케팅 수신 동의 </Text>
            </TouchableOpacity>
        </View>
    </View>
    )
}

const styles = StyleSheet.create({
    container : {
        flex : 1,
    },
    line : {
        borderBottomWidth: 1,
        borderBottomColor:Utill.color.border,
    },
    txt : {
        justifyContent : 'center',
        // marginTop : 17.5,
        // marginBottom : 17.5,
        fontSize : 16,
        fontFamily : 'NanumSquareOTF'
    },
})
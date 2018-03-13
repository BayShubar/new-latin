import React from 'react'
import { View, StyleSheet, Text, ScrollView, Linking, AsyncStorage } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { TEXT_COLOR,
         DEVICE_WIDTH,
         MAIN_COLOR, 
         DEVICE_HEIGHT } from '../../constants'


class StartPage extends React.Component{
    constructor( props ){
        super(props)
        this.state = { 
                        opacity: 0.3,
                        score: 0 
                    }
        this._onScroll = this._onScroll.bind(this);
    }

    componentDidMount(){
        this._getScore(this.props.data.storageKey);
    }
    
    _onScroll(event){
        let value = Math.round(event.nativeEvent.contentOffset.y/7)+30;
        this.setState({ opacity: value/100} );
    }
    render(){

        let btnOutput = (this.props.data.ready)?
        (
            <Button
            title = {'Ойнау'}
            color = {'white'}
            buttonStyle = { styles.btnStart }
            backgroundColor = {MAIN_COLOR}
            borderRadius = {10}
            fontSize = {18}
            onPress = {()=>{ this.props.onRequestToStart() }}/>
        ):(
            <Button
            title = {'Өңделу үстінді ( 05.02.2018 )'}
            color = {'white'}
            buttonStyle = { styles.btnStart }
            backgroundColor = { '#E57979' }
            borderRadius = {10}
            fontSize = {18}
            onPress = {()=>{ Linking.openURL('https://play.google.com/store/apps/details?id=com.yerkebulanduisebay.newqazaqlatin') }}/>
        )

        return(
            <View style = {[styles.holder, { backgroundColor: 'rgba(0,0,0,'+this.state.opacity+')', }]}>
                <ScrollView  style = {styles.scrollholder}
                onScroll = {this._onScroll}>
                    <View style = {styles.headerHolder}>
                        <Icon
                        name = {'arrow-back'}
                        color = {TEXT_COLOR}
                        size = {22}
                        underlayColor = {'rgba(0,0,0,0)'}
                        containerStyle = { {backgroundColor: 'rgba(0,0,0,0)', padding: 20} }
                        onPress = { ()=>{ this.props.onRequestToClose() } }/>
                    </View>
                    <View style = {styles.titleHolder}>
                        <Icon
                        name = {this.props.data.iconName}
                        color = {'white'}
                        raised
                        containerStyle = {{backgroundColor: this.props.data.color}}
                        size = {65}/>
                        <Text style = {styles.titleText}>{ this.props.data.name }</Text>
                        <Text style = {styles.descrText}>{ this.props.data.longRule }</Text>
                    </View>
                    <View style = {styles.scoreHolder}>
                        <Text style = {styles.scoreText}>{ this.state.score }</Text>
                        <Text style = {styles.scoreHelperText}>ЕҢ ЖОҒАРҒЫ ҰПАЙ</Text>
                    </View>


                    <View style = {styles.benefitHolder}>
                        <Text style = {styles.benefitTitle}>АРТЫҚШЫЛЫҚТАРЫ:</Text>
                        <View style = {styles.benefitItemsHolder}>
                            <Icon
                            name = {'library-books'}
                            color = {TEXT_COLOR}
                            size = {60}/>
                            <View style = {styles.benefitTextHolder}>
                                <Text style = {styles.benefitText}> {this.props.data.description1} </Text>
                            </View>
                        </View>
                        <View style = {styles.benefitItemsHolder}>
                            <Icon
                            name = {'subtitles'}
                            color = {TEXT_COLOR}
                            size = {60}/>
                            <View style = {styles.benefitTextHolder}>
                                <Text style = {styles.benefitText}> {this.props.data.description2} </Text>
                            </View>
                        </View>

                    </View>
                <View  style = {{ height: 100, }}/>
                </ScrollView>
                <View style = {styles.startHolder}>

                { btnOutput }

                </View> 
            </View>
        )
    }

//===========================================ASYNCSTORAGE=================================
    _getScore = async (gameName) =>{
        try{
            AsyncStorage.getItem(gameName).then((value)=>{
                if( value !== null ){
                    this.setState({ score: value });
                }else{
                    console.log('#SP getLocalStorage empty')
                    this._setScore(gameName, "0");
                    this._getScore(gameName);
                }
            });

        }
        catch(error){
            console.log('#SP get LocalStorage Error', error)
        }
    }

    _setScore = async (gameName, value) =>{
        try{
            await AsyncStorage.setItem(gameName, value)
        }
        catch(error){
            console.log('#SP set LocalStorage Error', error)
        }
    }
}

//=====================================================END=========================

export default StartPage;

const styles = StyleSheet.create({
    holder: {
        flex: 1,
    },
    scrollholder:{
        padding: 10,
    },
    headerHolder:{
        marginBottom: 40,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        paddingTop: 20,
    },
    titleHolder:{
        alignItems:'center',
        justifyContent: 'center',
    },
    scoreHolder:{
        alignItems:'center',
        justifyContent: 'center',
        margin: 15,
        marginTop: 70,
        borderColor: TEXT_COLOR,
        borderBottomWidth: 1,
        borderTopWidth: 1,
        padding: 30,
    },
    benefitHolder:{
        padding: 20
    },
    titleText:{
        color: 'white',
        fontSize: 45,
        marginTop: 10,
        
    },
    descrText:{
        color: TEXT_COLOR,
        fontSize: 18,
        textAlign: 'center',
        margin: 10,
        marginBottom: 0,
    },
    scoreText:{
        color: 'white',
        fontSize: 35,
    },
    scoreHelperText:{
        color: TEXT_COLOR,
        fontSize: 16,
    },
    benefitTitle:{
        color: TEXT_COLOR,
        fontSize: 15,
        marginBottom: 5,
        marginTop: 15,
    },
    benefitItemsHolder:{
        flexDirection: 'row',
        padding: 5,
        marginTop: 40,
        marginTop: 20,
    },
    benefitText:{
        color: 'white',
        fontSize: 16,
    },
    benefitTextHolder:{
      marginRight: 10,
      marginLeft: 10,
      width: DEVICE_WIDTH*0.6,
    },
    startHolder:{
        position: 'absolute', 
        alignItems:'center',
        justifyContent: 'center',
        top: DEVICE_HEIGHT * 0.86,
        width: DEVICE_WIDTH,
    },
    btnStart:{
        width: DEVICE_WIDTH*0.9,
    }
})
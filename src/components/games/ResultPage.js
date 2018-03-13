import React from 'react'
import { View, StyleSheet, Text, TouchableOpacity, AsyncStorage } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import { TEXT_COLOR, DEVICE_WIDTH, MAIN_COLOR, DEVICE_HEIGHT } from '../../constants'

class ResultPage extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
                     scoreIncrement: 0,
                     bestScore: 0,
                     isNewBest: false,
                    }
    }

    _setScoreToSave(){
        this._getScore(this.props.data.storageKey);
    }

    componentDidMount(){

        let score = this.props.result.score
        let greaterThan = false;
        if(score>25)  greaterThan = true;
        this.Timer = setInterval(
            ()=>{
                if(this.state.scoreIncrement >= score){
                    this.setState({scoreIncrement: score})
                    this._setScoreToSave();
                    clearInterval(this.Timer)
                }
                if(greaterThan){
                    this.setState({scoreIncrement: (score - 20) })
                    greaterThan = false;
                }
                this.setState({scoreIncrement: (this.state.scoreIncrement + 1) })
            },5)
    }
    componentWillUnmount(){
        clearInterval(this.Timer)
    }
    render(){
        let toMotivate = "ЖАРАЙСЫҢ, АЛАЙДА ҮЙРЕНЕРІҢ ӘЛІ КӨП";
        if(this.state.isNewBest) toMotivate = "ЖАҢА РЕКОРД ДОСТЫМ!!!!";

        return(
            <View style = {styles.holder}>
                <View style = {styles.resultHolder}>
                    <Icon
                    name = {this.props.data.iconName}
                    color = {'white'}
                    raised
                    containerStyle = {{backgroundColor: this.props.data.color}}
                    size = {80}/>

                    <Text style = {[styles.resultText, {color: this.props.data.color}]}>{ this.state.scoreIncrement }</Text>
                    <Text style = {styles.motivationText}>{ toMotivate }</Text>
                </View>
                <View style = {styles.errorHolder}>
                <Text style = {styles.incorrect}> {this.props.result.error} </Text>
                    <View style = {styles.ansHolder}>
                        <Text style = {styles.ansText}> {this.props.result.task} </Text>
                        <Icon
                        name = {'arrow-forward'}
                        color = {TEXT_COLOR}
                        size = {16}/>
                        <Text style = {styles.ansText}> {this.props.result.ans} </Text>
                    </View>
                    <TouchableOpacity 
                    style = {styles.continueHolder}
                    onPress = {()=>{ this.props.onRequestToContitnue() }}>
                        <Text style = {styles.continueText}> ЖАЛҒАСТЫРУ </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

//===========================================ASYNCSTORAGE=================================
    _getScore = async (gameName) =>{
        try{
            AsyncStorage.getItem(gameName).then((value)=>{
                if( value !== null ){
                    let intValue = parseInt(value, 10);
                    if(this.props.result.score > intValue  ){
                        this.setState({ 
                            bestScore: this.props.result.score, 
                            isNewBest: true,
                        });
                        this._setScore(gameName, this.props.result.score.toString(10));
                        console.log('#RP NEW RECORD')
                    }else{
                        this.setState({ bestScore: intValue });
                    }
                }else{
                    console.log('#RP getLocalStorage empty')
                    this._setScore(gameName, "0");
                    this._getScore(gameName);
                }
            });

        }
        catch(error){
            console.log('#RP get LocalStorage Error', error)
        }
    }

    _setScore = async (gameName, value) =>{
        try{
            await AsyncStorage.setItem(gameName, value)
        }
        catch(error){
            console.log('#RP set LocalStorage Error', error)
        }
    }

//=====================================================END=========================

}

export default ResultPage;

const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        width: DEVICE_WIDTH,
        height: DEVICE_HEIGHT,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingTop: 30,
    },
    resultHolder:{
        width: DEVICE_WIDTH*0.8,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: '#444647',
        borderBottomWidth: 1,
        paddingBottom: 35,
    },
    resultText:{
        fontSize: 55,
        marginTop: 20,
        marginBottom: 10,
    },
    motivationText:{
        fontSize: 14,
        color: TEXT_COLOR,
    },
    errorHolder:{
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40,
    },
    incorrect:{
        color: '#E57979',
        fontSize: 17,
        marginBottom: 17,
    },
    ansHolder:{
        flexDirection: 'row',
    },
    ansText:{
        color: TEXT_COLOR,
        fontSize: 17,
        marginRight: 10,
        marginLeft: 10,
    },
    continueHolder:{
        padding: 40,
        width: DEVICE_WIDTH,
        justifyContent: 'center',
        alignItems: 'center',
    },
    continueText:{
        color:'#444647',
        fontSize: 14,
    }
})
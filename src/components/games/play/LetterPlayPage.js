import React from 'react'
import { View, StyleSheet, 
        Text, 
        ScrollView, 
        TouchableOpacity,  
        UIManager, 
        LayoutAnimation } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import PausePage from '../PausePage'
import {__toNewTranslate, 
        __toMoveFirst, 
        __toMakeLetterWrong, 
        __toOldTranslate } from '../../../constants/GlobalFunction'
import Words from '../../../constants/Words'
import {    TEXT_COLOR, 
            DEVICE_WIDTH, 
            MAIN_COLOR, 
            DEVICE_HEIGHT,
            TIMER_TO_ANSWER_LETTER,
            SIMILAR_MISTAKES,
            NEW_OPTIONS_NUMBER } from '../../../constants'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class LetterPlayPage extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
                        PAUSED: false,
                        timerOpacity: 0.0, 
                        items: Words[0].words.split(' '), 
                        randomBeginner: 0,  
                        task: '', 
                        variants: [], 
                        score: 0, 
                        timer: TIMER_TO_ANSWER_LETTER,
                        level: 0,
                        answer:''
                    }
        this._checker = this._checker.bind(this);
        this._arrangeTask = this._arrangeTask.bind(this);
        this._gameOver = this._gameOver.bind(this)
    }
//=======================================INNER FUNCTIONS======================================
componentDidMount(){
   this._arrangeTask();
   const interval = 450; 
   let timeMill = this.state.timer * 1000;
   let updateNum = timeMill/interval;
   let stepIncreaser = 1/updateNum;
   
    this.Timer = setInterval(()=>{
        if(!this.state.PAUSED){
            LayoutAnimation.spring()
            this.setState({
                timerOpacity: this.state.timerOpacity + stepIncreaser,
                timer: this.state.timer - (interval/1000),
            })
        }
        if(this.state.timer <= 0){
            this._gameOver('ТЕЗІРЕК ОЙЛАН');
        }
    }, interval)

    this._arrangeTask();
}
componentWillUnmount(){
    clearInterval(this.Timer)
}


_checker(value){
    // to avoid random clicks i set it
        if(!value.correct){
            this.setState({ score: this.state.score + ( Math.round( this.state.score*0.1 ) + 10 ) });
            this._arrangeTask()
        }else{
            this._gameOver("[ " + value.ans + " ] БҰЛ ДҰРЫС, ҚАТЕСІН ТАП " )
        }
}

_gameOver(cause){
    clearInterval(this.Timer)
    
    let result = {
        score: this.state.score,
        task:  this.state.task,
        error: cause,
        ans: this.state.answer,
    }
    this.props.toGameOver(result)
}


_arrangeTask(){
    // Here One Random Word was choosed and transfered to the 
    // beging of the array
    let randIndex = this.state.randomBeginner + 
                    Math.round(Math.random()*(this.state.items.length - this.state.randomBeginner-1) );
    let randomItem = this.state.items[randIndex];
    this.state.items = __toMoveFirst(this.state.items, randIndex );

    // Here that randomItem will be splited as 
    //seperate character
    let itemLetters = randomItem.split('');
    let ITEM_LETTERS = [];
    itemLetters.map((letter, id)=>{
        ITEM_LETTERS.push(
            {
            ans: __toNewTranslate(letter),
            correct: true,
            }
        )
    })

    //here will be set wrong letter depending on length of word
    let wrongLetterIndex = Math.round(Math.random()* (ITEM_LETTERS.length-1) )

    let temRightAns = ITEM_LETTERS[wrongLetterIndex].ans;
    ITEM_LETTERS[wrongLetterIndex].correct = false;
    ITEM_LETTERS[wrongLetterIndex].ans = __toMakeLetterWrong(ITEM_LETTERS[wrongLetterIndex].ans);

    let WRONG_WORD = ''
    ITEM_LETTERS.map((letter, id)=>{
        if(!letter.correct) WRONG_WORD += " [ "+letter.ans+" ] ";
        else WRONG_WORD += letter.ans;
    })

    LayoutAnimation.spring()
    this.setState({
        randomBeginner: this.state.randomBeginner + 1,
        timer: TIMER_TO_ANSWER_LETTER,
        timerOpacity: 0.0, 
        variants: ITEM_LETTERS,
        task: WRONG_WORD,
        answer: randomItem,
    })

    
    //this will chek if the array begining reached to the end
    if(this.state.items.length === (this.state.randomBeginner + 1)) this.setState({randomBeginner: 0})
}

//===========================================RENDER===========================================
    render(){
       let variantsOutput = []
       this.state.variants.map((word, id)=>{
           variantsOutput.push(
            <TouchableOpacity 
            key = {id} 
            style = { styles.variantHolder }
            onPress = {()=>{ this._checker(word) }}
            >
                <Text style = { styles.variantsText }>{word.ans}</Text>
            </TouchableOpacity>
           )
       })

       /**
         * When pause state is true
         * this will show PAUSED
         */
        let pausedPage = <View/>
        if(this.state.PAUSED) pausedPage = <PausePage
                                            data = {this.props.data}
                                            onRequestToResume = {()=>{this.setState({PAUSED: false})}}
                                            onRequestToClose = {()=>{ this._gameOver('ЖЕҢІЛДІМ, ҚИЫН ЕКЕН'); this.props.toClose() }}
                                            onRequestToFinish = {()=>{ this._gameOver('ЖЕҢІЛДІМ, ҚИЫН ЕКЕН') }}/>

        return(
            <View style = { styles.holder }>
            { pausedPage }
                <View style = { [styles.timer, { height: DEVICE_HEIGHT*this.state.timerOpacity, }] }/>
                <View style = { styles.header }>
                    <Icon
                    name = {'pause'}
                    color = {TEXT_COLOR}
                    size = {22}
                    underlayColor = {'rgba(0,0,0,0)'}
                    containerStyle = { {backgroundColor: 'rgba(0,0,0,0)', padding: 20} }
                    onPress = { ()=>{ this.setState({PAUSED: true}) } }/>
                    <Text style = { styles.score }> {this.state.score} </Text>
                </View>
                <View style = { styles.ansHolder }>
                    <Text style = { styles.ansText }>{this.state.answer}</Text>
                </View>
                <View style = { styles.play }>
                    <ScrollView 
                    style = { styles.variantsHolder } 
                    contentContainerStyle={[styles.variantsHolderX]}> 

                        {variantsOutput}

                    </ScrollView>
                </View>

            </View>
        )
    }
}

export default LetterPlayPage;

//=================================OUTSIDE FUNCTIONS==============================



//========================================DESIGN====================================
const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    timer:{
        position: 'absolute',
        left: 0,
        top: 0,
        width: DEVICE_WIDTH,
        backgroundColor: 'rgba(255,255,255,0.8)'
    },
    play:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        paddingTop: DEVICE_HEIGHT*0.15,
    },
    header:{
        marginTop: 20,
        height: DEVICE_HEIGHT * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'rgba(0,0,0,0.25)'
    },
    score:{
        color: TEXT_COLOR,
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
        marginRight: 25,
    },
    variantsHolder:{
        flexDirection: 'column',
    },
    variantsHolderX:{
        flexWrap: 'wrap', 
        alignItems: 'flex-start',
        flexDirection:'row',
    },
    variantHolder:{
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.4)',
        borderRadius: 10,
        margin: 7,
    },
    variantsText:{
        color: 'white',
        fontSize: 30,
    },
    ansHolder:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    ansText:{
        color: 'white',
        fontSize: 40,
    }
  
})
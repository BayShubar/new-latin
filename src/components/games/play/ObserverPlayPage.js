import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import PausePage from '../PausePage'
import { __toNewTranslate, __toMoveFirst, __toMakeWrong, __toOldTranslate } from '../../../constants/GlobalFunction'
import Sentences from '../../../constants/Sentences'
import {    TEXT_COLOR, 
            DEVICE_WIDTH, 
            MAIN_COLOR, 
            DEVICE_HEIGHT,
            TIMER_TO_ANSWER_OBSERVER,
            SIMILAR_MISTAKES,
            NEW_OPTIONS_NUMBER, 
            TITLE_COLOR} from '../../../constants'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class ObserverPlayPage extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
                        PAUSED: false,
                        timerOpacity: 0.0, 
                        sentences: Sentences, 
                        randomBeginner: 0,  
                        task: '', 
                        variants: [], 
                        score: 0, 
                        timer: TIMER_TO_ANSWER_OBSERVER,
                        level: 0,
                        answer:'',
                        rightSentence: '',
                    }
        this._checker = this._checker.bind(this);
        this._arrangeTask = this._arrangeTask.bind(this);
        this._gameOver = this._gameOver.bind(this)
    }
//=======================================INNER FUNCTIONS======================================
componentDidMount(){
   this._arrangeTask();
   const interval = 400; 
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
            this._gameOver('TIME IS OUT');
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
            this._gameOver(value.ans + ' (is correct)')
        }
}

_gameOver(cause){
    clearInterval(this.Timer)
    
    let result = {
        score: this.state.score,
        task: this.state.task,
        ans: this.state.answer,
        error: cause,
    }
    this.props.toGameOver(result)
}


_arrangeTask(){
        // Here One Random Sentence was choosed and transfered to the 
        // beging of the array
        let randIndex = this.state.randomBeginner + 
                        Math.round(Math.random()*(this.state.sentences.length - this.state.randomBeginner-1) );
        let randomSentence = this.state.sentences[randIndex];
        this.state.sentences = __toMoveFirst(this.state.sentences, randIndex );

        // here that array splited to seperate
        //words and translated to NEW then it will assigned to variants
        let arrayWords = randomSentence.sentence.split(' ');
        let RANDOM_SENTENCE_ARR = [];
        arrayWords.map((word, id)=>{
            let temWord = {
                ans: __toNewTranslate(word),
                correct: true,
            }
            RANDOM_SENTENCE_ARR.push(temWord)
        })

        //here will be set wrong word depending on length of word
        let wrongWordIndex = Math.round(Math.random()* (RANDOM_SENTENCE_ARR.length-1) )


        let temRightAns = RANDOM_SENTENCE_ARR[wrongWordIndex].ans;
        RANDOM_SENTENCE_ARR[wrongWordIndex].correct = false;
        RANDOM_SENTENCE_ARR[wrongWordIndex].ans = __toMakeWrong(RANDOM_SENTENCE_ARR[wrongWordIndex].ans);
        // let wrongWordIndex = 0, stoper = true;
        // while(stoper){
        //     wrongWordIndex = Math.round(Math.random()* (RANDOM_SENTENCE.length-1) )
        //     stoper = (wrongWordIndex.length > 2)? false: true; 
        // }
        
        // after all manipulation we change
        // the value of this.state
        LayoutAnimation.spring()
        this.setState({
            randomBeginner: this.state.randomBeginner + 1,
            timer: TIMER_TO_ANSWER_OBSERVER,
            timerOpacity: 0.0, 
            task: RANDOM_SENTENCE_ARR[wrongWordIndex].ans,
            variants: RANDOM_SENTENCE_ARR,
            answer: temRightAns,
            rightSentence:  randomSentence.sentence,
        })

        //this will chek if the array begining reached to the end
        if(this.state.sentences.length === (this.state.randomBeginner + 1)) this.setState({randomBeginner: 0})
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
                <View style = { styles.play }>
                    <ScrollView 
                    style = { styles.variantsHolder } 
                    contentContainerStyle={[styles.variantsHolderX]}> 
                    <View style = { styles.taskHolder }>
                        <Text style = { styles.taskText }> { this.state.rightSentence } </Text>
                    </View>
                        {variantsOutput}

                    </ScrollView>
                </View>

            </View>
        )
    }
}

export default ObserverPlayPage;

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
        backgroundColor: 'rgba(250, 250, 250,0.6)'
    },
    play:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        paddingTop: DEVICE_HEIGHT*0.01,
    },
    header:{
        marginTop: 20,
        height: DEVICE_HEIGHT * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between'
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
        padding: 15,
        backgroundColor: 'rgba(250, 250, 250, 0.2)',
        margin: 5,
        borderRadius: 10,
    },
    variantsText:{
        color: 'white',
        fontSize: 25,
    },
    taskHolder:{
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        width: DEVICE_WIDTH * 0.8,
        padding: 10,
        margin: 10,
        borderRadius: 10,
    },
    taskText:{
        color: 'white',
        fontSize: 25,
    }
  
})
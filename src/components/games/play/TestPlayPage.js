import React from 'react'
import { View, StyleSheet, Text, ScrollView, TouchableOpacity, UIManager, LayoutAnimation } from 'react-native'
import { Icon, Button } from 'react-native-elements'
import PausePage from '../PausePage'
import { __toMoveFirst } from '../../../constants/GlobalFunction'
import {    TEXT_COLOR, 
            DEVICE_WIDTH, 
            MAIN_COLOR, 
            DEVICE_HEIGHT,
            TIMER_TO_ANSWER,
            SIMILAR_MISTAKES,
            NEW_OPTIONS_NUMBER } from '../../../constants'

var CHANGEABLE_NEW_OPTIONS_NUMBER = NEW_OPTIONS_NUMBER;
var LOCAL_TIMER = TIMER_TO_ANSWER;

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);


class TestPlayPage extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
                        PAUSED: false,
                        timerOpacity: 0.0, 
                        words: this.props.wordsToGAme, 
                        randomBeginner: 0,  
                        task: '', 
                        variants: [], 
                        score: 0, 
                        timer: TIMER_TO_ANSWER,
                        level: 0
                    }
        this.checker = this.checker.bind(this);
        this.arrangeTask = this.arrangeTask.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }
//=======================================INNER FUNCTIONS======================================
componentDidMount(){
   this.arrangeTask();
   const interval = 250; 
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
            this.gameOver('TIME IS OUT');
        }
    }, interval)
    
}

componentWillUnmount(){
    CHANGEABLE_NEW_OPTIONS_NUMBER = NEW_OPTIONS_NUMBER;
    LOCAL_TIMER = TIMER_TO_ANSWER;
    clearInterval(this.Timer)
}

gameOver(cause){
    CHANGEABLE_NEW_OPTIONS_NUMBER = NEW_OPTIONS_NUMBER;
    LOCAL_TIMER = TIMER_TO_ANSWER;
    clearInterval(this.Timer)
    
    let result = {
        score: this.state.score,
        task: this.state.task,
        ans: toTranslate(this.props.AllLetters, this.state.task),
        error: "ҚАТЕ ШЕШІМ [ "+cause+" ]",
    }
    this.props.toGameOver(result)
}

checker(result){
    if(result.correct){ 
        this.setState({ score: this.state.score + ( Math.round( this.state.score*0.1 ) + 10 ) });
        this.arrangeTask();
    }else{
        this.gameOver(result.ans);
    }
}

    /**
     *  From Parent was send array of words
     *  then this will choose one randomly from this array
     *  and put this word to the the begining of the array
     *  where this.state.randomBeginner will increase to one
     *  and so one till randomBeginner === to words array length
     *  then it will begin again
     */
    arrangeTask(){
        if(this.state.words.length === (this.state.randomBeginner + 1) ){
            this.setState({randomBeginner: 0})
        }else{
            // Here One Random Word was choosed and transfered to the 
            // beging of the array

            let tillUpropriateWord = true, randIndex, randomWord;
            while(tillUpropriateWord){
                randIndex = this.state.randomBeginner + 
                Math.round(Math.random()*(this.state.words.length - this.state.randomBeginner-1) );
                randomWord = this.state.words[randIndex];
                if(randomWord.length < 12 && randomWord.length > 2) tillUpropriateWord = false;
                this.state.words = __toMoveFirst(this.state.words, randIndex );
            }

            //to move word at the begining of array in order to avoid repetition
            let temWords = this.state.words;
            temWords.splice(randIndex, 1);
            temWords.splice(0,0, randomWord)
            this.setState({words: temWords, randomBeginner: (this.state.randomBeginner + 1 ) })


            //Set a right translation of word and put it to new_variants
            let rightTranslation = toTranslate(this.props.AllLetters, randomWord);


            let new_variants = [{ ans: rightTranslation, correct: true }];

            //push to new_variants other options
            for(let i=1; i < CHANGEABLE_NEW_OPTIONS_NUMBER; i++){
                new_variants.push( { ans: shakeWord(rightTranslation), correct: false } );
            }
            new_variants = shakeIndex(new_variants);

            /**
             * the code below responsible for making
             * game more difficult if user play very well
             * adding extra variants and decresing time
             */
            if(this.state.score >= 100 && this.state.level === 0){ 
                LOCAL_TIMER = TIMER_TO_ANSWER - 1;
                CHANGEABLE_NEW_OPTIONS_NUMBER = CHANGEABLE_NEW_OPTIONS_NUMBER + 1;
                this.setState({level: 1})
            }
            else if(this.state.score >= 500  && this.state.level === 1){ 
                LOCAL_TIMER = TIMER_TO_ANSWER - 2;
                this.setState({level: 2}) 
            }
            else if(this.state.score >= 1000  && this.state.level === 2){ 
                LOCAL_TIMER = TIMER_TO_ANSWER - 3;
                CHANGEABLE_NEW_OPTIONS_NUMBER = CHANGEABLE_NEW_OPTIONS_NUMBER +1;
                this.setState({level: 3})
            }
            else if(this.state.score >= 2000  && this.state.level === 3){ 
                LOCAL_TIMER = TIMER_TO_ANSWER - 4;
                this.setState({level: 4})
            }

            LayoutAnimation.spring();
            this.setState({ 
                task: randomWord,
                variants: new_variants,
                timer: LOCAL_TIMER,
                timerOpacity: 0.0, 
            });
        }
    }



//===========================================RENDER===========================================
    render(){
        let variants = []
        this.state.variants.map((variant, id)=>{
            variants.push(
                <TouchableOpacity 
                style = { styles.variantHolder }
                onPress = { ()=> this.checker( variant ) }
                key = {id}>
                    <Text  style = { styles.taskText } > {variant.ans} </Text>
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
                                            onRequestToClose = {()=>{ this.gameOver('ЖЕҢІЛДІМ, ҚИЫН ЕКЕН'); this.props.toClose() }}
                                            onRequestToFinish = {()=>{ this.gameOver('ЖЕҢІЛДІМ, ҚИЫН ЕКЕН') }}/>


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
                    containerStyle = { {backgroundColor: 'rgba(0,0,0,0)', padding: 20,} }
                    onPress = { ()=>{ this.setState({PAUSED: true}) } }/>
                    <Text style = { styles.score }> {this.state.score} </Text>
                </View>
                <View style = { styles.play }>
                    <View style = { styles.taskHolder }>
                        <Text  style = { styles.taskText } > {this.state.task} </Text>
                    </View>
                    <View style = { styles.variantsHolder }> 

                        {variants}

                    </View>
                </View>

            </View>
        )
    }
}

export default TestPlayPage;

//=================================OUTSIDE FUNCTIONS==============================


/**
 * This is a translator
 */
function toTranslate(letters, word){
    let right = word;
    letters.map( letter=>{
        let regularExpression = new RegExp(letter.old, 'g');
        right = right.replace(regularExpression, letter.New);
    } )
    return right;
}

/**
 * this method change index of right answer
 * @param { all possible variants } variants 
 */
function shakeIndex(variants){
    for(let i=0; i < 5; i++){
        let index = randomInRage(variants.length);
        let temValue = variants[index];
        variants.splice(index, 1);
        variants.splice(0, 0, temValue);
    }
    return variants;
}


/**
 * this method create incorrect version of answer
 * @param {*any possible variants} word 
 */
function shakeWord(word){
    let right = word;
    let wordArray = word.split("");
    word = '';
    let replacerMax = 2;
    for(let i=0; i<wordArray.length; i++){
        let w = wordArray[i];
            if( randomHalf() ){
                    if(  w === "'" ){
                        word = word;
                        continue; 
                    }

                    if( (i+2) < wordArray.length && i > 2  ){
                        if( !( wordArray[i-1]==="'" || wordArray[i] === "'" || wordArray[i+1]=="'" ) ){
                            word = word+wordArray[i]+"'";
                            continue;
                        }
                    }  

                    let isBreak =false;
                    for(let j=0; j<SIMILAR_MISTAKES.length; j++){
                        let miss = SIMILAR_MISTAKES[j];
                            if( w===miss.a ){
                                word = word+miss.b;
                                isBreak = true;
                                break; 
                            }else if( w===miss.b){
                                word = word+miss.a;
                                isBreak = true;
                                break; 
                            }
                    }
                    if(isBreak) continue;

            }
            word = word+w;
            replacerMax--;
    }
    if( word === right ) word = word+"'";
    return word
}



function randomInRage( max ){
    max =  max-1;
    return Math.round(Math.random() * max );
}

function randomHalf(){
    return ( Math.round(Math.random()*1) === 0 ) ? false: true; 
}


//========================================DESIGN====================================
const styles = StyleSheet.create({
    holder: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    timer:{
        position: 'absolute',
        left: 0,
        top: 0,
        width: DEVICE_WIDTH,
        backgroundColor: 'rgba(0,0,0,0.9)'
    },
    play:{
        flex: 1,
        justifyContent: 'flex-end',
        paddingBottom: DEVICE_HEIGHT*0.15,
    },
    header:{
        marginTop: 20,
        height: DEVICE_HEIGHT * 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    score:{
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
        margin: 15,
        marginRight: 25,
    },
    taskHolder:{
        marginBottom: 20,
    },
    variantsHolder:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    variantHolder:{
        width: DEVICE_WIDTH*0.8,
        padding: 15,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(42, 100, 102,0.30)',
        borderWidth: 5,
        borderColor: 'rgba(25, 82, 85,0.6)',
        margin: 5,
        borderRadius: 10,
    },
    taskText:{
        fontSize: 30,
        color: 'white',
        textAlign: 'center',
    }
    
})
import React from 'react'
import { View, 
        StyleSheet, 
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
        __toOldTranslate,
        __shakeIndex } from '../../../constants/GlobalFunction'
import Words from '../../../constants/Words'
import {    TEXT_COLOR, 
            DEVICE_WIDTH, 
            MAIN_COLOR, 
            DEVICE_HEIGHT,
            TIMER_TO_ANSWER_CONSTRUCT,
            SIMILAR_MISTAKES,
            NEW_OPTIONS_NUMBER } from '../../../constants'

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);

class ConstructPlayPage extends React.Component{
    constructor( props ){
        super(props)
        this.state = {
                        PAUSED: false,
                        timerOpacity: 0.0, 
                        items: Words[0].words.split(' '), 
                        randomBeginner: 0,  
                        task: '', 
                        variants: [],
                        extraVariants: [],
                        score: 0, 
                        timer: TIMER_TO_ANSWER_CONSTRUCT,
                        answer:'',
                        clicksNumber: 0,
                        inputValue: []
                    }
        this._clearInput = this._clearInput.bind(this);
        this._previousChecker = this._previousChecker.bind(this);          
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

_clearInput(){
    this.setState({
        clicksNumber: 0,
        inputValue: [],
    })
}


_previousChecker(value){
    let temClickNumber = this.state.clicksNumber + 1
    this.state.inputValue.push(value);
    //does this value is last one if so it will check
    if(temClickNumber < this.state.variants.length){
        this.setState({clicksNumber: temClickNumber})
    }else{
        let cheker = true;
        //let technicalDificulties;
        this.state.inputValue.map((letter, id)=>{
            if(letter.ans != this.state.variants[id].ans){ 
                cheker = false;
            }
        })
        this._checker(cheker)
    }
}

_checker(value){
    // to avoid random clicks i set it
        if(value){
            this.setState({ score: this.state.score + ( Math.round( this.state.score*0.1 ) + 10 ) });
            this._arrangeTask()
        }else{
            this._gameOver(  )
        }
}

_gameOver(cause){
    clearInterval(this.Timer)
    
    let result = {
        score: this.state.score,
        task: this.state.task,
        error: this.state.task,
        ans: __toNewTranslate(this.state.task),
    }
    this.props.toGameOver(result)
}


_arrangeTask(){
    // Here One Random Word was choosed and transfered to the 
    // beging of the array

    let tillUpropriateWord = true, randIndex, randomItem;
    while(tillUpropriateWord){
         randIndex = this.state.randomBeginner + 
        Math.round(Math.random()*(this.state.items.length - this.state.randomBeginner-1) );
         randomItem = this.state.items[randIndex];
         if(randomItem.length < 8 && randomItem.length > 2) tillUpropriateWord = false;
        this.state.items = __toMoveFirst(this.state.items, randIndex );
    }

    // Here that randomItem will be splited as 
    //seperate character
    let itemLetters = randomItem.split('');
    let ITEM_LETTERS = [];
    itemLetters.map((letter, id)=>{
        ITEM_LETTERS.push(
            {
            ans: __toNewTranslate(letter),
            correct: true,
            id: id,
            }
        )
    })



    let shakeTheOrder = ITEM_LETTERS;
    let SAME_IS_REMOVED = [];
    shakeTheOrder.map(letter => {
        let cheker = true;
        SAME_IS_REMOVED.map(newLetter=>{
            if(letter.ans === newLetter.ans) cheker = false;
        })
        if(cheker) SAME_IS_REMOVED.push(letter);
    })
    
    for(let i = 0; i< 3; i++){
        let randomWrongLetter = SAME_IS_REMOVED[Math.round(Math.random()*(SAME_IS_REMOVED.length - 1))].ans;
        SAME_IS_REMOVED.push({
            ans: __toMakeLetterWrong(randomWrongLetter),
            correct: false,
            id: 100+i,
        })
    }



    SAME_IS_REMOVED.map((letter, id)=>{
        if(!letter.correct){
            SAME_IS_REMOVED.map((l, i)=>{
                if(letter.ans == l.ans && l.correct){
                    SAME_IS_REMOVED[id].correct = true;
                }
            })
        }
    })

    SAME_IS_REMOVED =  __shakeIndex(SAME_IS_REMOVED);
    

    LayoutAnimation.spring()
    this.setState({
        randomBeginner: this.state.randomBeginner + 1,
        timer: TIMER_TO_ANSWER_CONSTRUCT,
        timerOpacity: 0.0, 
        variants: ITEM_LETTERS,
        extraVariants: SAME_IS_REMOVED,
        task: randomItem,
        clicksNumber: 0,
        answer: '',
        inputValue: [],

    })

    
    //this will chek if the array begining reached to the end
    if(this.state.items.length === (this.state.randomBeginner + 1)) this.setState({randomBeginner: 0})
}

//===========================================RENDER===========================================
    render(){
       let variantsOutput = []
       this.state.extraVariants.map((word, id)=>{
           variantsOutput.push(
            <TouchableOpacity 
            key = {id} 
            style = { styles.variantHolder }
            onPress = {()=>{ this._previousChecker(word) }}
            >
                <Text style = { styles.variantsText }>{word.ans}</Text>
            </TouchableOpacity>
           )
       })

       let inputOutput = []

       this.state.inputValue.map((letter, id)=>{
        inputOutput.push(
            <Text style = { styles.inputLetter } key ={id} >{letter.ans}</Text>
           )
       })

       let deleteOutput = <View/>
       if(this.state.inputValue.length > 0 ){
            deleteOutput = <Icon 
                            name = 'delete'
                            color = 'white'
                            size = {16}
                            underlayColor = 'rgba(0,0,0, 0.6)'                                                                raised
                            onPress = { ()=>{ this._clearInput() } }
                            containerStyle = {{backgroundColor: 'rgba(0,0,0, 0.6)'}}
                            />
       }
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
                    <View style = { styles.infoHolder }>
                        <View style = { styles.taskHolder }> 
                            <Text style = { styles.taskText }> {this.state.task} </Text>
                        </View>
                    <View style = { styles.inputActionHolder }>

                        <View style = { styles.inputHolder }> 
                        { inputOutput }
                        </View>
                        <View style = { styles.deleteHolder }> 
                        { deleteOutput }
                        </View>

                    </View>
                    </View>
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

export default ConstructPlayPage;

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
        backgroundColor: 'rgba(250, 250, 250,0.86)'
    },
    play:{
        flex: 1,
        justifyContent: 'center',
        padding: 20,
        //paddingTop: DEVICE_HEIGHT*0.35,
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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
    },
    variantHolder:{
        padding: 20,
        backgroundColor: 'rgba(0,0,0, 0.6)',
        borderRadius: 10,
        margin: 7,
    },
    variantsText:{
        color: 'white',
        fontSize: 30,
    },

    infoHolder:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    taskHolder:{
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    taskText:{
        color: 'white',
        fontSize: 50,
    },
    inputActionHolder:{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    deleteHolder: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputHolder:{
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection:'row',
        height: DEVICE_HEIGHT * 0.07,
    },
    inputLetter:{
        color: 'white',
        fontSize: 40,
        // backgroundColor: 'rgba(0,0,0, 0.6)',
    }
  
})
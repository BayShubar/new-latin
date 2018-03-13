import React from 'react'
import {StyleSheet, View} from 'react-native'
import {Button} from 'react-native-elements'
import BackgroundImage from '../components/util/BackgroundImage'
import StartPage from '../components/games/StartPage'
import Letters from '../constants/Letters'
import Words from '../constants/Words'
import TestPlayPage from '../components/games/play/TestPlayPage'
import ResultPage from '../components/games/ResultPage'

class TestPlay extends React.Component {
  constructor(props){
    super(props)
    this.state  = { isOpen: 'start', result: 0 }
  }
    render() {
      let data = this.props.navigation.state.params;
      let currentOutput = {}
      if(this.state.isOpen === 'start'){
          currentOutput = <StartPage
                          data = {data}
                          onRequestToClose = { ()=>{ this.props.navigation.goBack() } }
                          onRequestToStart = { ()=>{ this.setState({isOpen: 'play'}) } }/>
      }else if(this.state.isOpen === 'play'){
        currentOutput = <TestPlayPage
                          data = {data}
                          wordsToGAme = {Words[0].words.split(' ')}
                          toGameOver = { (result)=>{ this.setState({isOpen: 'result', result: result}) } }
                          AllLetters = {Letters}
                          toClose = {()=>{ this.props.navigation.goBack() }}/>
      }else if(this.state.isOpen === 'result'){
        currentOutput = <ResultPage
                          data = {data}
                          result = { this.state.result }
                          onRequestToContitnue = { ()=>{this.setState({isOpen: 'start'})} }/>
    }
       
      return (
        <View style = {{ flex: 1, backgroundColor: data.backgroundColor}} >
          <BackgroundImage
          source = {require('../images/back/game1.jpg')}>
            { currentOutput }
          </BackgroundImage>
        </View>
      );
    }
  }

export default TestPlay;

const styles = StyleSheet.create({
    holder: { 
        flex: 1,
    }
})
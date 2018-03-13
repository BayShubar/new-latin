import React from 'react'
import { View, StyleSheet, ScrollView, TextInput, 
        Text, Clipboard, Share } from 'react-native'
import { Button, Icon } from 'react-native-elements'   
import {__toNewTranslate, __toOldTranslate} from '../../constants/GlobalFunction'
import { DEVICE_HEIGHT,
         DEVICE_WIDTH, 
         ACTIVE_MAIN_COLOR, 
         INACTIVE_MAIN_COLOR } from '../../constants'

class MainTranslator extends React.Component{
    constructor(props){
        super(props)
        this.state = { input: '', output: '', from: 'Ескі', to: 'Жаңа', extraInfo: false, }
        this.converter = this.converter.bind(this)
        this.languageChange = this.languageChange.bind(this)
        this.toContentCopy = this.toContentCopy.bind(this)
        this.toContentPaste = this.toContentPaste.bind(this)
        this._shareText = this._shareText.bind(this)
    }

    toContentPaste = async () => {
            let clipboardContent = await Clipboard.getString(); 
            if(clipboardContent !== null){
                this.converter(clipboardContent);
            }
    }

    _shareText(){
        let message = this.state.output + '\n\n';
        message += 'Aударған (QazaQLatin): https://play.google.com/store/apps/details?id=com.yerkebulanduisebay.newqazaqlatin';
        Share.share({
            message: message,
        })
    }

    toContentCopy(){
        Clipboard.setString(this.state.output)
        this.setState({ extraInfo: true })
    }
    languageChange(){
        let tem = this.state.from;
        this.setState({ from: this.state.to });
        this.setState({ to: tem });
        tem = this.state.input;
        this.setState({ input: this.state.output })
        this.setState({ output: tem });
    }

    converter( text ){
        this.setState( { input: text} );
        let result = text;

        if( this.state.from === 'Ескі' ){
            result = __toNewTranslate(result);
        }else {
            result = __toOldTranslate(result);
        }
        this.setState({ output: result });

    }

    render(){
        let inputText = this.state.from+" әріптерді еңгізіңіз... ";

        /**
         * This set of action and translated word holder text when no text 
         * actions can not be displayed and no any translation
         */
        let translationResult = (this.state.input !== '')?
            (
                <View style = { styles.content }>
                    <View style = { styles.contentActions }>
                        <Icon
                        name = {'content-copy'}
                        color = {'white'}
                        size = {17}
                        onPress = {()=>{ this.toContentCopy() }}
                        raised
                        underlayColor = {ACTIVE_MAIN_COLOR}
                        containerStyle = {{backgroundColor: INACTIVE_MAIN_COLOR}}/>

                        <Icon
                        name = {'share'}
                        color = {'white'}
                        size = {17}
                        onPress = {()=>{  this._shareText() }}
                        raised
                        underlayColor = {ACTIVE_MAIN_COLOR}
                        containerStyle = {{backgroundColor: INACTIVE_MAIN_COLOR,}}/>

                    </View>
                    <Text style={ styles.translated }>
                        { this.state.output  }
                    </Text>
                </View>
            ):(
                <View />
            )

        /**
         * This set of action to manipulate text when no text 
         * actions can not be displayed 
         */
        let inputActions = (this.state.input !== '')?
        (
            <View style = { styles.contentActions }>
                <Icon
                name = {'delete'}
                color = {'white'}
                size = {17}
                onPress = {()=>{  this.setState({input: '', output: ''}) }}
                raised
                underlayColor = {INACTIVE_MAIN_COLOR}
                containerStyle = {{backgroundColor: ACTIVE_MAIN_COLOR}}/>
            </View>
        ):(
            <View style = { styles.contentActions }>
                <Icon
                name = {'content-copy'}
                color = {'white'}
                size = {17}
                onPress = {()=>{ this.toContentPaste() }}
                raised
                underlayColor = {INACTIVE_MAIN_COLOR}
                containerStyle = {{backgroundColor: ACTIVE_MAIN_COLOR}}/>
            </View>
        )

        return(
            <View>
                <View style={ styles.header }> 
                    <View  style={ styles.languageContainer }>
                        <Text style={ styles.languageText }>{ this.state.from }</Text>
                    </View>
                    <View  style={ styles.languageContainer }>
                        <Button 
                            title = { '' } 
                            icon = { { name: 'swap-horiz', color:ACTIVE_MAIN_COLOR, size: 25 }  }
                            onPress= { ()=>{ this.languageChange() } }
                            backgroundColor = { 'white' }
                        />
                    </View>
                    <View  style={ styles.languageContainer }>
                        <Text style={ styles.languageText }>{ this.state.to }</Text>
                    </View>
                </View>
                <View style = { styles.inputContent }>
                    { inputActions }
                    <TextInput
                        placeholder = { inputText }
                        multiline = {true}
                        numberOfLines = {2}
                        fontSize = { 18 }
                        onChangeText = { (text)=> this.converter(text)  }
                        value = { this.state.input }
                        padding = { 7 }
                        borderColor = { ACTIVE_MAIN_COLOR }
                        autoFocus = {false}
                        underlineColorAndroid= { INACTIVE_MAIN_COLOR }
                        placeholderTextColor = {INACTIVE_MAIN_COLOR }
                    />
                </View>
                {translationResult}
                <View style = {{ height: 50 }}/> 
            </View>
        )
    }
}
export default MainTranslator;

const styles = StyleSheet.create({
    header:{
        height: 54,
        borderColor: ACTIVE_MAIN_COLOR,
        borderBottomWidth: 1,
        flexDirection: 'row',
    },
    languageContainer:{
        flex: 1,
        justifyContent: 'center',
        alignItems:"center",
    },
    languageText:{
        color: ACTIVE_MAIN_COLOR,
        fontSize: 20,
    },
    inputContent:{
        marginRight: DEVICE_WIDTH *0.05,
        marginLeft: DEVICE_WIDTH*0.05,
        marginTop: DEVICE_HEIGHT*0.02,
        //height: DEVICE_HEIGHT*0.25,
    },
    content:{
        marginRight: DEVICE_WIDTH *0.05,
        marginLeft: DEVICE_WIDTH*0.05,
        marginTop: DEVICE_HEIGHT*0.02,
        borderRadius: 10,
        backgroundColor: INACTIVE_MAIN_COLOR,
        padding: 10,
        paddingBottom: 30,
        minHeight: 1,
        //height: DEVICE_HEIGHT*0.25,
    },
    contentActions:{
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems:"center",
    },
    translated:{
        fontSize: 18,
        color: 'white',
    }
});
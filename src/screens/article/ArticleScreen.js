import React from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'
import { Icon } from 'react-native-elements'
import AdjustHeader from '../../components/articles/AdjustHeader'
import ImageHandler from '../../components/util/ImageHandler'
import {DEVICE_WIDTH, 
        DEVICE_HEIGHT,
        BACKGROUND_MAIN_COLOR,
        BACKGROUND_COLOR,
        ACTIVE_MAIN_COLOR,
        INACTIVE_MAIN_COLOR} from '../../constants';
import Letters from '../../constants/Letters'
import {__getTranslatedText,
        __toArrangeLetters} from '../../constants/GlobalFunction'

class ArticleScreen extends React.Component{
    static navigationOptions = ({navigation})=>{
        const params = navigation.state.params || {};
        let persentage = (params.translated === undefined)? 100 : params.translated;
        return {
            headerRight: <AdjustHeader
            toAdd = { params.toAdd }
            toRemove ={ params.toRemove }/>,
            headerTitle: persentage  + '% аударылды'
        }
      };

      constructor(props){
          super(props);
          this.state = { 
                        AllLetters: __toArrangeLetters(Letters),
                        letters: [],
                        translated: 100, 
                        }
        this._toAdd = this._toAdd.bind(this)
        this._toRemove = this._toRemove.bind(this)
        this._setLetters = this._setLetters.bind(this)
      }

      _setLetters(percentage){
        if(percentage === 100){
             this.setState({letters: this.state.AllLetters})
        }
        else if(percentage === 0){
             this.setState({letters: []})
        }else{
            let result = []
            let ratio = (percentage / 10)*3;
            for(let i = 0; i<ratio; i++){
                result.push(this.state.AllLetters[i]);
            }
            this.setState({letters: result});
        }
      }

      _toAdd(){
          if(this.state.translated < 100){
              this.setState({translated: this.state.translated + 10})
              this.props.navigation.setParams({ translated: this.state.translated + 10  })
              this._setLetters(this.state.translated + 10)
          }
          if(this.state.translated > 100){
               this.setState({translated: 100})
               this.props.navigation.setParams({ translated: 100  })
        }
      }

      _toRemove(){
        if(this.state.translated > 0){
            this.setState({translated: this.state.translated - 10})
            this.props.navigation.setParams({ translated: this.state.translated - 10  })
            this._setLetters(this.state.translated - 10)
        }
        if(this.state.translated < 0){ 
            this.setState({translated: 0})
            this.props.navigation.setParams({ translated: 0  })
        }
      }

      componentWillMount(){
          this.props.navigation.setParams({toAdd: this._toAdd,
                                           toRemove: this._toRemove,})
          this.setState({letters: this.state.AllLetters})
      }

    render(){
        const article = this.props.navigation.state.params;
        const title = __getTranslatedText(article.title, this.state.letters);
        const content = __getTranslatedText(article.content, this.state.letters);
        return(
            <View style = { styles.holder }>
                <ScrollView>
                    <View style = {styles.imageHolder}>
                        <ImageHandler 
                        source = {article.image}
                        width = {article.width}
                        height = {article.height}
                        ratio = { 1 }/>
                    </View>
                    <View style = { styles.scrollText }> 
                        <Text style = { styles.title }> {title} </Text>
                        <Text style = { styles.content }> {content} </Text>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

export default ArticleScreen;

const styles = StyleSheet.create({
    holder: {
        backgroundColor: BACKGROUND_MAIN_COLOR,
    },
    scrollText:{
        padding: 15,
    },
    title:{
        color: ACTIVE_MAIN_COLOR,
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 10,
        paddingBottom: 10,
    },
    content: {
        color: INACTIVE_MAIN_COLOR,
        fontSize: 15,
    },
    imageHolder: {
        borderRadius: 5,
        minHeight: 100,
        backgroundColor: 'rgba(0,0,0,0.8)',
        flex: 1,
        justifyContent: 'center',
        alignSelf: 'stretch',
        alignItems: 'center',
    },
})
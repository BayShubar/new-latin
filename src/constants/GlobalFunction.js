import letters from './Letters'
import {SIMILAR_MISTAKES, LETTERS_TO_ELIMINATE} from './'
import {AsyncStorage} from 'react-native'



/**
 * this funtion get and translate from old to new
 * new feature added яэьъ are automatically eliminated
 * @param {*} letters 
 * @param {*} word 
 */
export const __toNewTranslate = (word)=>{
    let right = "";
    let byLetters = word.split('');
    byLetters.map(letter=>{
        let temCheker = true;
        LETTERS_TO_ELIMINATE.map(wrong => {
            if(wrong.down === letter || wrong.up === letter)
                temCheker = false;
        })
        if(temCheker) right += letter;
    })

    letters.map( letter=>{
        let regularExpression = new RegExp(letter.old, 'g');
        right = right.replace(regularExpression, letter.New);
    } )
    return right;
}

/**
 * this funtion get and translate from new to old
 * @param {*} letters 
 * @param {*} word 
 */
export const __toOldTranslate = (word)=>{
    let right = word;
    letters.map( letter=>{
        let regularExpression = new RegExp(letter.New, 'g');
        right = right.replace(regularExpression, letter.old);
    } )
    return right;
}


/**
 * this method change index of right answer
 * @param { all possible variants } variants 
 */
export const  __shakeIndex = (array)=>{
    let variants = [];
    array.map(item => {
        variants.push(item);
    })
    for(let i=0; i < 5; i++){
        let index = randomInRage(variants.length);
        let temValue = variants[index];
        variants.splice(index, 1);
        variants.splice(0, 0, temValue);
    }
    return variants;
}


/**
 * take the element at given index and put it 
 * as first element in array and return new Array
 * @param {array of smth} items 
 * @param {index} itemIndex 
 */
export const __toMoveFirst = (items, itemIndex)=>{
    let temItem = items[itemIndex];
    let result = items;
    result.splice(itemIndex, 1);
    result.splice(0,0, temItem)
    return result;
}

/**
 * this method will return wrong letter
 * @param {*} letter 
 */
export const __toMakeLetterWrong = (letter)=>{
    let LoocalValue = '?'

    if(letter.length > 1)
        LoocalValue = letter.charAt(0);
    else  
        LoocalValue =  letter + "'";
    SIMILAR_MISTAKES.map((l)=>{
        if(l.a == letter){ 
            LoocalValue = l.b;
        }
        if(l.b == letter){
            LoocalValue = l.a;
        }
    })

    return LoocalValue;
}



/**
 * this method create incorrect version of answer
 * @param {*any possible variants} word 
 */
export const __toMakeWrong = (word)=>{
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

//==============================LOCAL==================================
function randomInRage( max ){
    max =  max-1;
    return Math.round(Math.random() * max );
}

function randomHalf(){
    return ( Math.round(Math.random()*1) === 0 ) ? false: true; 
}






/**
 * this methode will arrange a letters 
 * UpperCase with LowerCase
 * @param {*letters from file} letters 
 */
export const __toArrangeLetters = (letters)=>{
    const result = [];
    for(let i = 0; i<(letters.length/2); i++){
        let tem = {
            up: letters[i],
            down: letters[i+33]
        }
        result.push( tem );
    }
    return result;
}

/**
 * this return translated text with
 * givven letters and text
 * @param {*text to translation} text 
 * @param {*the group of letters for translation that come from getLettersToTranslation()} letters 
 */
export const __getTranslatedText = (text, letters)=>{
    letters.map( (letter, index)=>{
        let regularExpression = new RegExp(letter.up.old, "g");
        let replacer = letter.up.New;
        text = text.replace(regularExpression,replacer);

        regularExpression = new RegExp(letter.down.old, "g");
        replacer = letter.down.New;
        text = text.replace(regularExpression,replacer);
    });
    return text;
}
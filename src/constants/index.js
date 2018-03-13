import { Platform, Dimensions, View } from 'react-native';

export const ACTIVE_MAIN_COLOR = '#000000'
export const INACTIVE_MAIN_COLOR = '#686868'
export const BACKGROUND_MAIN_COLOR = '#FAFAFA';
export const BACKGROUND_COLOR = '#EEEEEE';

export const MAIN_COLOR = "#44D3C5"  //#E19D29
export const TITLE_COLOR = '#7A7A7A';
export const TEXT_COLOR = '#C7C7C7';

export const DEVICE_HEIGHT = Dimensions.get('window').height;
export const DEVICE_WIDTH = Dimensions.get('window').width;


export const TIMER_TO_ANSWER = 8;
export const NEW_OPTIONS_NUMBER = 2;
export const TIMER_TO_ANSWER_OBSERVER = 15;
export const TIMER_TO_ANSWER_LETTER = 10;
export const TIMER_TO_ANSWER_CONSTRUCT = 12;
export const SIMILAR_MISTAKES = [
    { 
        a: 'q',
        b: 'k',
    },
    { 
        a: 'b',
        b: 'v',
    },
    { 
        a: 'l',
        b: 'i',
    },
    { 
        a: 'q',
        b: 'o',
    },
    { 
        a: 'c',
        b: 's',
    },
    { 
        a: 'c',
        b: 'k',
    },
    { 
        a: 'b',
        b: 'p',
    },
    { 
        a: 't',
        b: 'd',
    },
    { 
        a: 'y',
        b: 'u',
    },
    

    
    { 
        a: 'Q',
        b: 'K',
    },
    { 
        a: 'B',
        b: 'V',
    },
    { 
        a: 'L',
        b: 'I',
    },
    { 
        a: 'Q',
        b: 'O',
    },
    { 
        a: 'C',
        b: 'S',
    },
    { 
        a: 'C',
        b: 'K',
    },
    { 
        a: 'B',
        b: 'P',
    },
    { 
        a: 'T',
        b: 'D',
    },
    { 
        a: 'Y',
        b: 'U',
    },
];

export const LETTERS_TO_ELIMINATE = [
    {
        up: "Я",
        down: "я",
    },
    {
        up: "Ц",
        down: "ц",
    },
    {
        up: "Э",
        down: "э",
    },
    {
        up: "Ъ",
        down: "ъ",
    },
    {
        up: "Ь",
        down: "ь",
    },
]
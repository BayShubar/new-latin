import React from 'react'
import { Image } from 'react-native'
import {DEVICE_WIDTH} from '../../constants'

class ImageHandler extends React.Component{
    render(){
        let ratio = (DEVICE_WIDTH * this.props.ratio )/this.props.width;
        return(
                    <Image 
                    resizeMode='cover'
                    style = {{ width: ratio*this.props.width,height: ratio*this.props.height,}}
                    source = { this.props.source }
                    >
                        {this.props.children}
                    </Image>
        )
    }
}
export default ImageHandler;

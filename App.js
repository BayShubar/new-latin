import React from 'react'
import Root from './src/navigation'
import { View } from 'react-native'

export default class App extends React.Component{
  render(){
    return(
      <Root/>
    )
  }
}


// import React from 'react';
// import RootTabs from './app/constants/RootTabs'
// import {Provider} from 'react-redux'
// import { createStore } from 'redux'
// import Reducers from './app/reducers'

// const store = createStore(Reducers);

// export default class App extends React.Component {
//   render() {
//     return (
//       <Provider store = {store}>
//         <RootTabs/>
//       </Provider>
//     );
//   }
// }

// import React, {Component} from 'react';
// import {WebView} from 'react-native-webview';

// // const {price} = route.params;

// export default class Paypal extends Component {
//   constructor(props) {
//     super(props);
//     this.webviewRef = null;
//   }
//   componentDidMount() {
//     this.webView.postMessage('150');
//   }
//   render() {
//     // return <WebView source={{uri: 'https://google.com/'}} />;
//     return (
//       <WebView
//         style={{marginTop: 20}}
//         ref={(view) => (this.webView = view)}
//         source={{uri: 'https://tcspaypal.herokuapp.com/'}}
//       />
//     );
//   }
// }
/* <WebView source={{uri: 'https://tcspaypal.herokuapp.com/'}} /> */

import React, {useEffect, useState} from 'react';
import {WebView} from 'react-native-webview';

const Paypal = (props) => {
  let myWebView;
  const [price, setprice] = useState(0);
  useEffect(() => {
    setprice(props.route.params.price);
  }, []);
  return (
    <WebView
      ref={(el) => (myWebView = el)}
      onLoadEnd={() => myWebView.postMessage(price)}
      source={{uri: 'https://tcspaypal.herokuapp.com/'}}
    />
  );
};

export default Paypal;

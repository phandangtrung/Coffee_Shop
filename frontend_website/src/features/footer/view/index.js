import React, { Component } from 'react'
import  './style.css';
import {Images} from "../../../config/image"

import { Row, Col } from 'antd';

export class Footer extends Component {
    render() {
        return (
            <div className="footer">
               <img className="img-backgroud " src={Images.FTBG} alt=""/>
               
               <div className="footer-contents">
                  
               </div>
            </div>
        )
    }
}

export default Footer

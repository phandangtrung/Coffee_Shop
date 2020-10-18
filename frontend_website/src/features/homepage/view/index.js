import React, { Component } from 'react'
import Header from "../../header/view"
import {Images} from "../../../config/image"

import { Carousel } from 'antd';

import "./style.css"
export class Homepage extends Component {
    render() {
        return (
            <div className="Hompage">
                <Header />              
                <Carousel autoplay  autoplaySpeed={4000}>
                    <div>
                    <h3 className="banner"><img alt={"slide2"}  src={Images.SLIDE2} className="reponsive-img"   /></h3>
                    </div>
                    <div>
                    <h3 className="banner"><img alt={"slide3"}  src={Images.SLIDE3} className="reponsive-img" /></h3>
                    </div>
                    <div>
                    <h3 className="banner"><img alt={"slide3"}  src={Images.SLIDE3} className="reponsive-img" /></h3>
                    </div>
                    
                </Carousel>               
            </div>
        )
    }
}

export default Homepage

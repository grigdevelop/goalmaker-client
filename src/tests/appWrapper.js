import React from "react";
import { MemoryRouter } from "react-router-dom";
import { mount } from "enzyme";
import ReactRouterEnzymeContext from "react-router-enzyme-context";

import App from "./../App";

class AppWrapper{

    constructor(){
        let options = new ReactRouterEnzymeContext();  
        let optionsRes = options.get();
        this.v = mount(<MemoryRouter><App /></MemoryRouter>, optionsRes); 
        Object.getPrototypeOf(this.v).toPromise = () => {
            return new Promise((res, rej) => {
                setImmediate(() => {
                    res();
                });
            });
        } 
    }

    view(){
        return this.v;
    }

    logView(){
        console.log(this.v.html());
    }

    static emptyEvent(){
        return {preventDefault: () => {}};
    }

    static waitApi(){
        return new Promise((res, rej) => {
            setImmediate(() => {
                res();
            });
        });
    }
}

export {AppWrapper};
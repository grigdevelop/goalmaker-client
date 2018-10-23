import { arranger } from './mockDb';

class HMocker{    

    constructor(expression){
        this.expression = expression;
        this.handler = (url, data) => {throw new Error("mock handler not implmented for url: ", url)};
    }

    setExpression(expression){
        this.expression = expression;
    }

    do(handler){
        this.handler = handler;
    }
}


class RoutMocker{

    constructor(){
        this.handlers = [];
    }

    when(booleanExpression){
        let handler = new HMocker();
        handler.setExpression(booleanExpression);
        this.handlers.push(handler);
        return handler;
    }

    call(url, data){
        for(let i = 0; i < this.handlers.length; i += 1){
            let mh = this.handlers[i];
            if(mh.expression(url, data)){
                return mh.handler(url, data);
            }
        }
        return new HMocker(() => false).handler(url, data);
    }

}

function configure(routerMocker){

    routerMocker.when((url, data) => {
        return url.includes('account/login');
    }).do((url, data) => {
        console.log( url, data);
        return arranger.entity('users').getAll()
        .find(u => u.username === data.username && u.password === data.password);
    });

    routerMocker.when((url, data) => {
        return url.includes('goals/userGoals');
    }).do((url, data) => {
        return arranger.entity('goals').getAll();       
    });

    routerMocker.when((url, data) => {
        return url.includes('goals/create');
    }).do((url, data) => {
        return arranger.entity('goals').add(data);
    });

    //goals/create

}

class HttpClientMock{

    constructor(){
        this.routeMocker = new RoutMocker();
        configure(this.routeMocker);
    }

    post(url, data){
        let rm = this.routeMocker;
        return new Promise((res, rej) => {
            let result = rm.call(url, data);           
            res(result);
        });
    }

}

export {HttpClientMock};

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AnswerWaitTimer from './AnswerWaitTimer'

class AnswerWaitTimerContainer extends Component{
    constructor(props){
        super(props);
        this.timerId = 0;
    }

    componentDidMount(){
        this.timerId =
            setTimeout( () => {
                console.log('Wapas bhej rahe');
                const id = localStorage.getItem('qId');
                this.props.history.replace(`/quiz/${id}`);
            }, 5000)
    }

    componentWillUnmount(){
        clearTimeout(this.timerId);
    }

    render(){
        return(
            <div>
                <AnswerWaitTimer waitTime={5}/>
            </div>
        )
    }

}

export default withRouter(AnswerWaitTimerContainer);

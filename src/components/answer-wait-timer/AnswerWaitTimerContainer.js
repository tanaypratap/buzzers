import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import AnswerWaitTimer from './AnswerWaitTimer'

class AnswerWaitTimerContainer extends Component{
    constructor(props){
        super(props);
        this.timerId = 0;
        this.state = {
            remUsers: 0
        }
    }

    componentDidMount(){
        const remUsers = localStorage.getItem('remUsers') || 0;
        this.setState({
            remUsers
        });
        this.timerId = 
            setTimeout( () => {
                console.log('Wapas bhej rahe');
                const id = localStorage.getItem('qId');
                this.props.history.replace(`/quiz/${id}`);
            }, 3000)
    }

    componentWillUnmount(){
        clearTimeout(this.timerId);
    }

    render(){
        return(
            <div>
                <AnswerWaitTimer waitTime={5} remainingUsers={this.state.remUsers}/>
            </div>
        )
    }

}

export default withRouter(AnswerWaitTimerContainer);

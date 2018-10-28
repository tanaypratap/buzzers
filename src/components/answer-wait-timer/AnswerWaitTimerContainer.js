import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class AnswerWaitTimerContainer extends Component{
    constructor(props){
        super(props);
        this.timerId = 0;
        this.state = {}
    }

    componentDidMount(){
        const remUsers = localStorage.getItem('remUsers');
        this.setState({
            remUsers
        });
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
                <h2>Hello There</h2>
            </div>
        )
    }

}

export default withRouter(AnswerWaitTimerContainer);

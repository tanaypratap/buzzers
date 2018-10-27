import React, { Component } from 'react';

class PlayerStatus extends Component{
    render(){
        return(
            <div>
                <h3>Current Score {this.props.score}</h3>
            </div>
        )
    }
}

export default PlayerStatus;

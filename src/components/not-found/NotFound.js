import React from 'react'
import { withRouter } from 'react-router-dom'

const NotFound = () => (
    <div>
        <h1> It looks like you're lost somewhere. Try going home? </h1>
        <button onClick={() => this.props.history.push("/")}>Go Home</button>
    </div>
)

export default  withRouter(NotFound)
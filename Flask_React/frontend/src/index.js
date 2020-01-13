import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="center-align">
                    盒装一流弊<br/>
                    <span className="waves-effect waves-light btn">
                        <i className="material-icons right">cloud</i>您说的都对
                    </span>
                </h1>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'))
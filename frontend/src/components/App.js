import React from 'react';
import { Topbar } from './Topbar';
import { Main } from './Main';
import { TOKEN_KEY } from '../constants';
import '../styles/App.css';

// function App() {
//     return (
//         <div className="App">
//             <Topbar />
//             <Main />
//         </div>
//     );
// }

class App extends React.Component {
    state = {
        isLoggedIn: Boolean(localStorage.getItem(TOKEN_KEY)), //initial; Boolean() type convert; if string is not null, Boolean() is convert to true
    }

    handleLogin = (token) => {  //token is returned from login.js line 29, write token to local storage
        localStorage.setItem(TOKEN_KEY, token);
        this.setState({
            isLoggedIn: true,
        });
    }

    handleLogout = () => {
        localStorage.removeItem(TOKEN_KEY);
        this.setState({
            isLoggedIn: false,
        });
    }

    render() {
        return (
            <div className="App">
                <Topbar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
                <Main isLoggedIn={this.state.isLoggedIn} handleLogin={this.handleLogin} />
            </div>
        );
    }
}
export default App;

//login state should store in ancestor so app.js is top
//use class to keep state
//Topbar need to know logout state
//main need to know login state
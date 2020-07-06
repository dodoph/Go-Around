import React from 'react';
import { Register } from './Register';
import { Login } from './Login';
import { Home } from './Home';
import { Switch, Route, Redirect } from 'react-router-dom';
import '../styles/Main.css';

export function Main(props) {
    const getHome = () => {
        return props.isLoggedIn ? <Home /> : <Redirect to="/login" />;
    }

    const getLogin = () => {
        return props.isLoggedIn ? <Redirect to="/home" /> : <Login handleLogin={props.handleLogin} />;
    }

    const getRoot = () => {
        return props.isLoggedIn ? <Redirect to="/home" /> : <Redirect to="/login" />;
    }

    return (
        <div className="main">
            <Switch>
                <Route path="/login" render={getLogin} />
                <Route path="/register" component={Register} />
                <Route path="/home" render={getHome} />
                <Route render={getRoot} />
            </Switch>
        </div>
    );
}

//otherwise, router to login
//register is wrapped by route, so route can provide some special props for Register. So we can visit react dom object. check Register.js line 39
//when /home, it will dynamically deal. if it logined
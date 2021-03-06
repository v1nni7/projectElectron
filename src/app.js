import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

/* Screens */
import Home from './Screens/Home';
import Login from './Screens/Login';
import Config from './Screens/Config';
import Perfil from './Screens/Perfil';
import Categoria from './Screens/Category';

// Developers Screens

import DevMovies from './screens/Developer/DevMovies';
import DevUsers from './screens/Developer/DevUsers';

const App = () => {
    return (
        <HashRouter>
            <Switch>
                 <Route path="/home" component={Home} />
                <Route exact path="/" component={Login} />
                <Route path="/config" component={Config} />
                <Route path="/perfil" component={Perfil} />
                <Route path="/categoria" component={Categoria} /> 

                
                {/* <Route exact path="/" component={DevMovies}/>
                <Route path="/DevUsers" component={DevUsers}/> */}
            </Switch>
        </HashRouter>
    );
};

export default App;

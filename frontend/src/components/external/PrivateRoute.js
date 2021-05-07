import React, { useState, useEffect } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

// function PrivateRoute({ component: Component, ...rest }) {
//     const { isAuthenticated, logout } = rest;
//     return (
//         <Route
//             {...rest}
//             render={(props) =>
//                 isAuthenticated ? (
//                     <Component logout={logout} />
//                 ) : (
//                         <Redirect
//                             to={{
//                                 pathname: "/login",
//                                 state: { from: props.location }
//                             }}
//                         />
//                     )
//             }
//         />
//     );
// }

function PrivateRoute({ component: Component, ...rest }) {
    const [ currentUser, setCurrentUser ] = useState(null);
    const [ fetching, setFetching ] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('/api/current_user');
                if(fetching) {
                    const user = await res.json();
                    setCurrentUser(user);
                }
                setFetching(false);
            } catch {
                console.log('nema korisnika');
            }
        }
        fetchUser();    
    }, []);
    
    return (
        <div>
            <Route
                { ...rest } 
                render={ () => { if (fetching && currentUser === null) return <h1>Fetching...</h1>} }/>
            <Route
                { ...rest } 
                render={ () => { if (currentUser && !fetching) return <Component user={currentUser} />} }/>
            <Route
                { ...rest } 
                render={ () => { if (!currentUser && !fetching) return <Redirect to="/login" />} }/>
        </div>
    );
}

export default PrivateRoute;
import React, { useState, useEffect } from 'react';
import {
    Route,
    Redirect
} from 'react-router-dom';

function PrivateRoute({ component: Component, ...rest }) {
    const { isAuthenticated, logout } = rest;

//     const [currentUser, setCurrentUser] = useState(null);

//   useEffect(() => {
//     fetchUser();
//   }, []);

//   useEffect(() => {
//     console.log(currentUser);
//   }, [currentUser]);
   
  
//   const fetchUser = async () => {
//     const res = await fetch('/api/current_user');
//     const user = await res.json();
//     setCurrentUser(user);
//   }
    
    return (
        // <Route
        //     {...rest}
        //     render={(props) =>
        //         isAuthenticated ? (
        //             <Component logout={logout} />
        //         ) : (
        //                 <Redirect
        //                     to={{
        //                         pathname: "/login",
        //                         state: { from: props.location }
        //                     }}
        //                 />
        //             )
        //     }
        // />
        <Route
            {...rest}
            render={(props) => <Component logout={logout} /> }
        />
    );
}

export default PrivateRoute;
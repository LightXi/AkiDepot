import React from "react";
import Auth from "./Auth";
import { Route, Redirect } from "react-router-dom";

function IndexRoute({ children, ...rest }) {
    return (
        <Route
            {...rest}
            render={({ location }) =>
                Auth.Check(rest.isLogin) ? (
                    <Redirect
                        to={{
                            pathname: "/home",
                        }}
                    />
                ) : ( children )
            }
        />
    );
}

export default IndexRoute;

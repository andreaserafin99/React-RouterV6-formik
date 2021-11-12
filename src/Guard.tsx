import React from 'react';
import {Navigate, useLocation, useNavigate} from "react-router-dom";
interface GuardProps {
    redirectTo : string,
    children?: React.ReactNode,
}
export const Guard: React.FC<GuardProps> = ({children, redirectTo}) => {
    let loggedUser = localStorage.getItem('user');
    let location = useLocation();

    function isLogged(){

        if (loggedUser === undefined || loggedUser === null) {
            return false
        } else {
            return true
        }
    }

    return isLogged() ? <>{children}</> : <Navigate to={redirectTo} />
};

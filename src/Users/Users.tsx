import React, {useEffect, useState} from 'react';
import axios, {AxiosResponse} from "axios";
import {User} from "../models/models";
import {Card, CardImg, Image} from "react-bootstrap";
import {map} from "react-bootstrap/ElementChildren";

export const Users: React.FC = () => {
    let [user, setUser] = useState<User>({});
    useEffect(()=>{
        let loggedUser = localStorage.getItem('user');
        if (loggedUser != null) {
            setUser(user = JSON.parse(loggedUser));
        }
    }, [])

    function setView(){
        if(user != null){
            return (
                        <Card>
                            <Card.Header>{user.first_name} {user.last_name}</Card.Header>
                            <Card.Body>
                                <Image src={user.profile_image} roundedCircle={true} style={{width: '80px'}} />
                                {user.email}
                            </Card.Body>
                        </Card>
                    )
        }
    }
    return (
        <>
            {setView()}
        </>
    )
};

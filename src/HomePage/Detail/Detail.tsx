import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {Post, User} from "../../models/models";
import axios, {AxiosResponse} from "axios";
import {Button, Card} from "react-bootstrap";

export const Detail: React.FC = () => {
    let currentId = useParams();
    let navigate = useNavigate();
    let [currentPost, setCurrentPost] = useState<Post>({})
    let [currentUser, setCurrentUser] = useState<User>({})

    useEffect(()=> {
        axios.get('http://localhost:3001/posts/'+currentId.id).then((data:AxiosResponse<Post>)=>{
            setCurrentPost(currentPost = data.data);
            axios.get('http://localhost:3001/users/'+currentPost.userId).then((response:AxiosResponse<User>)=>{
                setCurrentUser(currentUser = response.data);
            });
        });
    },[])

    return <div>
        <Card>
            <Card.Header>
                <Card.Img src={currentUser.profile_image} style={{width: '80px'}} />
                {currentUser.email}
            </Card.Header>
            <Card.Body>
                <Card.Title>{currentPost.title}</Card.Title>
                <Card.Text>{currentPost.body}</Card.Text>
            </Card.Body>
        </Card>

        <Button variant='outline-danger' onClick={()=>{
            axios.delete('http://localhost:3001/posts/'+currentId.id).then(()=>{
                navigate('/post');
            })
        }}>DELETE</Button>
    </div>
};

import React, {Component, useEffect, useState} from 'react';
import './HomePage.css'
import {Button, Card, Col, Row} from "react-bootstrap";
import {Post, User} from "../models/models";
import CardHeader from "react-bootstrap/CardHeader";
import axios, {AxiosResponse} from "axios";
import {useNavigate} from "react-router-dom";

function HomePage (){

    let [userList, setUserList] = useState<User[]>([])
    let [postList, setPostList] = useState<Post[]>([])
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/users').then((data: AxiosResponse<User[]>) => {
            setUserList(userList = data.data);
        })
        axios.get('http://localhost:3001/posts').then((response:AxiosResponse<Post[]>) => {
            setPostList(postList = response.data.reverse());
            console.log(postList)
        })
    },[]);

    return (
      <Row>
          <h1 className='title'>
              All our posts
          </h1>
          {
              postList.map((post) => (
                  <Col lg={{ span: 3, offset: 2 }}>
                      <Card className='post-card'>
                          <Card.Header className='post-header'>
                              <div>
                                  {post.title}
                              </div>
                              <div>
                                  <Button className='primary' onClick={()=>{
                                      if(post.id !== undefined){
                                          navigate((post.id).toString());
                                      } else {
                                          console.log('Obj undefined');
                                      }
                                    }
                                  }> Detail </Button>
                              </div>
                          </Card.Header>
                          <Card.Body>

                              <Card.Text>
                                  {post.body}
                              </Card.Text>
                          </Card.Body>
                          <Card.Footer>
                              <div>{
                                  (userList.find( ({ id }) => id === post.userId))?.email
                              }</div>
                          </Card.Footer>
                      </Card>
                  </Col>
              ))
          }
      </Row>
  )
}
export default HomePage;

import React, {useState} from 'react';
import {Post, User} from "../models/models";
import {Alert, Button, Card, Col, Container, Form, Row} from "react-bootstrap";
import {Formik, FormikHelpers, FormikValues} from "formik";
import CardHeader from "react-bootstrap/CardHeader";
import axios, {Axios} from "axios";

function InsertPost (props: any){

    let [newPost,setNewPost] = useState<Post>({});


    return (
        <Container fluid>
            <Row>
                <Formik
                    initialValues={{
                        title:'',
                        body:''
                    }}
                    onSubmit={(
                        data: Partial<Post>
                    ) => {
                            let loggedUser = localStorage.getItem('user');
                            let id = undefined;
                        console.log(loggedUser);
                        if (loggedUser != null) {
                                id = JSON.parse(loggedUser).id;
                            }

                            setNewPost( newPost = {
                                userId: id,
                                body: data.body,
                                title: data.title
                            })

                        axios.post('http://localhost:3001/posts',newPost).then(()=>{
                            window.location.reload();
                        })

                        }
                    }
                >
                    {
                        ({values, handleChange, handleSubmit})=> (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Post Title</Form.Label>
                                    <Form.Control type="input" placeholder="Enter Title" id='title' value={values.title} onChange={handleChange} />
                                    <Form.Text className="text-muted">
                                        Enter your email to sign in to site
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>Content</Form.Label>
                                    <Form.Control type="text-area" placeholder="Enter Content" id='body' value={values.body} onChange={handleChange} />
                                    <Form.Text className="text-muted">
                                        Insert the body of your post
                                    </Form.Text>
                                </Form.Group>

                                <Button variant="primary" type="submit"> Create </Button>
                            </Form>
                        )
                    }
                </Formik>
            </Row>

        </Container>
    )
}
export default InsertPost;

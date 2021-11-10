import React, {useEffect, useState} from 'react';
import {Alert, Button, Container, Form, FormControl, Row} from "react-bootstrap";
import axios, {AxiosResponse} from "axios";
import {User} from "../models/models";
import {Formik, FormikHelpers, FormikValues} from "formik";
import {Navigate, useNavigate} from "react-router-dom";

export const Login: React.FC = () => {
    let [userList, setUserList] = useState<User[]>([])
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3001/users').then((data: AxiosResponse<User[]>) => {
            setUserList(userList = data.data);
        })
    },[]);


    let [showAlert, setShowAlert] = useState<boolean>(false)

    return (
        <Container>
            <Row>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={(
                        data: Partial<User>
                    ) => {

                        userList.find(user => {
                            if(user.email == data.email && user.password == data.password ) {
                                setShowAlert(showAlert = false);
                                localStorage.setItem('user',JSON.stringify(user));
                                navigate('post');
                            } else {
                                setShowAlert(showAlert = true);
                                console.log('not logged');

                            }
                        });

                    }}
                >
                    {
                        ({values, handleChange, handleSubmit})=> (
                            <Form onSubmit={handleSubmit}>
                                <Alert dismissible={true} show={showAlert} variant='danger'>
                                    email or password incorrect
                                </Alert>
                                <Form.Group className="mb-3" >
                                    <Form.Label>Email address</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" id='email' value={values.email} onChange={handleChange} />
                                    <Form.Text className="text-muted">
                                        Enter your email to sign in to site
                                    </Form.Text>
                                </Form.Group>

                                <Form.Group className="mb-3">
                                    <Form.Label>password</Form.Label>
                                    <Form.Control type="password" placeholder="Enter Password" id='password' value={values.password} onChange={handleChange} />
                                    <Form.Text className="text-muted">
                                        Your password is hided
                                    </Form.Text>
                                </Form.Group>

                                <Button variant="primary" type="submit"> Login </Button>
                            </Form>
                        )
                    }
                </Formik>
            </Row>
        </Container>
    )
};

import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Post} from "./models/models";
import {render} from "react-dom";
import axios from "axios";
import HomePage from "./HomePage/HomePage";
import {BrowserRouter, Link, Outlet, Route, Routes, useLocation} from "react-router-dom";
import InsertPost from "./InsertPost/InsertPost";
import * as path from "path";
import {Users} from "./Users/Users";
import {Login} from "./Login/Login";
import {Detail} from "./HomePage/Detail/Detail";
import {Button} from "react-bootstrap";
import {Private} from "./private/Private";
import {Guard} from "./Guard";

interface AppProps {}
interface AppState {
  allPosts: Post[];
}

class App extends Component<AppProps, AppState> {
  constructor(props: AppProps | Readonly<AppProps>) {
    super(props);
    this.state = {
      allPosts: [],
    };
  }



  render() {

    return(

          <BrowserRouter>

            <Link to='post'>Posts</Link>
            -
            <Link to='insert'>Insert</Link>
            -
            <Link to='users'>Users</Link>
            -
            <Link to='private'>Private</Link>
            -
            <Link to='' onClick={()=>{
                localStorage.removeItem('user');
            }}>LOG OUT</Link>
            <hr />
            <Routes>
                <Route path="/" element={
                        <Login />
                }/>
                <Route path="post" element={

                    <Guard redirectTo='/'>
                        <HomePage />
                    </Guard>
                } />
                    {/*<Route path=":id" element={<Detail />} />*/}
                    {/*<Route index element={this.view()} />*/}
                {/*</Route>*/}
                <Route path="post/:id" element={
                    <Guard redirectTo='/'>
                        <Detail />
                    </Guard>
                } />
                <Route path="insert" element={
                    <Guard redirectTo='/'>
                        <InsertPost />
                    </Guard>
                } />
                <Route path="users" element={
                    <Guard redirectTo='/'>
                        <Users />
                    </Guard>
                } />
                <Route path="private" element={
                    <Guard redirectTo='/'>
                        <Private />
                    </Guard>
                } />
            </Routes>
          </BrowserRouter>
    )
  }
}

export default App

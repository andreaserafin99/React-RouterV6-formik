import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import {Post} from "./models/models";
import {render} from "react-dom";
import axios from "axios";
import HomePage from "./HomePage/HomePage";
import {BrowserRouter, Link, Outlet, Route, Routes} from "react-router-dom";
import InsertPost from "./InsertPost/InsertPost";
import * as path from "path";
import {Users} from "./Users/Users";
import {Login} from "./Login/Login";
import {Detail} from "./HomePage/Detail/Detail";
import {Button} from "react-bootstrap";

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
            <Link to='' onClick={()=>{
                localStorage.removeItem('user');
            }}>LOG OUT</Link>
            <hr />
            <Routes>
                <Route path="/" element={<Login />}/>
                <Route path="post" element={<HomePage />} />
                    {/*<Route path=":id" element={<Detail />} />*/}
                    {/*<Route index element={this.view()} />*/}
                {/*</Route>*/}
                <Route path="post/:id" element={<Detail />} />
                <Route path="insert" element={<InsertPost />} />
                <Route path="users" element={<Users />} />
            </Routes>
          </BrowserRouter>
    )
  }
}

export default App

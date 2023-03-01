import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, Login, AddPost} from "./pages";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound/NotFound";
import React, {useState} from "react";
import {useQuery} from "react-query";
import {authMe} from "./services/services";
import {User} from "./types/types";

export const initialUser = {
    _id : '',
    fullName : '',
    email : '',
    password : '',
    avatarUrl : '',
    token : ''
}

function App() {
    const [isAuth, setIsAuth] = useState(!!window.localStorage.getItem('token'));
    const [user, setUser] = useState(initialUser);
    const {} = useQuery({
        queryFn: () => authMe(),
        queryKey: ['auth'],
        onSuccess: (data: User) => {
            setUser(data)
        },
        onError: (error) => {
            console.log('test')
        },
        retry: false
    })
    return (
        <>
            <Header isAuth={isAuth} setIsAuth={setIsAuth} setUser={setUser}/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home user={user}/>}/>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                    <Route path="/posts/create" element={<AddPost isAuth={isAuth}/>}/>
                    <Route path="/login" element={<Login setState={setIsAuth} setUser={setUser}/>}/>
                    <Route path="/register" element={<Registration setState={setIsAuth} setUser={setUser}/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;

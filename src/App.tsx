import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound/NotFound";
import React, {useEffect, useState} from "react";
import {useQuery} from "react-query";
import {authMe} from "./services/services";
import {User} from "./types/types";

function App() {
    const [isAuth, setIsAuth] = useState(!!window.localStorage.getItem('token'));
    const {} = useQuery({
        queryFn: () => authMe(),
        queryKey: ['auth'],
        onSuccess: (data: User) => {
            console.log(data)
        },
        retry: false
    })
    return (
        <>
            <Header isAuth={isAuth} setIsAuth={setIsAuth}/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/posts/:id" element={<FullPost/>}/>
                    {/*<AddPost />*/}
                    <Route path="/login" element={<Login setState={setIsAuth}/>}/>
                    <Route path="/register" element={<Registration/>}/>
                    <Route path="*" element={<NotFound/>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;

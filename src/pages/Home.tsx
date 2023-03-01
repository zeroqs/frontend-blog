import React, {FC, ReactElement} from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {useQuery} from "react-query";

import {fetchPosts} from "../services/services";
import Post from "../components/Post";


export const Home = ({user}) => {
    const {data, isLoading, isError} = useQuery({
        queryFn: () => fetchPosts(),
        queryKey: ['posts'],
    })
    if (isError) return 'Error'
    return (
        <>
            <Tabs style={{marginBottom: 15}} value={0} aria-label="basic tabs example">
                <Tab label="Новые"/>
                <Tab label="Популярные"/>
            </Tabs>
            <Grid container spacing={4}>
                <Grid xs={8} item>
                    {data && data.map((item) => (
                        <Post
                            _id={item._id}
                            key={item._id}
                            title={item.title}
                            createdAt={'12 июня 2022 г.'}
                            imageUrl={item.imageURL ? item.imageURL : ''}
                            user={item.user}
                            tags={item.tags}
                            viewsCount={item.viewsCount}
                            commentsCount={item.viewsCount}
                            isEditable = {user._id === item.user._id}
                            isLoading={isLoading}
                        />
                    ))
                    }
                </Grid>
            </Grid>
        </>
    );
};

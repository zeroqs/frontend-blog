import React from "react";

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Grid from '@mui/material/Grid';

import {Post,TagsBlock,CommentsBlock} from '../components';
import {useQuery} from "react-query";

import {fetchPosts} from "../services/posts";

export const Home = () => {

    const {data, isLoading, isError} = useQuery({
        queryFn: () => fetchPosts(),
        queryKey: ['posts']
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
                            imageUrl={item.imageURL}
                            user={{
                                avatarUrl: 'https://res.cloudinary.com/practicaldev/image/fetch/s--uigxYVRB--/c_fill,f_auto,fl_progressive,h_50,q_auto,w_50/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/187971/a5359a24-b652-46be-8898-2c5df32aa6e0.png',
                                fullName: 'Keff',
                            }}
                            viewsCount={item.viewsCount}
                            commentsCount={item.viewsCount}
                            tags={item.tags}
                            isEditable
                            isLoading={isLoading}
                        />
                        ))}
                </Grid>
                <Grid xs={4} item>
                    <TagsBlock items={['react', 'typescript', 'заметки']} isLoading={false}/>
                    <CommentsBlock
                        items={[
                            {
                                user: {
                                    id: 'wrtij',
                                    fullName: 'Вася Пупкин',
                                    avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                                },
                                text: 'Это тестовый комментарий',
                            },
                            {
                                user: {
                                    id: 'fhdfhjghjk',
                                    fullName: 'Иван Иванов',
                                    avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                                },
                                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
                            },
                        ]}
                        />
                </Grid>
            </Grid>
        </>
    );
};

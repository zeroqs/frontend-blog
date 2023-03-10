import React from "react";

import {useParams} from "react-router-dom";
import {useQuery} from "react-query";
import {fetchByPost} from "../services/services";
import Post from "../components/Post";

export const FullPost = () => {
  let { id } = useParams();
  const {data, isLoading, isError} = useQuery({
    queryFn: () => fetchByPost(`posts/${id}`),
    queryKey: ['post']
  })
  return (
    <>
      {
        isLoading ?
        <>
          <Post
            isLoading={true}
          />
        </>
          :
          <>
            {data.map(item =>
              <>
                <Post
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl ? item.imageUrl : '' }
                  user={item.user}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={item.tags}
                  isFullPost
                >
                  <p>
                    {item.text}
                  </p>
                </Post>
              </>
            )}
          </>
      }
    </>
  );
};

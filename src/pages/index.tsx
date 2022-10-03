import React, { useEffect, useState } from "react";
import { Container } from "@material-ui/core";
import { API } from "aws-amplify";
import { listPosts } from "../graphql/queries";
import { ListPostsQuery, Post } from "../API";
import PostPreview from "../components/PostPreview";

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPostsFromApi = async (): Promise<Post[]> => {
      const allPosts = (await API.graphql({ query: listPosts })) as {
        data: ListPostsQuery;
        errors: any[];
      };

      if (allPosts.data) {
        setPosts(allPosts.data.listPosts.items as Post[]);
        return allPosts.data.listPosts.items as Post[];
      } else {
        throw new Error("Could not get posts");
      }
    };

    fetchPostsFromApi();
  }, []);

  return (
    <Container maxWidth="md">
      {posts.map((post) => (
        <PostPreview key={post.id} post={post} />
      ))}
    </Container>
  );
}

// Get all the posts on the server-side
// Since all users can read posts in our schema login
// we can use the API Key Authorization method

// So we'll call some code to access our GraphQL API on the serverside
// Pass it to our function as props
// Render the posts on the home page to look like reddit posts

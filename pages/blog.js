import { gql } from "@apollo/client";
import { client } from "../lib/apolloClient";
import PostCard from "../components/PostCard";

const GET_POSTS = gql`
  query getPosts {
    posts(first: 18, after: null) {
      nodes {
        databaseId
        uri
        title
      }
    }
  }
`;

export default function Blog({ posts }) {
  return (
    <>
      <h1>Blog</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.databaseId}>
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </>
  );
}

export async function getStaticProps() {
  const response = await client.query({
    query: GET_POSTS,
  });

  return {
    props: {
      posts: response.data.posts.nodes,
    },
  };
}

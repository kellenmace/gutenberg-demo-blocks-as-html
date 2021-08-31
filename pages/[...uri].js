import { gql } from "@apollo/client";
import "@wordpress/block-library/build-style/common.css";
import "@wordpress/block-library/build-style/style.css";
import "@wordpress/block-library/build-style/theme.css";
import Layout from "../components/Layout";
import { client } from "../lib/apolloClient";
import parseHtml from "../lib/parser";

export default function SinglePost({ post }) {
  const { title, content } = post;

  return (
    <Layout>
      <article className="blog-post">
        <h1>{title}</h1>
        <div>{parseHtml(content)}</div>
      </article>
    </Layout>
  );
}

export function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking",
  };
}

const GET_POST = gql`
  query getPost($uri: ID!) {
    post(id: $uri, idType: URI) {
      title
      content
    }
  }
`;

export async function getStaticProps(context) {
  const uri = context.params.uri.join("/");
  const response = await client.query({
    query: GET_POST,
    variables: { uri },
  });

  const post = response?.data?.post;

  if (!post) {
    return { notFound: true };
  }

  return {
    props: { post },
    revalidate: 120,
  };
}

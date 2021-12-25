import { gql } from "@apollo/client";
import client from "../apollo-client";
import Navigation from "../components/Navigation/Navigation";

export async function getStaticProps() {
    const { data } = await client.query({
      query: gql`
        query Users {
          users {
              id
          }
        }
      `,
    });

    return {
      props: {
        users: data.users,
      },
   };
}


export default function Home({ users }) {
    return (
        <>
        <Navigation />
        {users.length}
        </>
    );
}
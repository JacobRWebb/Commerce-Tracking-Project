import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { FunctionComponent } from "react";
import EntryList from "../components/entry/EntryContainer";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";
import { API_DOMAIN } from "../util/constants";

export interface IHome {
  user?: {
    id: string;
    username: string;
    role: string;
  };
}

const Home: FunctionComponent<IHome> = ({ user }) => {
  return (
    <Layout>
      <Navbar />
      <EntryList />
    </Layout>
  );
};

export const getServerSideProps = async ({
  req,
  res,
}: GetServerSidePropsContext): Promise<GetServerSidePropsResult<IHome>> => {
  const data = await fetch(`${API_DOMAIN}/user/check`, {
    method: "POST",
    credentials: "include",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ token: req.cookies.token || "" }),
  }).then((result) => {
    if (result.status === 200 || result.status === 404) {
      return result.json();
    }
  });

  if (data) {
    if (data.info) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    } else {
      return {
        props: {
          user: data,
        },
      };
    }
  }

  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default Home;

import { serialize } from "cookie";
import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { FunctionComponent } from "react";

const Logout: FunctionComponent = () => {
  return <div></div>;
};

export const getServerSideProps = ({
  req,
  res,
}: GetServerSidePropsContext): GetServerSidePropsResult<{}> => {
  res.setHeader("Set-Cookie", serialize("token", "", { path: "/", maxAge: 0 }));
  return {
    redirect: {
      destination: "/login",
      permanent: false,
    },
  };
};

export default Logout;

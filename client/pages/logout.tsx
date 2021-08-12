import { serialize } from "cookie";
import { actionCreators, wrapper } from "features";
import { FunctionComponent } from "react";

const Logout: FunctionComponent = () => {
  return <div></div>;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, res }) => {
      res.setHeader(
        "Set-Cookie",
        serialize("token", "", {
          path: "/",
          maxAge: 0,
          domain: "xodius.io",
          secure: true,
        })
      );

      await store.dispatch(actionCreators.AuthActions.logout());

      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }
);

export default Logout;

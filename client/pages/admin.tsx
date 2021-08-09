import { actionCreators, RootState, wrapper } from "features";
import { FunctionComponent } from "react";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";

const Admin: FunctionComponent = () => {
  return (
    <Layout>
      <Navbar />
    </Layout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      let token = req.cookies.token;
      await store.dispatch(actionCreators.AuthActions.checkToken({ token }));
      let state: RootState = store.getState();

      if (state.auth.user === null) {
        return {
          redirect: {
            permanent: false,
            destination: "/login",
          },
        };
      }

      await store.dispatch(
        actionCreators.EntriesActions.fetchEntries(state.filter)
      );

      return {
        props: {},
      };
    }
);

export default Admin;

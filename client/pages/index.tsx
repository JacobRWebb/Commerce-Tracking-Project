import { actionCreators } from "features";
import { RootState, wrapper } from "features/store";
import { FunctionComponent } from "react";
import EntryList from "../components/entry/ListContainer";
import Layout from "../components/Layout";
import Navbar from "../components/navbar/Navbar";

const Home: FunctionComponent = () => {
  return (
    <>
      <Layout>
        <Navbar />
        <div className="content">
          <EntryList />
        </div>
      </Layout>
    </>
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
      state = store.getState();
      await store.dispatch(
        actionCreators.EntriesActions.fetchEntries(
          state.filter,
          state.auth.user.token
        )
      );

      return {
        props: {},
      };
    }
);

export default Home;

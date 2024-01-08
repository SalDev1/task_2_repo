import type { NextPage } from "next";
import HomeLayout from "@containers/home/HomeLayout";
import Layout from "../components/Layout";
import DataProvider from "../containers/home/DataProvider";
import IndexProvider from "@src/containers/home/IndexProvider";

const Home: NextPage = () => {
  return (
    <Layout title="Settings">
      <IndexProvider>
        <DataProvider>
          <HomeLayout />
        </DataProvider>
      </IndexProvider>
    </Layout>
  );
};

export default Home;

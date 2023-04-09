
import Head from "next/head";
import { HomeView } from "../views";

const Home = (props) => {
  return (
    <div>
      <Head>
        <title>5ire X Defi</title>
        <meta
          name="description"
          content="payments App"
        />
      </Head>
      <HomeView />
    </div>
  );
};

export default Home;

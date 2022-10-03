import type { NextPage } from "next";
import { useUser } from "../context/AuthContext";

const Home: NextPage = () => {
  const { user } = useUser();
  console.log("the user is", user);
  return <div>hello world</div>;
};

export default Home;

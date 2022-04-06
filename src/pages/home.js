import { Stack } from "@mui/material";
import Feed from "../components/Feed";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <>
      <Stack
        component={motion.div}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        gap={6}
      >
        <Feed />
      </Stack>
    </>
  );
};

export default Home;

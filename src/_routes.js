import { lazy } from "react";
import PageWithSuspense from "./components/PageWithSuspense";

const Home = lazy(() => import("./pages/home"));
const SingleAnime = lazy(() => import("./pages/singleAnime"));

const routes = [
  {
    name: "Home",
    path: "/",
    component: (
      <PageWithSuspense>
        <Home />
      </PageWithSuspense>
    ),
  },
  {
    name: "Single Anime",
    path: "/anime/:id",
    component: (
      <PageWithSuspense>
        <SingleAnime />
      </PageWithSuspense>
    ),
  },
];

export default routes;

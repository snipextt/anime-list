import { Suspense } from "react";

const PageWithSuspense = ({ children }) => {
  return <Suspense>{children}</Suspense>;
};

export default PageWithSuspense;

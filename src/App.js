import { Routes, Route, useLocation } from "react-router-dom";
import { useState } from "react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import themes from "./_theme";
import routes from "./_routes";
import Header from "./components/Header";
import { AnimatePresence } from "framer-motion";

function App() {
  const [currentTheme, setCurrentTheme] = useState(0);
  const location = useLocation();
  return (
    <ThemeProvider theme={themes[currentTheme]}>
      <CssBaseline />
      <Header />
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          {routes.map((route, i) => (
            <Route key={i} path={route.path} element={route.component} />
          ))}
        </Routes>
      </AnimatePresence>
    </ThemeProvider>
  );
}

export default App;

import { Box, Divider, Grid, GridItem, Show } from "@chakra-ui/react";
import ToolBar from "./components/ToolBar";
import ActivityBar from "./components/ActivityBar";
import Explorer from "./components/Explorer";
import Footer from "./components/Footer";
import TabsBar from "./components/TabsBar";
import { useState, lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

// Lazy load page components
const Home = lazy(() => import("./pages/Home"));
const README = lazy(() => import("./pages/README"));
const Projects = lazy(() => import("./pages/Projects"));
const Contact = lazy(() => import("./pages/Contact"));
const Theme = lazy(() => import("./pages/Theme"));

function App() {
  const [selectedPage, setSelectedPage] = useState("home.js");
  return (
    <Grid
      templateAreas={{
        base: `"tool tool" "activity main" "footer footer"`,
        lg: `"tool tool tool" "activity explorer main" "footer footer footer"`,
      }}
      templateColumns={{
        base: "40px 1fr",
        lg: "70px 250px 1fr",
      }}
      templateRows="auto 1fr auto"
      height="100vh"
    >
      <GridItem area="tool" marginTop={2}>
        <ToolBar />
        <Divider orientation="horizontal" marginTop={1} />
      </GridItem>
      <GridItem area="activity" height="100%">
        <ActivityBar
          selectedPage={selectedPage}
          onSelectPage={setSelectedPage}
        />
      </GridItem>
      <Show above="lg">
        <GridItem area="explorer" height="100%">
          <Explorer
            selectedPage={selectedPage}
            onSelectPage={setSelectedPage}
          />
        </GridItem>
      </Show>
      <GridItem area="main" overflowX={"auto"}>
        <TabsBar selectedTab={selectedPage} onSelectTab={setSelectedPage} />
        <Box overflowY="auto" height="calc(100% - 40px)">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home setPage={setSelectedPage} />} />
              <Route
                path="/about"
                element={<README setPage={setSelectedPage} />}
              />
              <Route
                path="/projects"
                element={<Projects setPage={setSelectedPage} />}
              />
              <Route
                path="/contact"
                element={<Contact setPage={setSelectedPage} />}
              />
              <Route
                path="/theme"
                element={<Theme setPage={setSelectedPage} />}
              />
            </Routes>
          </Suspense>
        </Box>
      </GridItem>

      <GridItem area="footer" marginX="2px">
        <Divider orientation="horizontal" />
        <Footer />
      </GridItem>
    </Grid>
  );
}

export default App;

import Container from "@mui/material/Container";

import {Header} from "./components";
import {Home, FullPost, Registration, AddPost, Login} from "./pages";
import {Route, Routes} from "react-router-dom";
import {NotFound} from "./pages/NotFound/NotFound";

function App() {
  return (
    <>
      <Header/>
      <Container maxWidth="lg">
        <Routes>
          <Route path="/" element={<Home />}/>
          {/*<FullPost />*/}
          {/*<AddPost />*/}
          {/*<Login />*/}
          {/*<Registration />*/}
          {/*<Registration />*/}
          <Route path="*" element={<NotFound />}/>
        </Routes>
      </Container>
    </>
  );
}

export default App;

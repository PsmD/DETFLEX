import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components";
import theme from "./themes/theme";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import Navbar from "./components/Navbar";
import MovieMenu from "./routes/MovieMenu";
import Search from "./routes/Search";
import NotFound from "./routes/NotFound";
import MyPage from "./routes/Mypage";
import NoSearch from "./routes/NoSearch";

function App() {
  return (
    <RecoilRoot>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Routes>
            <Route path={"/"} element={<Home />} />
            <Route path={`/page/:menu`} element={<MovieMenu />} />
            <Route path={`/movie/:movieId`} element={<Detail />} />
            <Route path={`/search/:searchText`} element={<Search />} />
            <Route path={"/my_page"} element={<MyPage />} />
            <Route path="/404" element={<NotFound />} />
            <Route path="/nosearch/:searchText" element={<NoSearch />} />
            <Route path="*" element={<Navigate to="/404" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </RecoilRoot>
  );
}
export default App;

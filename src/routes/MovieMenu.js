import { useEffect, useState, useCallback } from "react";
import MovieCard from "../components/MovieCard";
import Loading from "../components/Loading";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { API_KEY, BASE_PATH, IMAGE_BASE_URL } from "../api";

const pagesPerList = 10;

const today = new Date();

const year = today.getFullYear();
const nextyear = today.getFullYear() + 1;
const month = ("0" + (today.getMonth() + 1)).slice(-2);
const prevmonth = ("0" + today.getMonth()).slice(-2);
const date = ("0" + today.getDate()).slice(-2);

const currentday = year + "-" + month + "-" + date;
const prevmonthday = year + "-" + prevmonth + "-" + date;
const nextyearday = nextyear + "-" + month + "-" + date;

function MovieMenu() {
  const { menu, page } = useParams();
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);

  const getMovies = useCallback(async () => {
    if (menu === "now_playing") {
      await axios
        .get(
          `${BASE_PATH}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${prevmonthday}&primary_release_date.lte=${currentday}&page=${currentPage}`
        )
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages);
          setLoading(false);
        });
    } else if (menu === "top_rated") {
      await axios
        .get(
          `${BASE_PATH}/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&vote_count.gte=150&page=${currentPage}`
        )
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages);
          setLoading(false);
        });
    } else if (menu === "popular") {
      await axios
        .get(`${BASE_PATH}/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${currentPage}`)
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages);
          setLoading(false);
        });
    } else if (menu === "upcoming") {
      await axios
        .get(
          `${BASE_PATH}/discover/movie?api_key=${API_KEY}&primary_release_date.gte=${currentday}&primary_release_date.lte=${nextyearday}&page=${currentPage}`
        )
        .then((res) => {
          setMovies(res.data.results);
          setTotalPages(res.data.total_pages);
          setLoading(false);
        });
    }
  }, [menu, currentPage]);

  const pageLogic = () => {
    let firstPaginationNumber = currentPage - (currentPage % pagesPerList) + 1;
    let lastPaginationNumber = currentPage - (currentPage % pagesPerList) + pagesPerList;
    if (lastPaginationNumber > totalPages) lastPaginationNumber = totalPages;
    return {
      firstPaginationNumber,
      lastPaginationNumber,
    };
  };

  const listNumbers = new Array();

  for (let i = pageLogic().firstPaginationNumber; i <= pageLogic().lastPaginationNumber; i++) {
    listNumbers.push(i);
  }

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    setCurrentPage(page);
    getMovies();
    return;
  }, [getMovies, page]);

  return (
    <Container>
      {loading ? (
        <Loading />
      ) : (
        <Movies>
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={`${IMAGE_BASE_URL}original${movie.poster_path}`}
              year={movie.release_date}
              vote_average={movie.vote_average}
            />
          ))}
        </Movies>
      )}
      <Footer>
        {loading
          ? null
          : listNumbers.map((lN) => {
              return (
                <Nums lN={lN} page={page} key={lN}>
                  <Link to={`/page/${menu}/${lN}`}>{lN}</Link>
                </Nums>
              );
            })}
      </Footer>
    </Container>
  );
}

export default MovieMenu;

const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: ${window.innerWidth - 1}px;
  min-height: ${window.innerHeight - 1}px;
`;

const Movies = styled.div`
  display: grid;
  place-items: center;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 5px;
  width: 90%;
  margin-top: 24vh;
`;

const Footer = styled.ul`
  display: flex;
  list-style: none;
  width: 30%;
  justify-content: space-around;
  margin-bottom: 10vh;
  margin-top: 3vh;
  align-items: center;
`;

const Nums = styled.li`
  font-size: 100%;
  text-shadow: 2px 2px #c7cdd4;
  transition: all 0.4s ease;
  text-align: center;
  pointer-events: ${(props) => props.lN == props.page && "none"};
  font-weight: ${(props) => props.lN == props.page && "bold"};
  zoom: ${(props) => props.lN == props.page && "1.3"};
  margin-bottom: ${(props) => props.lN == props.page && "0.9vh"};

  &:hover {
    transform: translateY(-3px);
  }
`;

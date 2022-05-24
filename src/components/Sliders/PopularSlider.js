import styled from "styled-components";
import { useState, useEffect } from "react";
import { IMAGE_BASE_URL } from "../../api";
import { Navigation } from "swiper";
import MovieCard from "../Cards/MovieCard";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function PopularSlider({ popularMovies }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const handleResize = () => {
    setWindowWidth(window.innerWidth);
  };
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <>
      <PopularTitle>
        <Link to={"/page/popular"}>Popular</Link>
      </PopularTitle>
      <PopularSwiper
        modules={[Navigation]}
        spaceBetween={0}
        slidesPerView={windowWidth > "768" ? 5 : 3}
        navigation={{ clickable: true }}
        loop={true}
      >
        {popularMovies &&
          popularMovies.slice(0, 10).map((popMovie) => (
            <SwiperSlide key={popMovie.id}>
              <MovieCard
                id={popMovie.id}
                title={popMovie.title}
                poster_path={`${IMAGE_BASE_URL}original${popMovie.poster_path}`}
                year={popMovie.release_date}
                vote_average={popMovie.vote_average}
              />
            </SwiperSlide>
          ))}
      </PopularSwiper>
    </>
  );
}

export default PopularSlider;

const PopularTitle = styled.div`
  margin: 5vh 0 5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 10vh;
  font-size: 50px;
  font-family: "Work Sans", sans-serif;
  text-shadow: 4px 4px #c7cdd4;
  a {
    transition: all 0.4s ease;
    &:hover {
      transform: translateY(-7px);
    }
  }
  @media ${({ theme }) => theme.device.tablet} {
    min-width: 100vw;
    min-height: 92vh;
  }
`;

const PopularSwiper = styled(Swiper)`
  width: 90vw;
  height: 100%;
  background-color: #eff3f7;

  .swiper-slide {
    display: flex;
    justify-content: center;
    margin-top: 12px;
  }

  .swiper-button-prev,
  .swiper-button-next {
    background-color: rgba(240, 240, 240, 0.2);
    background-position: center;
    border-radius: 5px;
    width: 35px;
    height: 70px;
    color: rgba(159, 159, 159, 0.7);
    transition: 0.4s;
    font-weight: bold;
    margin-top: -10vh;
  }

  .swiper-button-next:hover,
  .swiper-button-prev:hover {
    color: rgba(68, 68, 68);
    transform: scale(1.1);
    background-color: rgb(245, 245, 245);
    text-shadow: 2px 2px rgb(200, 200, 200);
    box-shadow: 0 4px 12px rgba(131, 131, 131, 0.7);
  }
`;

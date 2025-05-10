import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { loadMovieDetail } from "./api";
import { useParams, Link } from "react-router-dom";

const MovieDetailsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-content: center;
  padding: 16px;
`;

const ImgContainer = styled.div`
  width: 33.33%;
  flex-shrink: 0;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const DetailsContainer = styled.div`
  flex-grow: 1;
  margin-left: 2rem;
`;

const SectionTitle = styled.h3`
  margin: 0.5rem 0;
`;

const Overview = styled.div`
  max-height: 100px;
  overflow-y: scroll;
`;

const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const GenreItem = styled.div`
  padding: 0.5rem 1rem;
  background-color: #90cea1;
  margin-left: 1rem;
  color: white;
  border-radius: 5px;
  &:first-child {
    margin-left: 0;
  }
`;

const ProductionItem = styled.div`
  width: 30px;
  margin-right: 1rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function MovieDetails() {
  const [movie, setMovie] = useState(null);
  const params = useParams();
  useEffect(() => {
    loadMovieDetail(params.movieId).then((data) => {
      console.log("data", data);
      setMovie(data);
    });
  }, []);
  if (!movie) {
    return null;
  }

  return (
    <MovieDetailsContainer>
      <ImgContainer>
        <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} />
      </ImgContainer>
      <DetailsContainer>
        <h2>{movie.title}</h2>
        <br />
        <SectionTitle>Overview</SectionTitle>
        <Overview>{movie.overview}</Overview>
        <SectionTitle>Genres</SectionTitle>
        <Container>
          {movie.genres.map((genre) => (
            <GenreItem key={genre.id}>{genre.name}</GenreItem>
          ))}
        </Container>
        <SectionTitle>Rating</SectionTitle>
        <p>9.5</p>
        <SectionTitle>Production companies</SectionTitle>
        <Container>
          <ProductionItem>
            <img src="https://image.tmdb.org/t/p/w500/psjvYkjjgAPtS8utnFYDM8t8yi7.png" />
          </ProductionItem>
        </Container>
        <Link to="/">To home</Link>
      </DetailsContainer>
    </MovieDetailsContainer>
  );
}

import { useState } from "react";
import { request } from "./requests";

const Movies = ({ loading, error, search, data }) => {
  console.log(data);
  const [film, setFilm] = useState("");
  const [modal, setModal] = useState(false);
  const [wait, setWait] = useState(false);

  //Tar i mot event og title fra onclick på knappen
  const newMovie = (title) => {
    setWait(true);
    getResult(title);
  };

  //gjør et nytt api-kall med filmtittelelen knyttet til knappen som ble trykket
  const getResult = async (Title, Year) => {
    console.log(Title, Year);
    const getTitle = await request(
      /*Henter ut utvidet info om den spesifikke filmen*/
      `https://www.omdbapi.com/?apikey=a994c928&t=${Title}&y=${Year}&plot=full`
    );
    console.log(getTitle);
    setFilm(getTitle);
    setWait(false);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  return (
    <>
      {wait ? <p className="modal">Loading</p> : null}
      {modal ? (
        <section className="modal" onClick={closeModal}>
          <section className="inner-modal">
            <img
              alt={`Plakat fra filmen ${film.Title}`}
              className="modal-poster"
              src={film.Poster}
            />
            <h2>{film.Title}</h2>
            <p>Skuespillere: {film.Actors}</p>
            <p>Sjanger: {film.Genre}</p>
            <p>IMDB-rating: {film.imdbRating}</p>
            <p>Plot: {film.Plot}</p>
            <button className="onemovie2" type="button" onClick={closeModal}>
              Lukk
            </button>
          </section>
        </section>
      ) : null}
      <section className="movies">
        {loading ? <p>Loading</p> : null}
        {error ? <p>{error}</p> : null}
        {!error && data?.Search?.length > 0 ? (
          <div className="movies_wrapper">
            {data.Search.map((movie) => (
              <div className="movie_item" key={movie.imdbID}>
                <img
                  alt={`Plakat fra filmen ${movie.Title}`}
                  className="poster"
                  src={movie.Poster}
                  onClick={() => newMovie(movie.Title, movie.Year)}
                />
                <p> {movie.Title}</p>
                <p>Utgitt: {movie.Year}</p>
                <button
                  type="button"
                  className="onemovie"
                  onClick={() => newMovie(movie.Title, movie.Year)}
                >
                  Les mer om filmen
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </section>
    </>
  );
};

export default Movies;

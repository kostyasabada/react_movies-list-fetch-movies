import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './FindMovie.scss';
import { GetMovie } from '../../api/api';
import { MovieCard } from '../MovieCard';

export const FindMovie = ({ onAdd }) => {
  const [queryTitle, setTitle] = useState('');
  const [movieFromServer, setMovie] = useState('');
  const [showedError, setError] = useState(false);
  const { Title, Plot, Poster, imdbID } = movieFromServer;

  const foundMovie = () => {
    GetMovie(queryTitle)
      .then((movie) => {
        setMovie(movie);
        setError(movie.Error);
      });
  };

  const addMovie = () => {
    if (movieFromServer && Title) {
      onAdd(movieFromServer);
      setMovie('');
      setTitle('');
    }
  };

  return (
    <>
      <form
        className="find-movie"
      >
        <div className="field">
          <label className="label" htmlFor="movie-title">
            Movie title
          </label>

          <div className="control">
            <input
              type="text"
              id="movie-title"
              placeholder="Enter a title to search"
              className={`input ${showedError
                && `is-danger`
              }`}
              value={queryTitle}
              onChange={(event) => {
                setTitle(event.target.value);
                setError(false);
              }}
            />
          </div>

          {showedError && (
            <p className="help is-danger">
              Can&apos;t find a movie with such a title
            </p>
          )}
        </div>

        <div className="field is-grouped">
          <div className="control">
            <button
              type="button"
              className="button is-light"
              onClick={foundMovie}
            >
              Find a movie
            </button>
          </div>

          <div className="control">
            <button
              type="button"
              className="button is-primary"
              onClick={addMovie}
            >
              Add to the list
            </button>
          </div>
        </div>
      </form>

      {Title
      && (
        <div className="container">
          <h2 className="title">Preview</h2>
          <MovieCard
            title={Title}
            description={Plot}
            imgUrl={Poster}
            imdbUrl={`https://www.imdb.com/title/${imdbID}/`}
          />
        </div>
      )
      }
    </>
  );
};

FindMovie.propTypes = {
  onAdd: PropTypes.func.isRequired,
};

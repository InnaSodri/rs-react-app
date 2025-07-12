import React, { Component } from 'react';
import Card  from './Card';
import { Loading } from './Loading';
import { ErrorMessage } from './ErrorMessage';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  release_date: string;
  vote_average: number;
}

interface Props {
  movies: Movie[];
  loading: boolean;
  error: string | null;
}

export class Results extends Component<Props> {
  render() {
    const { movies, loading, error } = this.props;

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return <ErrorMessage message={error} />;
    }

    if (movies.length === 0) {
      return (
        <div>
          <p>No movies found.</p>
          <p>Try searching for a different movie title.</p>
        </div>
      );
    }

    return (
      <div>
        <h2>Search Results ({movies.length})</h2>
        <div>
          {movies.map((movie) => (
            <Card key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    );
  }
}

import { useState, useEffect } from 'react';

const KEY = '4f8058f2';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export function useMovie(query: string) {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    if (query.length < 3) {
      setMovies([]);
      setError('');
      return;
    }

    const controller = new AbortController();

    async function fetchMovie() {
      try {
        setIsLoading(true);
        setError('');
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=${KEY}&s=${query}`,
          { signal: controller.signal }
        );

        if (!res.ok) {
          throw new Error('Something went wrong with fetching movies');
        }

        const data = await res.json();
        if (data.Response === 'False') {
          throw new Error('Movie not found');
        }

        setMovies(data.Search);
        setError('');
      } catch (err: any) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'An unknown error occurred');
        }
      } finally {
        setIsLoading(false);
      }
    }

    fetchMovie();

    return () => {
      controller.abort();
    };
  }, [query]);

  return { movies, isLoading, error };
}

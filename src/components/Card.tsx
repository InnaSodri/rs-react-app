import React from 'react';
import { Star, Calendar } from 'lucide-react';

interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  vote_average: number;
  release_date: string | null;
}

interface Props {
  movie: Movie;
}

const Card: React.FC<Props> = ({ movie }) => {
  const getImageUrl = (posterPath: string | null): string => {
    return posterPath
      ? `https://image.tmdb.org/t/p/w500${posterPath}`
      : 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1325&auto=format&fit=crop&ixlib=rb-4.1.0';
  };

  const releaseYear = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : 'TBA';

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
      {/* Image */}
      <div className="aspect-[2/3] bg-gray-100">
        <img
          src={getImageUrl(movie.poster_path)}
          alt={`Poster of ${movie.title}`}
          loading="lazy"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <h3
          className="
            text-lg font-extrabold text-blue-700 mb-2 line-clamp-2
            hover:text-blue-900 cursor-pointer
            transition-colors duration-300
            drop-shadow-sm
          "
        >
          {movie.title}
        </h3>

        <p className="text-sm text-gray-600 mb-4 line-clamp-3">
          {movie.overview || 'No description available.'}
        </p>

        {/* Meta Info */}
        <div className="mt-auto flex justify-between items-center text-sm text-gray-700">
          <div className="flex items-center gap-1">
            <Calendar
              className="w-5 h-5"
              style={{ stroke: '#3b82f6' }} // Tailwind blue-500 hex
            />
            <span>{releaseYear}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star
              className="w-5 h-5"
              style={{ stroke: '#fbbf24' }} // Tailwind yellow-400 hex
            />
            <span>{movie.vote_average.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

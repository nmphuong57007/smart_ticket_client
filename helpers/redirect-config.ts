export const redirectConfig = {
  home: "/home",
  login: "/login",
  register: "/register",
  profile: "/user/profile",
  movieDetail: (movieId: number) => `/movie/${movieId}/detail`,
  movieShowing: "/movie/movie-showing",
  upcomingMovies: "/movie/upcoming-movies",
};

export const redirectConfig = {
  home: "/home",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  resetPassword: "/reset-password",
  changePassword: "/change-password",
  profile: "/user/profile",
  bookingHistory: "/user/booking-history",
  bookingHistoryDetail: (bookingId: number) => `/user/booking-history/${bookingId}`,
  movieDetail: (movieId: number) => `/movie/${movieId}/detail`,
  movieShowing: "/movie/movie-showing",
  upcomingMovies: "/movie/upcoming-movies",
  payment: "/payment",
  cinema: "/cinema",
  content: "/content",
};



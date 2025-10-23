import { id } from "date-fns/locale";

export const routes = {
  home: "/home",
  login: "/login",
  register: "/register",
  forgotPassword: "/forgot-password",
  movies: "/movies",
  cinemas: "/cinemas",
  moviesNowShowing: "/movies/now-showing",
  moviesComingSoon: "/movies/coming-soon",
  moviesSpecial: "/movies/special",
  about: "/about",
  contact: "/contact",
  careers: "/careers",
  privacyPolicy: "/privacy-policy",
  faq: "/faq",
  cinemasSpecialScreenings: "/cinemas/special-screenings",
  cart: "/cart",
  checkout: "/checkout",
  movieDetail: (id:number | string) => `/movies/detail/${id}`,
  combos: "/combos",
};

interface IPopularMovie {
  adult: boolean
  backdrop_path: string
  genre_ids: number[]
  id: number
  original_language: string
  original_title: string
  overview: string
  popularity: number
  poster_path: string
  release_date: Date
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

interface ICommentMovie {
  author: string
  author_details: AuthorDetails
  content: string
  created_at: Date
  id: string
  updated_at: Date
  url: string
}

interface AuthorDetails {
  name: string
  username: string
  avatar_path: string | null
  rating: null
}

interface IDetailMovie extends IPopularMovie {
  belongs_to_collection: null
  budget: number
  genres: IGenre[]
  homepage: string
  imdb_id: string
  production_companies: ProductionCompany[]
  production_countries: ProductionCountry[]
  revenue: number
  runtime: number
  spoken_languages: SpokenLanguage[]
  status: string
  tagline: string
}

interface IGenre {
  id: number
  name: string
}

interface ProductionCompany {
  id: number
  logo_path: null | string
  name: string
  origin_country: string
}

interface ProductionCountry {
  iso_3166_1: string
  name: string
}

interface SpokenLanguage {
  english_name: string
  iso_639_1: string
  name: string
}

interface IMovieSearch extends IPopularMovie {
  original_language: string
  original_title: string
}

export {
  IPopularMovie,
  ICommentMovie,
  IDetailMovie,
  IGenre,
  ProductionCompany,
  IMovieSearch
}

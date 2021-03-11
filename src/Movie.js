import Movies from "./Movies";

const Movie = ({ loading, error, search, data }) => {
  return <Movies loading={loading} search={search} error={error} data={data} />;
};

export default Movie;

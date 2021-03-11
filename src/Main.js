import { useEffect, useState } from "react";
import Movie from "./Movie";
import { request } from "./requests";
import Search from "./Search";

const Main = () => {
  const [search, setSearch] = useState("Star Wars");
  const [data, setData] = useState([""]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const getResult = async () => {
    setLoading(true);
    setError(null);
    const responseData = await request(
      /*Fikk ikke .env-løsningen til å fungere så har bare lagt url-en her*/
      `https://www.omdbapi.com/?apikey=a994c928&s=${search}&plot=full`
    );
    if (responseData.Error) {
      setError(responseData.Error);
    }
    setLoading(false);
    setData(responseData);
  };

  const sendRequest = (event) => {
    event.preventDefault();
    getResult();
  };

  useEffect(() => {
    getResult();
  }, []);

  return (
    <div>
      <h1>Filmdatabasen</h1>
      <Search search={search} sendRequest={sendRequest} setSearch={setSearch} />
      <Movie search={search} loading={loading} data={data} error={error} />
    </div>
  );
};

export default Main;

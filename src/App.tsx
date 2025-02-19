import { useState, useEffect } from "react";
import "./styles.css";
import useFetch from "./hooks/useFetch";

export default function App() {
  const { fetchingState, user, error } = useFetch();
  const [totalPages, setTotalPage] = useState(0);
  const [page, setPage] = useState(0);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (["PENDING", "FETCHING"].includes(fetchingState)) {
    return <div>..loading</div>;
  }

  const setPrev = () => {
    setPage((prev) => prev - 1);
  };

  const setNext = () => {
    setPage((prev) => prev + 1);
  };

  let splittedUser =
    user?.results.length > 0
      ? user?.results.slice(page * 10, page * 10 + 10)
      : [];

  return (
    <div className="App">
      <div>
        {splittedUser.length > 0
          ? splittedUser.map((user) => {
              const { name, location, login } = user;
              return (
                <div
                  key={login.uuid}
                  style={{ border: "1px solid black", marginBottom: "5px" }}
                >
                  <div>{`firstName: ${name?.first}`}</div>
                  <div>{`lastName: ${name?.last}`}</div>
                  <div>{`country: ${location?.country}`}</div>
                </div>
              );
            })
          : null}
      </div>
      <div>
        <button disabled={page === 0} onClick={setPrev}>
          Prev
        </button>
        <button
          disabled={page === Math.floor(user?.results?.length / 10) - 1}
          onClick={setNext}
        >
          Next
        </button>
      </div>
    </div>
  );
}

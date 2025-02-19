import { useEffect, useState } from "react";

enum state {
  pending = "PENDING",
  fetching = "FETCHING",
  success = "SUCCESS",
}

interface IUser {
  results: any[];
}

interface IUseReturnType {
  fetchingState: state;
  user: IUser;
  error: any;
}

const useFetchUser = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [fetchingState, setFechingState] = useState(state.pending);

  const fecthUser = async () => {
    try {
      setFechingState(state.fetching);
      const response = await fetch("https://randomuser.me/api/?results=50");
      if (!response.ok) {
        throw new Error("There is some error");
      }
      const userData = await response.json();
      setUser(userData);
      setFechingState(state.success);
    } catch (err) {
      setError(err);
    }
  };

  useEffect(() => {
    fecthUser();
  }, []);

  return {
    fetchingState,
    user,
    error,
  };
};

export default useFetchUser;

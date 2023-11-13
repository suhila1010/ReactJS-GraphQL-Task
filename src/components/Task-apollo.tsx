import {useEffect, useState} from "react";
import {useQuery} from "@apollo/client";
import {LOAD_DATA} from "./GraphQL/Queries";

const TaskApollo = () => {
  const {error, loading, data} = useQuery(LOAD_DATA, {
    variables: {
      owner: "suhila1010",
      name: "TSC_Elzero_Assignments",
    },
  });
  const [repo, setRepo] = useState([]);
  useEffect(() => {
    if (data) {
      setRepo(data);
      console.log(data);
    }
  }, [data]);

  if (loading) {
    return <div>Loading.</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return <div>{JSON.stringify(repo)}</div>;
};

export default TaskApollo;

import axios from "axios";
import {useEffect, useState} from "react";
const Task = () => {
  const [Data, setData] = useState(null);

  useEffect(() => {
    APIRequest("suhila1010", "TSC_Elzero_Assignments")
      .then((res) => {
        setData(res.data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }, []);

  return <div>{Data && JSON.stringify(Data)}</div>;
};
//request function
async function APIRequest(owner: string, name: string) {
  //Define The query
  const query = `
    query GetRepository($owner: String!, $name: String!) {
      repository(owner: $owner, name: $name, followRenames: null) {
        createdAt
        databaseId
        description
        archivedAt
        id
        name
      }
    }
  `;
  //Define The owner Name And The Repo Name
  const variables = {
    owner,
    name,
  };

  try {
    const response = await axios.post(
      "https://api.github.com/graphql",
      {query, variables},
      {
        headers: {
          Authorization: "Bearer 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",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("request error:", error);
    throw error;
  }
}

export default Task;

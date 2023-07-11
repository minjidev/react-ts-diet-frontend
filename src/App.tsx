import React, { useEffect } from "react";
import axios from "axios";

const App = () => {
  const options = {
    method: "GET",
    url: "https://api.edamam.com/api/food-database/v2/parser",
    params: {
      app_id: "5e33d82b",
      app_key: "0723460ec4f5ef18dccf5031870bbaaa",
      ingr: "apple",
    },
  };

  useEffect(() => {
    async function getData() {
      try {
        const { data } = await axios.request(options);
        console.log(data);
      } catch (error) {
        console;
      }
    }
    getData();
  }, []);

  return <>App</>;
};

export default App;

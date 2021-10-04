import axios from "axios";

let config = {};
let json_token = "";
export let axiosConfig = axios.create();

export const login = (token) => {
  json_token = token;

  config = {
    headers: {
      Authorization: "Bearer " + token,
    },
  };
  axiosConfig = axios.create(config);
  console.log("Logged in");
};

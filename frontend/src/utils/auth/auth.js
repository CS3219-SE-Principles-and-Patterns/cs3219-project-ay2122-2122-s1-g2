import axios from "axios";

let json_token;
let config = {};
export let axiosConfig = axios.create();

export const login = (token) => {
  json_token = token;
  config = {
    headers: {
      Authorization: "Bearer " + json_token,
    },
  };
  axiosConfig = axios.create(config);
};

import axios from "axios";

const gitHubInstance = axios.create({
  baseURL: "https://github.com",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS, DELETE, PUT",
    "Access-Control-Allow-Headers": "Origin, Content-Type, X-Auth-Token",
  },
});

export { gitHubInstance };

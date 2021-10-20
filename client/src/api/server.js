import axios from "axios";

const serverInstance = axios.create({
  baseURL: process.env.REACT_APP_SERVER,
});

export { serverInstance };

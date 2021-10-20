import axios from "axios";

const gitHubInstance = axios.create({
  baseURL: "https://api.github.com",
});

export { gitHubInstance };

import axios from "axios";

export const upgradeService = ({ code }: { code: string }) => {
  return axios.post("/api/code", { code });
};

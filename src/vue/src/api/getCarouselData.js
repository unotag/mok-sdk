import axios from "axios";
import { asyncWrap } from "../utils";

export default async function getUserCarouselData(baseUrl, id, key) {
  const config = {
    method: "GET",
    url: `${baseUrl}/api/customer/v1.2/caraousel-data/${id}`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  const [error, result] = await asyncWrap(axios(config));
  if (error) {
    console.log(error.response.data);
    return;
  }
  return result.data;
}

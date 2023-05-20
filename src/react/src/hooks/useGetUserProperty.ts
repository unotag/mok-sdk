import axios, { AxiosRequestConfig } from "axios";
import { asyncWrap } from "../utils";

export async function getUserProperty(
  baseUrl: string,
  id: string,
  key: string,
) {
  const config: AxiosRequestConfig = {
    method: "GET",
    url: `${baseUrl}/api/customer/v1.2/user_properties/${id}`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  const [error, result] = await asyncWrap(axios(config))
  if(error) {
    console.log(error.response.data)
  }
  return result.data;
}

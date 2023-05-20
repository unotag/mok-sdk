import axios, { AxiosRequestConfig } from "axios";
import { asyncWrap } from "../utils";

export async function setUserProperty(
  baseUrl: string,
  id: string,
  key: string,
  data: object
) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${baseUrl}/api/customer/v1.2/registration/${id}`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
    data,
  };

  const [error, response] = await asyncWrap(axios(config))
  if(error) {
    console.log(error.response.data);
  }
  console.log("user property updated successfully!")
}

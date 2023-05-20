import axios, { AxiosRequestConfig } from "axios";

export function markAllAsRead(
  baseUrl: string,
  id: string,
  key: string,
) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${baseUrl}/api/customer/v1.2/mark_read_in_app/${id}?type=all`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log("sucessfully marked all as read")
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

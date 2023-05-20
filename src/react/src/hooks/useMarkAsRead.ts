import axios, { AxiosRequestConfig } from "axios";

export function markAsRead(
  baseUrl: string,
  id: string,
  in_app_id: string,
  key: string,
) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${baseUrl}/api/customer/v1.2/mark_read_in_app/${id}?in_app_id=${in_app_id}`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log("sucessfully marked as read")
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

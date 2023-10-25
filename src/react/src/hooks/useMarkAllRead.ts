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

export function markOneAsRead(
  baseUrl: string,
  userId: string,
  key: string,
  in_app_id: string
) {
  const config: AxiosRequestConfig = {
    method: "PATCH",
    url: `${baseUrl}/api/customer/v1.2/mark_read_in_app/${userId}?in_app_id=${in_app_id}`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log("sucessfully marked message read with id: " + in_app_id)
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

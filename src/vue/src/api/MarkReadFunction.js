import axios from "axios";

export function markAllAsRead(baseUrl, id, key) {
  const config = {
    method: "PATCH",
    url: `${baseUrl}/api/customer/v1.2/mark_read_in_app/${id}?type=all`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log("Successfully marked all as read");
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}

export function markOneAsRead(baseUrl, userId, key, in_app_id) {
  const config = {
    method: "PATCH",
    url: `${baseUrl}/api/customer/v1.2/mark_read_in_app/${userId}?in_app_id=${in_app_id}`,
    headers: {
      Authorization: key,
      "Content-Type": "application/json",
    },
  };

  axios(config)
    .then((response) => {
      console.log("Successfully marked message read with id: " + in_app_id);
    })
    .catch((err) => {
      console.log(err.response.data);
    });
}
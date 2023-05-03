import axios from 'axios';

const getMessages = async (limit, skip, isDev, isLocal, external_player_id, key) => {
  const BASE_URL = isDev
    ? 'https://dev.mok.one/api/customer/v1.2'
    : isLocal
    ? 'http://localhost:8080/api/customer/v1.2'
    : 'https://live.mok.one/api/customer/v1.2';
  const config = {
    url: `${BASE_URL}/in_app_operation_data/limit`,
    params: {
      limit,
      skip,
      external_player_id,
    },
    headers: {
      Authorization: key,
    },
  };

  const data = await axios(config);

  return data.data.data;
};

export default getMessages;

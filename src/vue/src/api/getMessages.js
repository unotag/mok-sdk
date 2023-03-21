import axios from 'axios';

const getMessages = async (limit, skip, isDev, isLocal, external_player_id, key) => {
  const BASE_URL = isDev
    ? 'https://dev.mok.one'
    : isLocal
    ? 'http://localhost:8080'
    : 'https://live.mok.one';
  const config = {
    url: `${BASE_URL}/api/customer/in_app_operation_data/limit`,
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

import axios from 'axios';
import { Shade } from '../utils';

const getStylesData = async (baseUrl, apiKey) => {
  const response = await axios.get(`${baseUrl}/api/customer/v1.2/sdk_config`, {
    headers: {
      Authorization: apiKey,
      'Content-Type': 'application/json',
    },
  });

  const titleTextColor =
    Shade(response.data.data?.titleBarBgColor) === 'light' ? '#000' : '#fff';
  const boxTextColor =
    Shade(response.data.data?.notificationBgColor) === 'light'
      ? '#000'
      : '#fff';

  return { ...response.data.data, titleTextColor, boxTextColor };
};

export default getStylesData;

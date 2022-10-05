import axios from 'axios';

const API_URL = '/api/lottery/';

// Create new Lottery
const createLottery = async (LotteryData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, LotteryData, config);

  return response.data;
};

// Update user Lottery
const updateLottery = async (LotteryData, token) => {
  const { _id } = LotteryData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + _id, LotteryData, config);

  return response.data;
};

// Get user lottery
const getLotterys = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user Lottery
const deleteLottery = async (LotteryData, token) => {
  const { _id } = LotteryData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + _id, config);

  return response.data;
};

// queryProductByType
// const queryProductByType = async (LotteryData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//
//   const response = await axios.post(`${API_URL}queryProductByType`, LotteryData, config);
//   return response.data;
// };

const lotteryService = {
  createLottery,
  updateLottery,
  getLotterys,
  deleteLottery,
  // queryProductByType,
};

export default lotteryService;

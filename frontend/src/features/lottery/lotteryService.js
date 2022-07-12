import axios from 'axios';

const API_URL = '/api/lottery/';

// Create new Lottery
const createLottery = async (ProductData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, ProductData, config);

  return response.data;
};

// Update user Lottery
const updateLottery = async (ProductData, token) => {
  const { _id } = ProductData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + _id, ProductData, config);

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
const deleteLottery = async (ProductId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + ProductId, config);

  return response.data;
};

// queryProductByType
// const queryProductByType = async (ProductData, token) => {
//   const config = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };
//
//   const response = await axios.post(`${API_URL}queryProductByType`, ProductData, config);
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

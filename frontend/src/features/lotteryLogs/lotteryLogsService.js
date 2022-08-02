import axios from 'axios';

const API_URL = '/api/lotteryLogs/';

// Create new ProductLogs
const createLotteryLog = async (CreateLotteryLog, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, CreateLotteryLog, config);

  return response.data;
};

// Get user lottery
const getLotteryLogs = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Delete user ProductLogs
const deleteLotteryLogs = async (LotteryLogsId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + LotteryLogsId, config);

  return response.data;
};

const lotteryLogsService = {
  createLotteryLog,
  getLotteryLogs,
  deleteLotteryLogs,
};

export default lotteryLogsService;

import axios from 'axios';

const API_URL = '/api/award/';

// Create new Award
const createAward = async (CreateAward, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.post(`${API_URL}create`, CreateAward, config);

  return response.data;
};

// Get Award
const getAwards = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.get(API_URL, config);

  return response.data;
};

// Update Award
const updateAward = async (AwardData, token) => {
  const { _id } = AwardData;
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.put(API_URL + _id, AwardData, config);

  return response.data;
};

// Delete Award
const deleteAward = async (AwardId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await axios.delete(API_URL + AwardId, config);

  return response.data;
};

const awardService = {
  createAward,
  getAwards,
  updateAward,
  deleteAward,
};

export default awardService;

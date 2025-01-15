import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:3001';

export const getQuestionnaire = async () => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/questionnaire`);
    return response.data;
  } catch (error) {
    console.error('Error fetching questionnaire:', error);
    throw error;
  }
};

export const submitRatings = async (userId, ratings) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/submit-ratings`, {
      user_id: userId,
      ratings: ratings,
    });
    return response.data;
  } catch (error) {
    console.error('Error submitting ratings:', error);
    throw error;
  }
};

export const getRecommendations = async (userId, topN) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/recommendations`, {
      user_id: userId,
      top_n: topN,
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    throw error;
  }
};
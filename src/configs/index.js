const configs = {
  baseURL: process.env.BASE_URL,
  mongodbURI: process.env.MONGO_URI,
  maxAge: 36000,
  taskTimer: 60 * 1000,
  reservationTime: 10 * 60 * 1000,
};

export default configs;

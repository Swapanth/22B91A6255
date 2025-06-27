import axios from "axios";

const log = async (level, pkg, message) => {
  try {
    const res = await axios.post(`${process.env.REACT_APP_SERVER_PORT}/log`, {
      stack: "frontend",
      level,
      packageName: pkg,
      message,
    });
    console.log("Log sent:", res.data.logID);
  } catch (err) {
    console.error("Failed to log:", err.response?.data || err.message);
  }
};

export default log;

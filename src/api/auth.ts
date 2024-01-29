import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const URL = `${baseURL}/api/auth`;

const login = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await axios.post(`${URL}/signin`, { email, password });

  return data;
};

const register = async ({
  email,
  password,
  username,
}: {
  email: string;
  password: string;
  username: string;
}) => {
  await axios.post(`${URL}/signup`, { email, password, username });
};

const logout = async () => {
  console.log(baseURL);
  await axios.post(`${URL}/signout`);
};

const checkEmailDuplicated = async (email: string) => {
  const { data } = await axios.post(`${URL}/email-check`, { email });
  return data;
};

const checkUsernameDuplicated = async (username: string) => {
  const { data } = await axios.post(`${URL}/username-check`, { username });
  return data;
};

export { login, logout, register, checkEmailDuplicated, checkUsernameDuplicated };

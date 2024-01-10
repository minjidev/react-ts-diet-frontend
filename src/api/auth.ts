import axios from 'axios';

const baseURL = import.meta.env.VITE_API_BASE_URL;

const URL = `${baseURL}/api/auth`;

const signIn = async ({ email, password }: { email: string; password: string }) => {
  const { data } = await axios.post(`${URL}/signin`, { email, password });

  return data;
};

const signUp = async ({
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

const signOut = async () => {
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

export { signIn, signOut, signUp, checkEmailDuplicated, checkUsernameDuplicated };

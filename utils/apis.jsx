// const host = 'https://localhost:5000';
//with vs code port forwarding extension: set to https and public mode
const host = "https://7h0rkdm8-5000.asse.devtunnels.ms";

const authApi = `${host}/api/auth`;
const getApi = `${host}/api/get`;
const postApi = `${host}/api/post`;

const AUTH = {
  TESTAUTH: `${authApi}/testauth`,
  // login: `${authApi}/login`,
  // register: `${authApi}/register`,
  // logout: `${authApi}/logout`
};

const GET = {
  TESTGET: `${getApi}/testget`,
  // getProfile: `${getApi}/profile`, // get profile of current user on login/index page
};

const POST = {
  TESTPOST: `${postApi}/testpost`,
  // updateProfile: `${postApi}/profile`,
  // all app logic goes here
};

export { AUTH, GET, POST };

// const host = 'https://localhost:5000';
//with vs code port forwarding extension: set to https and public mode
const host = "https://l4ld1gq6-9001.asse.devtunnels.ms";
const authApi = `${host}/api/auth`;
const getApi = `${host}/api/get`;
const postApi = `${host}/api/post`;

const AUTH = {
  TESTAUTH: `${authApi}/testauth`,
  REGISTER: `${authApi}/signup`,
  LOGIN: `${authApi}/signin`,
};

const GET = {
  TESTGET: `${getApi}/testget`,
  GETIMG: `${getApi}/testGetImage`,
  GETIMGLIST: `${getApi}/getimageid`,
  GETGAR: `${getApi}/getgarment`,
  // getProfile: `${getApi}/profile`, // get profile of current user on login/index page
};

const POST = {
  TESTPOST: `${postApi}/testpost`,
  TAGREADER: `${postApi}/tagreader`,
  ADDGARMENT: `${postApi}/garmentregistration`,
  // updateProfile: `${postApi}/profile`,
  // all app logic goes here
};

export { AUTH, GET, POST, host};

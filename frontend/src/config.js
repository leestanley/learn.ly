let apiurl = 'https://educate-omomo.herokuapp.com';
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  apiurl = 'http://localhost:4000';
}

export default {
  API_URL: apiurl,
}

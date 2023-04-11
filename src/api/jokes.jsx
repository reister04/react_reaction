import Axios from 'axios';
// since this particular API doesn't require you to be authenticated, then all we need to specify is the base url
// of the api. Other APIs will require you to add headers, auth methods, etc.
export default Axios.create({
    baseURL: 'https://official-joke-api.appspot.com',
    headers: {}
});

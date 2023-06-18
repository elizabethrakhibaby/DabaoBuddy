import axios from 'axios';

export default axios.create({
    baseURL: 'https://api.yelp.com/v3/businesses',
    headers: {
        Authorization: 
        'Bearer Bs-BpCIQlltNjUpORK1BVaqFVbLg2yhP7X6MvkKOalMotTXQwSzaUUUNOnTpjv9GV8gN_iOttJw0LVsxDZPMnYX3KJFpwYfa6bWM1MS_dIWGpgvbVviRnzoRJ7aFZHYx'
    }
});


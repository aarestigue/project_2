const axios = require('axios');

const apiKey = "AIzaSyAHtdN-WUB36KHir7qT7cWLfUXY9tqNyjs";



class ApiService {
    constructor() {
      this.api = axios.create({
        baseURL: "https://www.googleapis.com/youtube/v3",
      });
    }

}

module.exports = ApiService;
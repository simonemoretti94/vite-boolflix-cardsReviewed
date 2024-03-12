import { reactive } from 'vue';
import axios from 'axios';
import { languages } from './languages.js';

export const state = reactive({
    urlAPI: 'https://api.themoviedb.org/3/search/movie?api_key=e99307154c6dfb0b4750f6603256716d&query=the',
    apiKey: '4529728a455fd554eacb1d7df41d13e5',
    cards: [],
    cardsTv: [],

    //posterImgPath: [],

    FoundLoading: true, //return cards array length
    loadingAPI: true, //while true, show a loading icon

    //AppHeader variables
    selectedMovie: '',



    //Methods

    // -> AppHeader

    fetchData(url, array) {

        this.loadingAPI = true;

        axios
            .get(url)
            .then((response) => {
                response.data.results.forEach(element => {
                    array.push(element);
                });
            })
            .catch((error) => {
                console.error('axios error log: ', error);
            });

        return array;
    },

    // -> AppMovies && AppTv

    flagIcon(country) {

        if (country === '' || country === undefined) {
            return `<span>Flag not available</span>`
        }
        else {
            let tempStr = String(country);
            tempStr = tempStr.toUpperCase();
            tempStr = languages.lang[tempStr];
            tempStr = tempStr.toLowerCase();
            tempStr = tempStr.split(' ');
            tempStr = tempStr.join('-');

            return `<img width="15" height="15" src="https://img.icons8.com/color/15/${tempStr}.png" alt="${tempStr}"/>`;
        }
    },
    h6slice(title) {
        if (title === '' || title === undefined) {
            return 'no data available';
        }
        else if (title.length <= 50) {
            return title;
        }
        else {
            return title.slice(0, 30) + '...';
        }
    },
    titleEvaluating(movie) {
        if (movie.title) {
            return movie.title;
        }
        else if (movie.original_name) {
            return movie.original_name;
        }
        else {
            return 'title not available';
        }
    },
    imgRender(movie) {
        if (movie.backdrop_path) {
            return `https://image.tmdb.org/t/p/w780` + movie.backdrop_path;
        }
        else if (movie.poster_path) {
            return `https://image.tmdb.org/t/p/w780` + movie.poster_path;
        }
        else {
            console.log('img path not available ', movie.original_title);
            return `./src/assets/img/picture-not-available.jpg`;
        }
    }

});
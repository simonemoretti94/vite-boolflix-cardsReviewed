<script>
import { state } from '../state.js';
import { languages } from '../languages.js';

export default {
    name: 'AppTv',
    data() {

        return { state, languages, }
    },
}
</script>

<template>
    <div v-for="movie in state.cardsTv" class="card col-sm-6 col-md-4 col-lg-3">
        <div id="hide_content">
            <p><span>Titolo: </span>{{ state.titleEvaluating(movie) }}</p>
            <p><span>Titolo originale: </span>{{ movie.original_title ? movie.original_title : 'text\
                not available' }}</p>
            <p><span>Lingua originale: </span><span id="language_icon"
                    v-html="state.flagIcon(movie.original_language)"></span> {{
        movie.original_language ? movie.original_language : 'text not available' }}</p>
            <p v-if="movie.vote_average" id="p_rate"><span>Voto: </span>
                <i v-for="n in (Math.ceil(movie.vote_average / 2))" class="fa-solid fa-star" style="color: #ffbd00;"
                    :key="n + 'yellow_star'"></i>
                <i v-if="(Math.ceil(movie.vote_average / 2)) < 5" v-for="n in (5 - (Math.ceil(movie.vote_average / 2)))"
                    class="fa-solid fa-star" style="color: #ffffff;" :key="n + 'white_star'"></i>
                <span id="span_rate">({{
        movie.vote_average ?
            Math.ceil(movie.vote_average.toFixed(1) / 2) + '/5' : 'no data' }})</span>
            </p>
            <p id="p_overview"><span>Overview: </span>{{ movie.overview ? movie.overview : 'text not\
                available'
                }}</p>
        </div>
        <img :src="state.imgRender(movie)" :alt="movie.original_title ? movie.original_title : movie.original_name">
        <h6>{{ state.h6slice(state.titleEvaluating(movie)) }}</h6>
    </div>
</template>

<style>
.card {
    position: relative;
    max-height: 300px;
    margin-top: 1rem;
    padding: 0 1rem;

    >img {
        position: relative;
        max-width: 100%;
        width: 100%;
        height: 300px;
        filter: contrast(.9) saturate(1.1) sepia(.2) drop-shadow(0 0 5px rgba(255, 255, 255, 0.474));
    }

    & h6 {
        z-index: 1;
        position: absolute;
        top: 0;
        left: 15;
        color: rgb(17, 17, 17);
        background-color: rgba(128, 128, 128, 0.571);

        padding: .1rem;
        border: solid .5px rgba(128, 128, 128, 0);
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }



    & #hide_content {
        display: none;

        position: absolute;
        top: 0;
        left: 10;
        padding: 1rem;

        width: calc(100% - 2rem);
        max-width: 100%;
        height: 300px;

        border: 1px solid white;
        border-radius: 8px;

        display: flex;
        flex-direction: column;

        background-color: black;
        color: white;

        & span {
            font-weight: bold;
            font-size: medium;
        }

        & p {
            font-size: small;
        }

        & #p_rate {
            >span {
                margin-right: .5rem;
            }

            & i {
                margin: auto .2rem auto 0;
            }

            & span#span_rate {
                font-weight: 400;
                font-size: xx-small;
                margin: auto .1rem auto .1rem;
                color: rgb(255, 255, 255);
            }
        }

        & #p_overview {
            max-height: calc(100% - (112px + 10px));
            margin-top: .5rem;
            border: .5px solid white;
            padding: .2rem;
            border-radius: 8px;
            overflow-y: scroll;
        }
    }

}


/* sm */
@media screen and (min-width: 568px) {
    .col-sm-6 {
        width: 50%;
    }

    .card:hover {

        & img,
        h6 {
            display: block;
        }

        & #hide_content {
            display: none;
        }
    }
}

/* md */
@media screen and (min-width: 768px) {
    .col-md-4 {
        width: calc((100% / 12)* 4);
    }

    .card span {
        font-weight: 600;
        font-size: small;
    }

    #p_rate {
        >span {
            margin-right: .2rem;
        }

        & i {
            margin: auto .1rem auto 0;
        }

        & span#span_rate {
            font-weight: 300;
            font-size: xx-small;
            margin: auto .1rem auto .1rem;
            color: rgb(255, 255, 255);
        }
    }

    .card:hover {

        & img,
        h6 {
            display: none;
        }

        & #hide_content {
            display: block;
        }
    }
}

/* lg */
@media screen and (min-width: 1024px) {
    .col-lg-3 {
        width: calc((100% / 12)* 3);
    }

    .card:hover {

        & img,
        h6 {
            display: none;
        }

        & #hide_content {
            display: block;
        }
    }
}
</style>
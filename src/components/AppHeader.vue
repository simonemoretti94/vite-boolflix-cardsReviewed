<script>
import { state } from '../state';

export default {
    name: 'AppHeader',
    data() {

        return {
            state,

            screenX: window.innerWidth,
            screenY: window.innerHeight,

            container: null,
            input: null,
            icon: null,
        }
    },
    watch: {
        screenX(newVal, oldVal) {
            //console.log(`screenX changed from ${oldVal} to ${newVal}`);
            if (newVal > 449) {

                this.icon.classList.remove('d-none');

                this.input.classList.add('d-none');
                this.input.classList.remove('mb-1');

                this.container.classList.add('flex-row');
                this.container.classList.remove('flex-column');
            }
        }
    },
    methods: {
        movieSearch(string) {
            //console.log(string);
            const url1 = `https://api.themoviedb.org/3/search/movie?api_key=${state.apiKey}&query=${state.selectedMovie}`;
            const url2 = `https://api.themoviedb.org/3/search/tv?api_key=${state.apiKey}&query=${state.selectedMovie}`;

            if (state.selectedMovie === '' || state.selectedMovie.length < 3) {
                state.cards = [];
                state.cardsTv = [];
                state.loadingAPI = true;
            }
            else {
                //state.FoundLoading = true;
                state.cards = [];
                state.cards = state.fetchData(url1, state.cards);
                state.cardsTv = [];
                state.cardsTv = state.fetchData(url2, state.cardsTv);
                state.loadingAPI = false;

            }
        },
        iconClick(event) {
            //console.log(event.target.id);

            this.icon.classList.add('d-none');

            this.input.classList.remove('d-none');
            this.input.classList.add('mb-1');

            this.container.classList.remove('flex-row');
            this.container.classList.add('flex-column');
        },
        updateScreenX() {
            this.screenX = window.innerWidth;
        },
    },
    created() {
        window.addEventListener('resize', this.updateScreenX);
    },
    mounted() {
        this.container = document.getElementById('header_container');
        this.input = document.getElementById('header_input');
        this.icon = document.getElementById('show_icon');
    },

}
</script>

<template>
    <header>
        <div id="header_container" class="container flex-row">
            <h2>boolflix</h2>
            <input id="header_input" class="d-none" type="text" placeholder="Write here a movie and press enter"
                v-model="state.selectedMovie" @keyup="movieSearch($event.target.value)">
            <i id="show_icon" class="fa-solid fa-plus-minus" style="color: #ffffff;" ref="show_icon"
                @click="iconClick($event)"></i>
        </div>
    </header>
</template>

<style scoped>
header {
    width: 100vw;
    min-width: 320px;
    min-height: 60px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 2;
    background: linear-gradient(#232323, #181818, #141414, #181818, #232323);

    & .container {
        width: 90%;
        height: 65px;
        max-width: 1440px;
        margin: auto;
        display: flex;
        justify-content: space-between;
        align-items: center;

        >h2 {
            text-transform: uppercase;
            color: var(--boolflix-header-writing);
            font-weight: 500;
            transform: skewX(-5deg);
            filter: drop-shadow(0 0 3px rgba(128, 128, 128, 0.629));
        }

        & input {
            width: calc((100% / 12)* 8);
            padding: .3rem;
            border-radius: 8px;
            text-align: center;
            color: rgb(53, 53, 53);
            font-size: small;
            /* display: none; */
        }
    }
}

.d-none {
    display: none;
}

.mb-1 {
    margin-bottom: 1rem;
}

.flex-row {
    flex-direction: row;
}

.flex-column {
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

@media screen and (min-width: 450px) {
    header {
        >.container {
            justify-content: space-between;
            align-items: center;

            >h2 {
                font-size: 110%;
            }

            & input {
                display: block;
                width: calc((100% / 12)* 5.5);
                font-size: small;
                margin-bottom: 0;
            }

            & i#show_icon {
                display: none;
            }
        }
    }
}

@media screen and (min-width: 758px) {
    header {
        >.container {
            >h2 {
                font-size: 150%;
            }

            & input {
                width: calc((100% / 12)* 4);
                font-size: medium;
            }
        }
    }
}
</style>
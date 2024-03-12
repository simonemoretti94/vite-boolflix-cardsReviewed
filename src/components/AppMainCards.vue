<script>
import { state } from '../state';
import { languages } from '../languages';
import AppMovies from './AppMovies.vue';
import AppTv from './AppTv.vue';

export default {
    name: 'AppMainCards',
    data() {
        return { state, languages }
    },
    components: { AppMovies, AppTv },

}
</script>

<template>
    <section>
        <div class="container">
            <h4 v-if="!state.cards.length == 0 && !state.FoundLoading">Movies:</h4>
            <div class="row"
                :class="state.cards.length % (4 || 2) !== 0 ? 'justify-content-start' : 'justify-content-center'">
                <AppMovies></AppMovies>
            </div>
            <h4 v-if="!state.cardsTv.length == 0 && !state.FoundLoading">Tv:</h4>
            <div class="row"
                :class="state.cardsTv.length % (4 || 2) !== 0 ? 'justify-content-start' : 'justify-content-center'">
                <AppTv></AppTv>
            </div>
        </div>
    </section>
</template>

<style scoped>
.d-none {
    display: none;
}

.container {
    width: 90%;
    margin: 1rem auto auto auto;

    >h4 {
        margin-left: -.5rem;
        color: white;
        font-weight: 500;
        transform: skewX(-5deg);
        filter: drop-shadow(0 0 5px rgba(31, 31, 31, 0.63));
    }

    .row {
        margin-bottom: .5rem;
    }
}

.justify-content-start {
    justify-content: start;
}

.justify-content-center {
    justify-content: center;
}

@media screen and (min-width: 768px) {

    h4 {
        margin-left: -1rem;
    }
}
</style>
import axios from 'axios';
import { request } from 'http';

export default async function dbSeeder() {
    const pokedex = [];
    const pokemons = await getAllPokemon();
    console.log(pokemons);
    pokemons.forEach(async (pokemon: any) => {
        const newPokemon = await getPokemonDetail(pokemon.url);
        const { species } = newPokemon;

        const { id, base_experience, weight, height, moves, stats } =
            newPokemon;

        const pokemonFullInfo = {
            id,
            base_experience,
            weight,
            height,
            moves,
            stats,
        };
        console.log('full info', pokemonFullInfo);
        const pokemonSpecie = await getPokemonDescription(species.url);
        const { flavor_text_entries: flavors } = pokemonSpecie;
        const description = flavors.find(
            (flavor: any) => flavor.language.name == 'es',
        );
    });
}

async function getAllPokemon() {
    // endpoint https://pokeapi.co/api/v2/pokemon?limit=151

    try {
        const request = await fetch(
            'https://pokeapi.co/api/v2/pokemon?limit=151',
        );

        if (request.ok) {
            const response = await request.json();
            const { results } = response;

            return results;
        }
    } catch (err) {
        console.error('error de pokeapi', err);
    }
}

async function getPokemonDetail(url: string) {
    // endpoint "https://pokeapi.co/api/v2/pokemon/{number}/"
    /**
     * Me proporciona
     * base_experience
     * height
     * weight
     * sprite
     * english_main_movement
     * english_secondary_movement
     * hp
     * attack
     * defense
     * special_attack
     * special_deffense
     * speed
     * types - vienen en nombre hay que transformarlos a id
     */

    try {
        const request = await fetch(url);
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}

async function getPokemonDescription(url: string) {
    //endpoint https://pokeapi.co/api/v2/pokemon-species/1/
    try {
        const request = await fetch(url);
        if (request.ok) {
            const response = await request.json();
            return response;
        }
    } catch (err) {
        console.error(err);
    }
}

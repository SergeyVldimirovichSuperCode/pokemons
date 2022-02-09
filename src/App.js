import React, { useState } from "react";
import useSWR from "swr";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Pagination from '@mui/material/Pagination';
import CardPokemon from "./componets/card-pokemon";

export default function App() {

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 12
    const [offsetPokemons, setOffsetPokemons] = useState(0)

    const { data, error } = useSWR(
        `https://pokeapi.co/api/v2/pokemon?limit=${itemsPerPage}&offset=${offsetPokemons}`,
    );

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    const countPokemons = data.count
    console.log(data)
    const onClickPage = (event, value) => {

        setCurrentPage(value)
        setOffsetPokemons(itemsPerPage * (value - 1))

    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                {
                    data.results.map((names) => {

                        return (
                            <CardPokemon link={names.url} name={names.name} key={names.name} />
                        )
                    })
                }
            </Grid>
            <Pagination count={Math.ceil(countPokemons / 12)} page={currentPage} onChange={onClickPage} hidePrevButton hideNextButton />
        </Box>
    );
}

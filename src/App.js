import React, { useState } from "react";
import useSWR from "swr";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Information from "./componets/informations";
import Image from "./componets/image";
import Box from '@mui/material/Box';
import { Pagination } from "@mui/material";

export default function App() {

    const [page, setPage] = useState(1)
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage] = useState(12)
    const [itemsPerPage, setItemsPerPage] = useState(0)

    const { data, error } = useSWR(
        `https://pokeapi.co/api/v2/pokemon?limit=12&offset=${itemsPerPage}`,

    );

    const paginate = pageNumber => setCurrentPage(pageNumber)

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";
    console.log(data)

    const currentPokemons = data.results.slice(0, pokemonPerPage)
    const countPokemons = data.count

    const onClickPage = (event, value) => {

        paginate(value);
        setPage(value);
        setItemsPerPage(12 * (value - 1))

    }

    return (

        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} columns={16}>
                {
                    currentPokemons.map((names) => {
                        return (

                            <Grid item xs={8} key={names.name}>
                                <Card sx={{ maxWidth: 345 }} key={names.name}>
                                    <CardActionArea>
                                        <Image link={names.url} />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" >
                                                {names.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary" >
                                                <Information link={names.url} />
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                </Card>
                            </Grid>

                        )
                    })
                }
            </Grid>
            <Pagination count={Math.ceil(countPokemons / 12)} page={page} onChange={onClickPage} hidePrevButton hideNextButton />
        </Box>
    );
}

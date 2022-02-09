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
import Pagination from '@mui/material/Pagination';

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
            <Pagination count={Math.ceil(countPokemons / 12)} page={currentPage} onChange={onClickPage} hidePrevButton hideNextButton />
        </Box>
    );
}

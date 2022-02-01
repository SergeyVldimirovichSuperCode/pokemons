import React, { useEffect, useState } from "react";
import useSWR from "swr";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Information from "./componets/informations";
import Image from "./componets/image";
import Box from '@mui/material/Box';
import Pagination from "./componets/pagination";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App() {
    
    const [pokemons, setPokemon] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pokemonPerPage] = useState(12)


    
    const lastPokemonsIndex = currentPage * pokemonPerPage

    const firstPokemonsIndex = lastPokemonsIndex - pokemonPerPage

   
    const paginate = pageNumber => setCurrentPage(pageNumber)

    const { data, error } = useSWR(
        "https://pokeapi.co/api/v2/pokemon?limit=100&offset=200",
        fetcher
    );

  if (error) return "An error has occurred.";
  if (!data) return "Loading...";
 
  const currentPokemons = data.results.slice(firstPokemonsIndex, lastPokemonsIndex)
    console.log(paginate)

  return (

    <Box sx={{ flexGrow: 1 }}>
    <Grid container spacing={2} columns={16}>
        {
            currentPokemons.map((names) => {
            return ( 

                    <Grid item xs={8} key={names.name}>
                        <Card sx={{ maxWidth: 345 }} key={names.name}>
                        <CardActionArea>
                            <Image link={names.url}/>
                            <CardContent>
                            <Typography gutterBottom variant="h5" component="div" >
                                {names.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary" >
                                <Information link={names.url}/>
                            </Typography>
                            </CardContent>
                        </CardActionArea>
                        </Card>
                    </Grid>    

            )
        })
        }
    </Grid>
    <Pagination  pokemonsPerPage={pokemonPerPage} totalPokemons={data.results.length} paginate={paginate} />
    </Box>


  );
}

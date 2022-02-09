import React from "react";
import useSWR from "swr";
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';

export default function CardPokemon(link, name) {

    const { data, error } = useSWR(
        link.link
    );

    if (error) return "An error has occurred.";
    if (!data) return "Loading...";

    return (
        <Grid item xs={8} >
            <Card sx={{ maxWidth: 345 }} >
                <CardActionArea >
                    <CardMedia
                        component="img"
                        height="250"
                        image={data.sprites.front_default}
                        alt="green iguana"
                    />
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div" >
                            {link.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" >
                            <CardContent>
                                вес {data.height} ед
                                рост {data.weight} ед
                            </CardContent>
                        </Typography>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Grid>
    )
}
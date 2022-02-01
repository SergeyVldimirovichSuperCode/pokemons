import React from "react";
import useSWR from "swr";
import CardMedia from '@mui/material/CardMedia';

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Image(link){
    
    const { data, error } = useSWR(
        link.link,
        fetcher
      );
      
      if (error) return "An error has occurred.";
      if (!data) return "Loading...";
      
    return(
        <CardMedia
                component="img"
                height="250"
                image={data.sprites.front_default}
                alt="green iguana"
        />
    )
}
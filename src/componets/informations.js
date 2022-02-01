import React from "react";
import useSWR from "swr";
import { CardContent } from "@mui/material";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Information(link){
    
    const { data, error } = useSWR(
        link.link,
        fetcher
      );
      
      if (error) return "An error has occurred.";
      if (!data) return "Loading...";
      
    return(
        <CardContent>
           вес {data.height} ед
           рост {data.weight} ед
        </CardContent>
    )
}
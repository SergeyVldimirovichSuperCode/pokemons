import React, { useState } from "react";
import { Pagination } from "@mui/material";
const Paginations = ({ pokemonsPerPage, totalPokemons, paginate }) => {
    const [page, setPage] = useState(1);
    paginate(page);
    const onClickPage = (event, value) => {
        paginate(page);
        setPage(value);

    }
    console.log(page)

    return (
        <Pagination count={Math.ceil(totalPokemons / pokemonsPerPage)} onChange={onClickPage} hidePrevButton hideNextButton />
    )
}
export default Paginations
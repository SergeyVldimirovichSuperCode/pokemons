import React from "react";

const Pagination = ({pokemonsPerPage, totalPokemons, paginate}) =>{
   
    const pageNumbers = []
    for(let i = 1; i <= Math.ceil(totalPokemons/pokemonsPerPage); i++){
        pageNumbers.push(i)
    }
    return(
        <div className="paginations">
            <ul className="pagenation">
                {
                    pageNumbers.map(number =>(
                        <li className="page-item pagination_num" key={number}>
                            <a href="#" className="page-link" onClick={() => paginate(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}
export default Pagination
import { Fragment, useEffect, useState } from 'react';
import {getMovies} from './../services/fakeMovieService'
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import Like from './like';
import { Paginate } from './utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from "lodash";

function Movies(){
    const [movies,setMovies]=useState([]);
    const [genres,setGenres]=useState([]);
    const allGenres={_id:0,name:"All Genres"};
    const [selectedGenres,setSelectedGenres]=useState(allGenres);
    const [pageSize]=useState(4);
    const [currentPage,setCurrentPage]=useState(1);
    const [sortColumn,setSortColumn]=useState({path:"title",order:"asc"});
    
    const filtered=selectedGenres && selectedGenres._id
    ? movies.filter((m)=>m.genre._id===selectedGenres._id)
    :movies;
    
    const sorted= _.orderBy(filtered,[sortColumn.path],[sortColumn.order]);
    const allMovies=Paginate(sorted,currentPage,pageSize);



    useEffect(()=>{
        setMovies(getMovies);
        setGenres([allGenres,...getGenres()]);
    },[]);

    


    const handleDelete=(movie) =>{
        setMovies(movies.filter((m)=> m._id!=movie._id));
    }

    const {length:count}=movies;
    if(count===0) return <p>There are no movies in the database</p>;

    const handleLike = (movie)=>{
        const index=movies.indexOf(movie);
        movies[index].liked=!movies[index].liked;
        setMovies(
            movies.map((m)=>{
                return m;
            })
        );
    };

    const handleGenreSelect=(genre)=>{
        setSelectedGenres(genre);
        setCurrentPage(1);
    }

    const handlePageChange = (page)=>{
       setCurrentPage(page)
    };

    const handleSort=(path)=>{
        if(sortColumn.path==path){
            setSortColumn({
                path,
                order:sortColumn.order==="asc"?"desc":"asc",

            });
        }
        else{
            setSortColumn({
                path,
                order:"asc"
            });

        }
    };

    return (
        <div className="row">
            <div className="col-3">
                <ListGroup 
                items={genres} 
                selectedItem={selectedGenres}
                onItemSelect={handleGenreSelect}/>
            </div>
            <div className="col">
            <p>Showing {count} movie in the database</p>
            <MoviesTable
                onDelete={handleDelete}
                onLike={handleLike}
                allMovies={allMovies}
                onSort={handleSort}
                />
        <Pagination
            itemCounts={count}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={handlePageChange}
            />
        </div>
    </div>
        
    );
}

export default Movies;
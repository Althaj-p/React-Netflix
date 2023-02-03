import React, {  useEffect, useState } from 'react'
import axios from '../../axios'
import {API_KEY,imageUrl}from '../../constants/constants'
import './RowPost.css'
import YouTube from 'react-youtube'
function RowPost(props) {
    const [movies,setMovies]=useState([])
    const[key,setKey]=useState()
    useEffect(()=>{
        axios.get(props.url).then(response=>{
            // console.log(response.data.results[0])
        // axios.get(`discover/tv?api_key=${API_KEY}&with_networks=213`).then(response=>{     we pass the api url from url.js file by passing props method to rowpost component
            setMovies(response.data.results)
        })
    });
    const opts= {
        height: '390',
        width: '100%',
        playerVars: {
          // https://developers.google.com/youtube/player_parameters
          autoplay: 1,
        },
      };
      const handlemovie=(id)=>{
        axios.get(`movie/${id}/videos?api_key=${API_KEY}&language=en-US`).then(response=>{
            if(response.data.results.length!==0){
                setKey(response.data.results[0])
            }else{
                console.log(response.data)
            }
        })
        console.log(id)
      }
    return (
        <div className='row'>
            <h2>{props.title}</h2>
            <div className='posters'>
{/* //if there is only one statement we need not to type return()inside the curly braces after the movies.map((obj)=> // */}
                {movies.map((obj)=>
                    <img onClick={()=>handlemovie(obj.id)} className={props.isSmall ? 'smallPoster':'poster'} alt='poster' src={`${imageUrl+obj.backdrop_path}`}/>
                )}
                
            </div>
            { key && <YouTube videoId={key.key} opts={opts}  />}
        </div>
    )
}

export default RowPost

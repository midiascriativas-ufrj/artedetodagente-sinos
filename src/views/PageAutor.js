import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import {
    useRouteMatch,
    useParams
  } from "react-router-dom"

import {RedLink} from '../components/CommonStyles'

import api from '../services/api'

import Page from './Page'

import ReactMarkdown from 'react-markdown'

export default function Autor(props){

    const {id} = useParams()

    const {path} = useRouteMatch()

    const [autor, setAutor] = useState([])
    const [image, setImage] = useState([])

    useEffect(()=>{
        async function fetchData() {
            const response = await api.get(`/repertorio-autors/${id}`)
            setAutor(response.data)
            setImage(response.data.image)
        }
        fetchData()
    },[id])

    return(
        
        <Page title="Repertório Sinos">
            <div className="links">
                <Link to='/'>HOME >></Link>
                <Link to='/repertorio-sinos'> REPERTÓRIO SINOS >> </Link>
                <Link to={`/repertorio-sinos/autor/${autor.id}`} style={{textTransform: 'uppercase'}}> {autor.nome} </Link>
            </div>
            <div className="repertorio-container">
                <div className="left-container">
                    <div className="image-container">
                    <img src={`https://admin.sinos.art.br${image.url}`}/>
                    </div>
                </div>
                <div className="partituras-container" style={{textAlign: 'left'}}>
                    <ReactMarkdown source={autor.bio}/>
                </div>
            </div>
            <RedLink to="/repertorio-sinos">Voltar</RedLink>

        </Page>
            
    )
}
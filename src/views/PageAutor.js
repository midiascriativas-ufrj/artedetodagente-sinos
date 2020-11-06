import React, { useState, useEffect } from 'react'

import { Link } from 'react-router-dom'

import {
    useParams
  } from "react-router-dom"

import '../css/repertorio.css'

import {RedLink} from '../components/CommonStyles'

import api from '../services/api'

import Page from './Page'

import ReactMarkdown from 'react-markdown'

export default function Autor(props){

    const {id} = useParams()

    const [autor, setAutor] = useState([])
    const [image, setImage] = useState([])

    const [concertos, setConcertos] = useState([])
    const [obras, setObras] = useState([])

    useEffect(()=>{
        async function fetchData() {
            const response = await api.get(`/repertorio-autors/${id}`)
            setAutor(response.data)
            setImage(response.data.image.formats.small || response.data.image)
            setConcertos(response.data.concertos)
            setObras(response.data.repertorio_obras)  
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
                        <img src={`https://admin.sinos.art.br${image.url}`} alt={`${image.name}`}/>
                    </div>
                    <div style={{marginTop: '5vh'}}>
                        {concertos.length > 0 ? 
                            <div className="autor-concertos">
                                <p><strong>Concertos deste autor</strong></p>
                                <div>
                                    {
                                        concertos.map((concerto, i)=>{
                                            return <Link key={i} to={`/concertos-sinos/concertos/${concerto.slug}`}>{concerto.title}</Link>
                                        })
                                    }
                                </div>
                            </div>: null}

                      {obras.length > 0 ? 
                            <div className="autor-obras">
                                <p><strong>Obras deste autor</strong></p>
                                <div>
                                    {
                                        obras.map((obra, i)=>{
                                            return <Link key={i} to={`/repertorio-sinos/obras/${obra.slug}`}>{obra.title}</Link>
                                        })
                                    }
                                </div>
                            </div>: null }
                    </div>
                </div>
                <div className="partituras-container" style={{textAlign: 'left'}}>
                    <ReactMarkdown source={autor.bio}/>
                </div>
            </div>
            <RedLink to="../">Voltar</RedLink>
        </Page>
            
    )
}
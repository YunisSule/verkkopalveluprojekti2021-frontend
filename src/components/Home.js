import React from 'react'
import './Home.css';
import banner from '../images/banner.jpg';

export default function Home() {
    return (
        <>
            <div class="d-flex flex-column bd-highlight mb-3" id="banner">
                
                <h1 className="text-center" id="header">Frisbeekauppa</h1>
                <p className="text-center" id="text">Kiekkojen erikiosliike<br>
                </br>Parhaat tarjoukset, isoin valikoima, nopea toimitus</p>

            </div>
        </>
    )
}

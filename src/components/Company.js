import React from 'react'
import image from '../images/Yritys.jpg'

export default function Company () {
  return (
    <div className="companyPage">
      <div className='company'>
        <h1 className='companyTitle'>Yrityksemme</h1>
        <img src={image} className='companyImage' alt='Logo' />
      </div>

      <div className='row justify-content-md-center p-2'>
        <div className='col-8'>
        Frisbeegolf on mukavan rento harrastus, jossa yhdistyy ulkonaliikkumisen ilo mielenkiintoiseen peliin. 
        Frisbeegolfia voit pelata yksin tai ryhmässä, tärkeintä on pitää hauskaa.
        </div>
      </div>

      <div className='row justify-content-md-center p-2'>
        <div className='col-8'>
        Yrityksemme on muodostunut intohimoststamme kyseistä lajia kohtaan sekä halusta jakaa tätä myös muille harrastajille.
        Pyrimme palvelemaan sekä uusia lajin harrastajia, että kaiken kokeneita veteraaneja ja tarjoamaan parhaat mahdolliset välineet jokaiselle taitotasolle järkevää ja kilpailukykyistä hinnoittelua unohtamatta.
        </div>
      </div>

      <div className='row justify-content-md-center p-2'>
        <div className='col-8'>
        Tavoitteenamme on tarjota Suomen kattavin ja laadukkain firsbeegolf välineiden verkkokauppa, josta löytyy niin isompien valmistajien perusvalikoima kuin pienempien valmistajienkin tuotteita eri puolilta maailmaa.
        </div>
      </div>

      <div className='row justify-content-md-center p-2'>
        <div className='col-8'>
        Toinen tavoitteemme on tarjota ensiluokkaista palvelua verkkokaupassamme. Jos tiedät, mitä tarvitset, voit tilata tavaran helposti.  Henkilökuntamme on ammattitaitoista ja tutustuu valikoimamme välineisiin perinpohjaisesti.
        </div>
      </div>

      <div className='row justify-content-md-center p-2'>
        <div className='col-8'>
            Frisbeegolf verkkokauppa on Oamk Verkkopalvleuprojekti- kurssin Ryhmän 11 projektityö.
        </div>
      </div>

    </div>
  )
}

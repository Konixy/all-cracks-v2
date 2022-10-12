import React, { Component } from 'react'
import config from './config'

export default class Footer extends Component {
  render() {
    return (
      <footer>
        <ul className="flex flex-row list-none justify-evenly">
          <li>Nous contacter</li>
          <li>Notre serveur discord</li>
          <li>DMCA (condition d'utilisation)</li>
          <li>Admin panel</li>
        </ul>
        <div className='text-center my-10'><i className='fa-regular fa-copyright'></i> All-Cracks.fr 2022. Tout droits réservés. Développé par la <a href={config.nightCorpInvite} className="text-blue-400 hover:underline" target="_blank" rel="noreferrer">NightCorp</a></div>
      </footer>
    )
  }
}

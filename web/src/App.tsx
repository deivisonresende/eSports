import './styles/main.css';
import axios from 'axios'
import { useState, useEffect } from 'react';
import logoImg from './assets/logo-nlw-eSports.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';

import * as Dialog from '@radix-ui/react-dialog'
import { CreateAdModal } from './components/CreateAdModal';

export interface Game {
    id: string;
    title: string;
    bannerUrl: string;
    _count: {
      ads: number;
    }
}

function App() {
  const [games, setGames] = useState<Game[]>([])

  useEffect(() => {
    axios('http://localhost:3333/games').then(response => setGames(response.data))
  }, [])

  return (
    <div className="max-w-6xl mx-auto flex flex-col items-center my-10">

      <img src={logoImg} alt="Logo NLW eSports" className="max-w-[200px]"/>

      <h1 className="text-5xl text-white font-black mt-10 font-[inter]">
        Seu <span className="bg-nlw-gradient bg-clip-text text-transparent">duo</span> está aqui.
      </h1>

      <div className="grid grid-cols-6 gap-6 mt-12 max-w-5xl">
        {
          games.map(({ id, bannerUrl, title, _count: { ads }}) => (
            <GameBanner
              key={id}
              bannerUrl={bannerUrl}
              title={title}
              adsCount={ads}
              />
            ))
        }
      </div>
        <Dialog.Root>
          <CreateAdBanner />
          <CreateAdModal games={games}/>
       </Dialog.Root>
    </div>
  )
}

export default App

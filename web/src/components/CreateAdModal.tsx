import  * as Dialog from "@radix-ui/react-dialog";
import  * as CheckBox from "@radix-ui/react-checkbox";
import * as ToggleGroup from '@radix-ui/react-toggle-group';
import { Check, GameController } from "phosphor-react";
import { Input } from "./Form/Input";
import { weekDaysList } from "./Form/utils/weekDaysList";
import { Game } from '../App' 
import { useState, FormEvent } from "react";
import axios from 'axios';

interface Props {
  games: Game[]
}

export function CreateAdModal({ games }: Props) {
  const [weekDays, setWeekDays] = useState<string[]>([])
  const [useVoiceChanel, setUseVoiceChanel] = useState<boolean>(false)

  function handleCreateAd(event: FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)

    try {
      axios.post(`http://localhost:3333/games/${data.gameId}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: weekDays.join(','),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: useVoiceChanel
      })
      alert('Criado com sucesso')
    } catch (error) {
      alert('error')
    }
  }

  return (
    <Dialog.Portal>
    <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
      <Dialog.Content className='fixed bg-[#2A2634] px-8 py-8 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 max-w-xl shadow-lg shadow-black/25 rounded-lg'>
        <Dialog.Title className='text-3xl font-black font-[inter]'>Publique um anúncio</Dialog.Title>
            <form onSubmit={handleCreateAd} className='mt-6 flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="game" className='font-semibold'>Qual o game?</label>

                <select 
                id="gameId" 
                name="gameId"
                className="bg-zinc-900 py-3 px-4 rounded text-sm appearance-none"
                defaultValue=""
                >
                  <option disabled selected value="">Selecione o game que deseja jogar</option>
                  { games.map(({ id, title }) => <option key={id} value={id}>{title}</option>)}
                </select>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="name">Seu nome (ou nickname)</label>
                <Input id="name" name="name" type="text" placeholder='Como te chamam dentro do game?'/> 
              </div>

              <div className='grid grid-cols-2 gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                  <Input id="yearsPlaying" name="yearsPlaying" type="number" placeholder='Tudo bem ser ZERO'/> 
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="discord" placeholder=''>Qual seu Discord?</label>
                  <Input id="discord" name="discord" type="text" placeholder='Usuário#0000'/> 
                </div>
              </div>  

              <div className='flex gap-6'>
                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays" placeholder='Usuário#0000'>Quando costuma jogar?</label>
                  <ToggleGroup.Root 
                    type="multiple" 
                    className='grid grid-cols-7 gap-4' 
                    value={weekDays}
                    onValueChange={setWeekDays}
                  >

                  {
                    weekDaysList.map(weekDay =>(
                      <ToggleGroup.Item 
                      className={`w-10 h-10 rounded text-zinc-600 ${weekDays.includes(weekDay.numValue) ? 'bg-violet-500' : 'bg-zinc-900'}`} 
                      value={weekDay.numValue} 
                      title={weekDay.title}> 

                      {weekDay.value}
                      </ToggleGroup.Item>
                    ))
                  }
                  </ToggleGroup.Root>
                </div>

                <div className='flex flex-col gap-2'>
                  <label htmlFor="weekDays" placeholder='Usuário#0000'>Qual horário do dia?</label>
                  <div className='grid grid-cols-2 gap-2'>
                    <Input id="hourStart" name="hourStart" type="time" placeholder='De'/>
                    <Input id="hourEnd" name="hourEnd" type="time" placeholder='Até'/>
                  </div>
                </div>
              </div>

              <label className='mt-2 flex items-center gap-2 text-sm'>
              <CheckBox.Root 
              className="w-6 h-6 rounded bg-zinc-900"
              onCheckedChange={(checked) => checked ? setUseVoiceChanel(true) : setUseVoiceChanel(false)}
              >
                <CheckBox.Indicator>
                  <Check className="w-6 h-6 p-1 text-emerald-400"/>
                </CheckBox.Indicator>
              </CheckBox.Root>
              Costumo me conectar ao chat de voz
              </label>

              <footer className='mt-4 flex justify-end gap-4'>
                <Dialog.Close 
                type='button'
                className='bg-zinc-500 px-5 h-12 rounded-md font-semibold font-[inter] hover:bg-zinc-600'
                >
                  Cancelar
                </Dialog.Close>

                <button 
                type="submit"
                className='bg-violet-500 px-5 h-12 rounded-md font-semibold font-[inter] flex items-center gap-3 hover:bg-violet-600'
                >
                  <GameController size={24}/>
                  Encontrar duo
                </button>
              </footer>
            </form>
      </Dialog.Content>
    </Dialog.Overlay>
  </Dialog.Portal>
  )
}
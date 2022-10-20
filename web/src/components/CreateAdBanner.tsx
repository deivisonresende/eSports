import { MagnifyingGlassPlus } from "phosphor-react";

import * as Dialog from '@radix-ui/react-dialog'

export function CreateAdBanner(){
  return (
    <div className="pt-1 bg-nlw-gradient self-stretch rounded-t-lg mt-12 rounded-b-3xl">
    <div className="bg-[#2A2634] px-8 py-8 rounded-lg flex place-content-between">
      <div>
        <strong className="block font-[inter] text-white text-2xl">Não encontrou seu duo?</strong>
        <span className="block text-zinc-400">Publique um anúncio para encontrar novos players!</span>
      </div>
      
      <Dialog.Trigger className="py-3 px-4 bg-violet-500 hover:bg-violet-600 text-white rounded-lg flex items-center gap-3">
        <MagnifyingGlassPlus size={24}/>
        Publicar anúncio
      </Dialog.Trigger>
    </div>
  </div>
  );
}
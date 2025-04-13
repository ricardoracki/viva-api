'use client'

import { InputBlock } from '@/components/input-block'
import { Search } from 'lucide-react'

export default function Users() {
  return (
    <div className="flex flex-col h-full overflow-auto p-6">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-xl text-text">Usuários</h1>
        <form action="">
          <InputBlock>
            <InputBlock.FieldRoot>
              <Search className="text-gray-700" />
              <InputBlock.Field placeholder="Buscar membro" />
            </InputBlock.FieldRoot>
          </InputBlock>
        </form>
      </div>
    </div>
  )
}

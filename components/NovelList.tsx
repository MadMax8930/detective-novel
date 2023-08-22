import React from 'react'
import { isEmpty } from 'lodash'
import { NovelCard } from '@/components'

interface NovelListProps {
   header: string;
   data: Record<string, any>[];
}

const NovelList: React.FC<NovelListProps> = ({ header, data }) => {
   if (isEmpty(data)) { return null }
   
   return (
      <div className="min-h-full px-6 md:px-16 lg:px-12 space-y-8">
         <div className="lg:pt-24 pt-16 pb-4">
            <p className="title-header text-black-100 md:text-start text-center text-sm md:text-base lg:text-xl font-semibold md:pl-1 mt-3 mb-1">
               {header}
            </p>
            <div className="grid lg:grid-cols-5 md:grid-cols-3 grid-cols-2 gap-0.5">
               {data.map((novel) => (
                  <NovelCard key={novel.id} data={novel} />
               ))}
            </div>
         </div>     
      </div>
   )
}

export default NovelList
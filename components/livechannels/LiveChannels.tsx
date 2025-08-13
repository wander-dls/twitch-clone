import { useState } from 'react';
import { Tables } from '@/database/database.types'
import { Arrow } from '@/components/Icons'
import Image from 'next/image'


const LiveChannels = ({livestreams}:{livestreams: Tables<'livestreams'>[]}) => {
    const [ expanded, setExpanded ] = useState(false);
  return (
    
    <div className={`bg-twitch-ice text-gray-500 p-2 f;ex f;ex-col gap-1 overflow-y-scroll ${expanded ? 'mx-w-xs' : ''}`}>
        <div className={`flex items-center pb-2 text-black ${expanded ? 'justify-between' : 'justify-center'}`}>
            {expanded && (
                <h2 className='text-sm uppercase font-bold'>Live Channels</h2>
            )}
            <button className={`test-sm text-secondary cursor-pointer rounded-full hover:bg-gray-200 p-1 ${expanded ? '' : 'rotate-180'} transition-all duration-150 ease-in-out`} onClick={() => setExpanded(!expanded)}>
                <Arrow />
            </button>
        </div>
        {livestreams.map(livestreams => (
            <button key={livestreams.id} onClick={() => {console.log(`CLicked on ${livestreams.name}`)}} className='flex items-center gap-2 text-secondary cursor-pointer'>
                <Image src={livestreams.imageUrl} alt={livestreams.name} width={40} height={40} className='rounded-full' />
                {expanded && (
                <>
                    <div className='gap-1'>
                        <h3 className='text-sm font-bold text-black text-left'>
                            {livestreams.name}
                        </h3>
                        <p className='text-xs text-start'>
                            {livestreams.categories.join(', ')}
                        </p>
                    </div>
                    <div className='flex items-center justify-start gap-1 ml-auto'>
                        <div className='size-2 bg-red-500 rounded-full' />
                    </div>  
                </>
                )}
            </button>
        ))}
    </div>
  )
}
export default LiveChannels
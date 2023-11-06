'use client'
import React, { useEffect, useState } from 'react'
import { Channel as StreamChannel, StreamChat } from 'stream-chat'
import {
  Chat,
  Channel,
  Window,
  ChannelHeader,
  MessageList,
  MessageInput,
  Thread,
  ChannelList,
} from 'stream-chat-react'
import { ChannelPreviewMessenger } from '../(components)/ChannelPreviewMessenger'

import { useParams, useRouter } from 'next/navigation'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { zust } from '@/store'
import { createUserToken } from '@/utils/stream'
import { uuid } from '@supabase/supabase-js/dist/main/lib/helpers'

// import { zust } from '@/store'

function Messages() {
  const [client, setClient] = useState<StreamChat | null>(null)
  const [channel, setChannel] = useState<StreamChannel | null>(null)
  const [friend, setFriend] = useState(null)
  const userData = zust((state) => state.user)

  const params = useParams()
  const router = useRouter()

  const supabase = createClientComponentClient()

  useEffect(() => {
    const init = async () => {
      if (!userData?.id) {
        return
      }

      const token = await createUserToken(userData.id)

      const client = StreamChat.getInstance('gasc55sqc9yx')
      await client.connectUser(
        {
          id: userData.id,
          name: `Mitry 2`,
        },
        token
      )
      setClient(client)

      if (params.slug && params?.slug[0]) {
        const { data, error } = await supabase
          .from('users')
          .select()
          .eq('id', params.slug[0])
        if (error) {
          router.push('/messages')
        } else {
          setFriend(data[0])

          const channel = client.channel('messaging', uuid(), {
            members: [userData.id, data[0].id],
          })
          await channel.create()
        }
      }
    }
    init()
  }, [userData])

  return (
    <div className={'mx-auto h-[calc(100vh-100px)] max-w-7xl'}>
      {client && (
        <Chat client={client}>
          <div className={' h-[calc(100vh-100px)]  '}>
            <div className={'w-96 max-w-full'}>
              <ChannelList Preview={ChannelPreviewMessenger} />
            </div>
            <div className={'w-full '}>
              <Channel>
                <Window>
                  <ChannelHeader />
                  <div className={' h-[calc(100vh-220px)] overflow-hidden'}>
                    <MessageList />
                  </div>
                  <MessageInput noFiles={true} />
                </Window>
                <Thread />
              </Channel>
            </div>
          </div>
        </Chat>
      )}
    </div>
  )
}

export default Messages

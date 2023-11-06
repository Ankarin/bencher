import React, { useRef } from 'react'
import clsx from 'clsx'

import type { ChannelPreviewUIComponentProps } from 'stream-chat-react'

import type { DefaultStreamChatGenerics } from 'stream-chat-react/dist/types/types'

const UnMemoizedChannelPreviewMessenger = <
  StreamChatGenerics extends
    DefaultStreamChatGenerics = DefaultStreamChatGenerics,
>(
  props: ChannelPreviewUIComponentProps<StreamChatGenerics>
) => {
  const {
    active,

    channel,
    className: customClassName = '',

    displayTitle,
    latestMessage,
    onSelect: customOnSelectChannel,
    setActiveChannel,
    unread,
    watchers,
  } = props

  const channelPreviewButton = useRef<HTMLButtonElement | null>(null)

  const onSelectChannel = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (customOnSelectChannel) {
      customOnSelectChannel(e)
    } else if (setActiveChannel) {
      setActiveChannel(channel, watchers)
    }
    if (channelPreviewButton?.current) {
      channelPreviewButton.current.blur()
    }
  }

  return (
    <button
      aria-label={`Select Channel: ${displayTitle || ''}`}
      aria-selected={active}
      className={clsx(
        `str-chat__channel-preview-messenger str-chat__channel-preview`,
        active && 'str-chat__channel-preview-messenger--active',
        unread && unread >= 1 && 'str-chat__channel-preview-messenger--unread',
        customClassName
      )}
      data-testid='channel-preview-button'
      onClick={onSelectChannel}
      ref={channelPreviewButton}
      role='option'
    >
      <div className='str-chat__channel-preview-messenger--right str-chat__channel-preview-end'>
        <div className='str-chat__channel-preview-end-first-row'>
          <div className='str-chat__channel-preview-messenger--name'>
            <span>{displayTitle}</span>
          </div>
          {!!unread && (
            <div
              className='str-chat__channel-preview-unread-badge'
              data-testid='unread-badge'
            >
              {unread}
            </div>
          )}
        </div>
        <div className='str-chat__channel-preview-messenger--last-message'>
          {latestMessage}
        </div>
      </div>
    </button>
  )
}

/**
 * Used as preview component for channel item in [ChannelList](#channellist) component.
 * Its best suited for messenger type chat.
 */
export const ChannelPreviewMessenger = React.memo(
  UnMemoizedChannelPreviewMessenger
) as typeof UnMemoizedChannelPreviewMessenger

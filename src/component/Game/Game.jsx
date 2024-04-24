import React, { useState } from 'react';
import Tictactoe from '../Tic-tac-toe';
import { Window, MessageList, MessageInput } from 'stream-chat-react';
import "./Chat.css"

function Game({channel, setChannel}) {
    const [playerJoined, setPlayerJoined] = useState(channel.state.watcher_count === 2)
    
    
    channel.on("user.watching.start", event => {
        setPlayerJoined(event.watcher_count === 2)
    })
    
    if(!playerJoined){
        return <h1 className='joined-text'>Waiting for other player to join...</h1>
    }

  return (
    <div className='gameContainer'>
        <Tictactoe />
        {/* Chat */}
        <div className='chat'>
          <Window>
            <MessageList 
            hideDeletedMessages 
            closeReactionSelectorOnClick
            disableDateSeparator
            messageActions={['react']}
            />
            <MessageInput noFiles/>
          </Window>
        
        {/* Leave game button */}
        <button
        className='leavegame-button'
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null)
        }}
        >Leave game</button>
        </div>
    </div>
  )
}

export default Game

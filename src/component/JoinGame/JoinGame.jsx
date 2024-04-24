import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import Game from '../Game/Game';
import CustomInput from '../CustomInput/CustomInput';

function JoinGame({onClick}) {
    const [player1, setPlayer1] = useState("");
    const { client } = useChatContext();
    const [channel, setChannel] = useState(null);


    const createChannel = async () => {
        const response = await client.queryUsers({ name: { $eq: player1 } })

        if (response.users.length === 0) {
            alert("User not found")
            return
        }

        const newChannel = await client.channel("messaging", {
            members: [client.userID, response.users[0].id]
        })

        await newChannel.watch()
        setChannel(newChannel)
    }

    return (
        <>
            {channel ?
                <Channel channel={channel} Input={CustomInput}>
                    <Game channel={channel} setChannel={setChannel}/>
                </Channel> : (
                    <div className='joinGame'>
                        <h4>Create Game</h4>
                        <input
                            placeholder='Rival name'
                            onChange={e => setPlayer1(e.target.value)}
                        />
                       <div className='button'>
                            <button onClick={createChannel}>Join Game</button>
                            <button className='log-out' onClick={onClick}>Log Out</button>
                       </div>
                    </div>

                )}

        </>
    )
}

export default JoinGame

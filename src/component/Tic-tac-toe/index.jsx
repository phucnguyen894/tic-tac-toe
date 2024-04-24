import { useEffect, useState } from "react";
import { useChannelStateContext, useChatContext } from "stream-chat-react";
import { winnerPattern } from "./winnerPattern";
import './style.css'

function Squares({ value, onClick, playerTurn }) {
    const changeSymbol = playerTurn === 'X' ? 'X' : 'O'
    let changeClass
    if (!value) {
        changeClass = `is-${changeSymbol.toLowerCase()}`
    }
    return <button
        onClick={onClick}
        className={`squares ${changeClass}`}
        // className={`squares`}
    >
        {value}
    </button>
}


function Tictactoe() {
    const [squares, setSquares] = useState(Array(80).fill(''))
    //set X as default and it's true => O will be false
    const [player, setPlayer] = useState('X')
    const [isXTurn, setIsXTurn] = useState('X')
    const [status, setStatus] = useState('')
    

    const { channel } = useChannelStateContext()
    const { client } = useChatContext()



    const handleClick = async (currentIndex) => {
        let cpySquares = [...squares]
        // stop function if square has value 
        if (getWinner(squares) || cpySquares[currentIndex]) return
        if (isXTurn === player) {
            setIsXTurn(player === "X" ? "O" : "X")

            await channel.sendEvent({
                type: 'game-move',
                data: { currentIndex, player},
            })

            setSquares(
                cpySquares.map((value, index) => {
                    if (index === currentIndex && value === "") {
                        return player;
                    }
                    return value
                })
            )
        }
    }

    channel.on((e) => {
        if (e.type === 'game-move' && e.user.id !== client.userID) {
            const currentPlayer = e.data.player === "X" ? "O" : "X";
            setPlayer(currentPlayer)
            setIsXTurn(currentPlayer)
            setSquares(
                squares.map((value, index) => {
                    if (index === e.data.currentIndex && value === "") {
                        return e.data.player
                    }
                    return value
                })
            )
        }
    })

    // const handleRestart = () => {
    //     setIsXTurn(getWinner(squares) === 'Di ut' ? 'O' : 'X')
    //     setSquares(Array(9).fill(''))

    // }

    // Winner Pattern
    const getWinner = (squares) => {
        for (let i = 0; i < winnerPattern.length; i++) {
            // it's gonna run i times in winnerPattern to find the winner and compare x,y,z
            const [a, b, c, d, e] = winnerPattern[i]

            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c] && squares[a] === squares[d] && squares[a] === squares[e]) {

                return (squares[a] === 'X' ? "X" : "O")
            }
        }
        return null
    }



    useEffect(() => {
        if (!getWinner(squares) && squares.every(item => item !== '')) {
            setStatus(`The result is draw! Please restart the game`)
        } else if (getWinner(squares)) {
            setStatus(`Winner is ${getWinner(squares)}`)
        } else {
            channel.on((e) => {
                if (e.type === 'game-move' && e.user.id !== client.userID) {
                    const currentPlayer = e.user.name
                    setStatus(`${currentPlayer} marked`)
                } else {
                    const currentPlayer = e.user.name
                    setStatus(`${currentPlayer} marked`)
                }
            })
            
            // setStatus(`${namePlayer}`)

        }
    }, [squares])


    return (
        <div className="tic-tac-toe-top">
            <div>
                <h1> {status}</h1>
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[0]} onClick={() => handleClick(0)} />
                <Squares playerTurn={isXTurn} value={squares[1]} onClick={() => handleClick(1)} />
                <Squares playerTurn={isXTurn} value={squares[2]} onClick={() => handleClick(2)} />
                <Squares playerTurn={isXTurn} value={squares[3]} onClick={() => handleClick(3)} />
                <Squares playerTurn={isXTurn} value={squares[4]} onClick={() => handleClick(4)} />
                <Squares playerTurn={isXTurn} value={squares[5]} onClick={() => handleClick(5)} />
                <Squares playerTurn={isXTurn} value={squares[6]} onClick={() => handleClick(6)} />
                <Squares playerTurn={isXTurn} value={squares[7]} onClick={() => handleClick(7)} />
                <Squares playerTurn={isXTurn} value={squares[8]} onClick={() => handleClick(8)} />
                <Squares playerTurn={isXTurn} value={squares[9]} onClick={() => handleClick(9)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[10]} onClick={() => handleClick(10)} />
                <Squares playerTurn={isXTurn} value={squares[11]} onClick={() => handleClick(11)} />
                <Squares playerTurn={isXTurn} value={squares[12]} onClick={() => handleClick(12)} />
                <Squares playerTurn={isXTurn} value={squares[13]} onClick={() => handleClick(13)} />
                <Squares playerTurn={isXTurn} value={squares[14]} onClick={() => handleClick(14)} />
                <Squares playerTurn={isXTurn} value={squares[15]} onClick={() => handleClick(15)} />
                <Squares playerTurn={isXTurn} value={squares[16]} onClick={() => handleClick(16)} />
                <Squares playerTurn={isXTurn} value={squares[17]} onClick={() => handleClick(17)} />
                <Squares playerTurn={isXTurn} value={squares[18]} onClick={() => handleClick(18)} />
                <Squares playerTurn={isXTurn} value={squares[19]} onClick={() => handleClick(19)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[20]} onClick={() => handleClick(20)} />
                <Squares playerTurn={isXTurn} value={squares[21]} onClick={() => handleClick(21)} />
                <Squares playerTurn={isXTurn} value={squares[22]} onClick={() => handleClick(22)} />
                <Squares playerTurn={isXTurn} value={squares[23]} onClick={() => handleClick(23)} />
                <Squares playerTurn={isXTurn} value={squares[24]} onClick={() => handleClick(24)} />
                <Squares playerTurn={isXTurn} value={squares[25]} onClick={() => handleClick(25)} />
                <Squares playerTurn={isXTurn} value={squares[26]} onClick={() => handleClick(26)} />
                <Squares playerTurn={isXTurn} value={squares[27]} onClick={() => handleClick(27)} />
                <Squares playerTurn={isXTurn} value={squares[28]} onClick={() => handleClick(28)} />
                <Squares playerTurn={isXTurn} value={squares[29]} onClick={() => handleClick(29)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[30]} onClick={() => handleClick(30)} />
                <Squares playerTurn={isXTurn} value={squares[31]} onClick={() => handleClick(31)} />
                <Squares playerTurn={isXTurn} value={squares[32]} onClick={() => handleClick(32)} />
                <Squares playerTurn={isXTurn} value={squares[33]} onClick={() => handleClick(33)} />
                <Squares playerTurn={isXTurn} value={squares[34]} onClick={() => handleClick(34)} />
                <Squares playerTurn={isXTurn} value={squares[35]} onClick={() => handleClick(35)} />
                <Squares playerTurn={isXTurn} value={squares[36]} onClick={() => handleClick(36)} />
                <Squares playerTurn={isXTurn} value={squares[37]} onClick={() => handleClick(37)} />
                <Squares playerTurn={isXTurn} value={squares[38]} onClick={() => handleClick(38)} />
                <Squares playerTurn={isXTurn} value={squares[39]} onClick={() => handleClick(39)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[40]} onClick={() => handleClick(40)} />
                <Squares playerTurn={isXTurn} value={squares[41]} onClick={() => handleClick(41)} />
                <Squares playerTurn={isXTurn} value={squares[42]} onClick={() => handleClick(42)} />
                <Squares playerTurn={isXTurn} value={squares[43]} onClick={() => handleClick(43)} />
                <Squares playerTurn={isXTurn} value={squares[44]} onClick={() => handleClick(44)} />
                <Squares playerTurn={isXTurn} value={squares[45]} onClick={() => handleClick(45)} />
                <Squares playerTurn={isXTurn} value={squares[46]} onClick={() => handleClick(46)} />
                <Squares playerTurn={isXTurn} value={squares[47]} onClick={() => handleClick(47)} />
                <Squares playerTurn={isXTurn} value={squares[48]} onClick={() => handleClick(48)} />
                <Squares playerTurn={isXTurn} value={squares[49]} onClick={() => handleClick(49)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[50]} onClick={() => handleClick(50)} />
                <Squares playerTurn={isXTurn} value={squares[51]} onClick={() => handleClick(51)} />
                <Squares playerTurn={isXTurn} value={squares[52]} onClick={() => handleClick(52)} />
                <Squares playerTurn={isXTurn} value={squares[53]} onClick={() => handleClick(53)} />
                <Squares playerTurn={isXTurn} value={squares[54]} onClick={() => handleClick(54)} />
                <Squares playerTurn={isXTurn} value={squares[55]} onClick={() => handleClick(55)} />
                <Squares playerTurn={isXTurn} value={squares[56]} onClick={() => handleClick(56)} />
                <Squares playerTurn={isXTurn} value={squares[57]} onClick={() => handleClick(57)} />
                <Squares playerTurn={isXTurn} value={squares[58]} onClick={() => handleClick(58)} />
                <Squares playerTurn={isXTurn} value={squares[59]} onClick={() => handleClick(59)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[60]} onClick={() => handleClick(60)} />
                <Squares playerTurn={isXTurn} value={squares[61]} onClick={() => handleClick(61)} />
                <Squares playerTurn={isXTurn} value={squares[62]} onClick={() => handleClick(62)} />
                <Squares playerTurn={isXTurn} value={squares[63]} onClick={() => handleClick(63)} />
                <Squares playerTurn={isXTurn} value={squares[64]} onClick={() => handleClick(64)} />
                <Squares playerTurn={isXTurn} value={squares[65]} onClick={() => handleClick(65)} />
                <Squares playerTurn={isXTurn} value={squares[66]} onClick={() => handleClick(66)} />
                <Squares playerTurn={isXTurn} value={squares[67]} onClick={() => handleClick(67)} />
                <Squares playerTurn={isXTurn} value={squares[68]} onClick={() => handleClick(68)} />
                <Squares playerTurn={isXTurn} value={squares[69]} onClick={() => handleClick(69)} />
            </div>
            <div>
                <Squares playerTurn={isXTurn} value={squares[70]} onClick={() => handleClick(70)} />
                <Squares playerTurn={isXTurn} value={squares[71]} onClick={() => handleClick(71)} />
                <Squares playerTurn={isXTurn} value={squares[72]} onClick={() => handleClick(72)} />
                <Squares playerTurn={isXTurn} value={squares[73]} onClick={() => handleClick(73)} />
                <Squares playerTurn={isXTurn} value={squares[74]} onClick={() => handleClick(74)} />
                <Squares playerTurn={isXTurn} value={squares[75]} onClick={() => handleClick(75)} />
                <Squares playerTurn={isXTurn} value={squares[76]} onClick={() => handleClick(76)} />
                <Squares playerTurn={isXTurn} value={squares[77]} onClick={() => handleClick(77)} />
                <Squares playerTurn={isXTurn} value={squares[78]} onClick={() => handleClick(78)} />
                <Squares playerTurn={isXTurn} value={squares[79]} onClick={() => handleClick(79)} />
            </div>

            <div className="btn-tictactoe">
                {/* <button onClick={handleRestart}>Restart</button> */}
            </div>
        </div>
    );
}

export default Tictactoe;
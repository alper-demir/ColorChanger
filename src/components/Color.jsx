import React, { useEffect, useState } from 'react'
import '../style.css'
import HistoryColor from './HistoryColor'

const Color = () => {

    const values = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'a', 'b', 'c', 'd', 'e', 'f'];

    const [hexa, setHexa] = useState('')
    const [info, setInfo] = useState(false)
    const [history, setHistory] = useState([])

    useEffect(() => {
        localStorage.setItem('currentColor', JSON.stringify(hexa))
        document.querySelector('body').style.background = hexa
    }, [hexa])

    const randomize = () => {
        let hexa = '#'
        for (let i = 0; i < 6; i++) {
            var item = Math.floor(Math.random() * values.length);
            hexa += values[item]
        }
        setHexa(hexa)
    }

    useEffect(() => {
        randomize()
        localStorage.getItem('history') && setHistory(JSON.parse(localStorage.getItem('history')))
    }, [])

    useEffect(() => {
        history.length > 0 && localStorage.setItem('history', JSON.stringify(history))
    }, [history])

    const copyColor = () => {
        if (history.length !== 10) {
            navigator.clipboard.writeText(hexa)
            setHistory((prev) => [...prev, hexa])
            setInfo(true)
        }
        else {
            history.shift()
            setHistory((prev) => [...prev, hexa])
            setInfo(true)
        }
        setTimeout(() => { setInfo(false) }, 2000)
    }


    return (
        <div className='d-flex justify-content-center align-items-center' style={{ height: '100vh' }}>
            <div className='text-center' style={{ background: '#c7d1ce90', padding: '30px', borderRadius: '10px' }}>
                <h4>Hexa: {hexa}</h4>
                <div className='d-flex justify-content-center align-items-center'>
                    <button className='btn btn-outline-danger btn-lg' onClick={randomize} style={{ fontWeight: 'bold' }}>Change</button>
                    <i className="fas fa-copy" onClick={copyColor} style={{ marginLeft: '15px', fontSize: '35px', color: hexa }}></i>
                </div>
            </div>

            {
                info && <div className="info">Coppied!</div>
            }
            <HistoryColor history={history} info={info} setInfo={setInfo} setHistory={setHistory} />
        </div>
    )
}

export default Color
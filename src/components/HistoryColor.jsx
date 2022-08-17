import '../style.css'

const HistoryColor = ({ history, setHistory, setInfo }) => {

    const copy = (item) => {
        navigator.clipboard.writeText(item)
        setInfo(true)
        setTimeout(() => { setInfo(false) }, 2000)
    }

    const removeColor = (item) => {
        let index = history.indexOf(item)
        history.splice(index, 1)
        setHistory([...history])
    }

    const clearHistory = () => {
        localStorage.removeItem('history')
        setHistory([])
    }

    return (
        history.length > 0 &&
        <div id='history-color'>
            <ul className="d-flex justify-content-center flex-column p-3 rounded " style={{ background: '#e2dae8' }}>
                {history.map((item, index) => (
                    <li className='my-2 p-1 text-center' key={index} style={{ height: '52px', background: item, borderRadius: '10px', color: '#fff' }}>
                        <span onClick={() => { copy(item) }} style={{ fontSize: '14px' }} >{item}</span>
                        <div>
                            <i className="fa fa-close" onClick={() => { removeColor(item) }}></i>
                        </div>
                    </li>
                ))
                }
                <i className="fa fa-close fa-2x text-center m-1" onClick={clearHistory}></i>
            </ul>
        </div>
    )
}

export default HistoryColor
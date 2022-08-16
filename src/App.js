import { useEffect, useMemo, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { solutions } from './Solutions'

function App() {
  const PLACE_HOLDER = ''
  const BOXES = 9

  const [indexer, setIndexer] = useState(0)
  const [current, setCurrent] = useState(true)
  const [isFinished, setIsFinished] = useState(false)
  const [gameHistory,setGameHistory] = useState([{indexer:0,current:true,isFinished:false,vals:Array(BOXES).fill(PLACE_HOLDER)}])
  const [flag, setFlag] = useState(true)
  const [finishedCount, setFinishedCount] = useState(999)

  function setData(index) {
    let data = gameHistory[indexer]
    let tempList = [...data.vals]
    tempList[index] = current ? 'X' : 'O'

    if(flag === false){
      setGameHistory([...gameHistory.slice(0,indexer+1),{indexer:data.indexer+1,current:!data.current,vals:[...tempList]}])
      setFinishedCount(999)
    } else {
      setGameHistory([...gameHistory,{indexer:data.indexer+1,current:!data.current,vals:[...tempList]}])
    }
    setIndexer(data.indexer+1)
    setCurrent(!data.current)
    setFlag(true)

  }

  function validateData() {
    solutions.forEach((item,index)=>{
    let data = gameHistory[indexer]
    let tempList = [...data["vals"]]
    let temp = [tempList[item[0]],tempList[item[1]],tempList[item[2]]]
    
      if(JSON.stringify(temp) === '["X","X","X"]' || JSON.stringify(temp) === '["O","O","O"]') {

        toast(`${!data.current ? 'X' : 'O'} - won the game !!!`,{
          position: toast.POSITION.TOP_CENTER
        });

        setIsFinished(true)
        setFinishedCount(indexer)
      }
    })
  }

  function resetBoard() {
    setGameHistory([{indexer:0,current:true,isFinished:false,vals:Array(BOXES).fill(PLACE_HOLDER)}])
    setIsFinished(false)
    setCurrent(true)
    setIndexer(0)
  }

  function gotoHistory(n,obj) {
    setIndexer(obj.indexer)
    setIsFinished(obj.isFinished)
    setCurrent(obj.current)
    setFlag(false)
  }

  useEffect(() => {
    validateData()
  },[gameHistory,indexer])

  return (
    <>
    <ToastContainer className='toaster' />
    <div className='header'>
      <div className="logo">Tic-Tac-Toe</div>
      <div>
        {(isFinished || indexer === 9 || finishedCount === indexer) ? <button className='reset-btn' onClick={resetBoard}>Reset Board</button> : <div className='current-player'>Next Player : {current ? 'X' : 'O'}</div>}
      </div>
      </div>
    <div className="container">
    
      <div className='board'>
        {gameHistory[indexer]['vals'].map((val,index) => (
        <button disabled={(val !== PLACE_HOLDER || isFinished || finishedCount === indexer)} onClick={()=> setData(index)} key={index} className='box'>
          {val}
        </button>
        ))}
      </div>

    <div className='time-travel'>
      <div className='move'>Moves -</div>
      {gameHistory.map((val,index) => (
        <button className='travel-btn' onClick={() => gotoHistory(index,val)} key={index}>{`Go to step ${index}`}</button>
        ))}
    </div>
    </div>
    </>
  );
}

export default App;

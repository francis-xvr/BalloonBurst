import { useEffect, useState } from 'react';
import '../css/Welcome.css';
import { getLeaderBoard } from '../api/GameManagerService';

export default function LeaderBoard(){
    const [leaderBoard, setLeaderBoard] = useState([]);

    useEffect(()=>{
        getLeaderBoard(10)
        .then((res)=>{
            if(res.status === 200){
                setLeaderBoard(res.data);
            }
        }).catch((err)=>(console.err(err)));
    },[]);
    return (
        <div className='leaderBoardContainer'>
            <div className='leaderBoardTitle'>Leaderboard</div>
            <div className='leaderBoard'>
                <table className='leaderBoardTable'>
                    <thead>
                    <tr className='leaderBoardTableHead'>
                        <td>Username</td>
                        <td>| Score</td>
                        <td>| Level</td>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        leaderBoard.map((entry)=>{
                            return <tr className='leaderBoardTableBody' key={entry.player_id}>
                                <td>{entry.username}</td>
                                <td className='leaderBoardNos'>{entry.highscore}</td>
                                <td className='leaderBoardNos'>{entry.current_level}</td>
                            </tr>
                        })
                    }
                    </tbody>
                </table>
            </div>
        </div>
    );
}
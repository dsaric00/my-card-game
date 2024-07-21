import React from 'react';


function Details({player}){
    return(
        <div>
        <h2>Details:</h2>
        <p> {player.realName} </p>
        <p>{player.playerName}</p>
        <p>{player.asset}</p>
    </div>
    );
}

export default Details;

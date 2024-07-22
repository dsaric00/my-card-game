import React from 'react';


function Details({player}){
    return(
        <div>
        <h2>Details:</h2>
        <h5> Real Name:  {player.realName} </h5>
        <h5> Player Name:  {player.playerName} </h5>
        <h5> Asset:  {player.asset} </h5>
        
    </div>
    );
}

export default Details;

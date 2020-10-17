import React from 'react';

function SynonymBlock(props) {
    return(
        <div className="col b-1 d-inline-block p-2 m-1" key={props.id}>
            {props.word}
        </div>
    )
}

export default SynonymBlock;
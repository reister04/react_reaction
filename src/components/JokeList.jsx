import React from 'react';

const JokeList = ({jokes}) => {
    return jokes.slice(0,1).map((joke, index) => {
        return (
            <div key={index}>
                <p>{joke.setup}</p>
                <p>~~~~ {joke.punchline} ~~~~</p>
            </div>
        )
    });
}

export default JokeList;
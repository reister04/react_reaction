import React, { useState, useEffect }from 'react';
import {Container, Image, Col, Row, Form, InputGroup, Button} from 'react-bootstrap';

import './app.css';

import Jokes from './api/jokes';
import JokeList from './components/JokeList';

const App = () => {
    const [jokes, setJokes] = useState([]);
    const [reactions, setReactions] = useState([
        {name: "like", emoji: "👍", count: 0},
        {name: "heart", emoji: "❤️", count: 0},
        {name: "haha", emoji: "😂", count: 0},
        {name: "shock", emoji: "😯", count: 0},
        {name: "sad", emoji: "😢", count: 0},
        {name: "angry", emoji: "😡", count: 0}
    ]);
    
    useEffect(() => {
        getJokes();
        const jokes = JSON.parse(localStorage.getItem('jokes'));
        if (jokes) {
            setJokes(jokes);
        }
    }, []);

    useEffect(() => {
        if (jokes.length !== 0) {
            localStorage.setItem('jokes', JSON.stringify(jokes));
        }
    }, [jokes]);

    const getJokes = () => {
        Jokes.get("/jokes/ten")
            .then(response => setJokes(response.data))
            .catch(err => console.log(`Error: ${err}`));
    }

    const handleChangeJoke = () => {
        setJokes(jokes.slice(1).concat(jokes.slice(0, 1)));
        let newReactions = [...reactions].map((react) => ({ ...react, count: 0 }));
        setReactions(newReactions);
    }

    const handleReacts = (index) => {
        let newReactions = [...reactions];
        newReactions[index] = {
            ...newReactions[index],
            count: newReactions[index].count + 1
        };
        setReactions(newReactions);
    }
    
    return (
        <>
            <Container>
                <Container className="text-center bg-light text-dark border border-dark border-2 rounded mt-2" style={{maxWidth: 800}}>
                    <h1>Daily Jokes</h1>
                    <JokeList jokes={ jokes }/>
                    <Container>
                        <h3 className="mb-3">Reactions</h3>
                        <Container className="d-flex justify-content-center mb-2">
                            {reactions.map((react, index) => {
                                return (
                                    <div className="fs-3 mx-2 position-relative reaction" key={index}>
                                        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-secondary" style={{fontSize: 12}}>{react.count}</span>
                                        <div onClick={() => handleReacts(index)}>
                                            {react.emoji} 
                                        </div>
                                    </div>
                                )
                            })}
                        </Container>
                    </Container>
                    <Button variant="info" onClick={handleChangeJoke} className="mb-3">Next Joke</Button>
                </Container>
            </Container>
        </>
    )
}

export default App
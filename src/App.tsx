import React from 'react';
import { Staged } from './Staged';
import { articles } from './mocks';

const differentSort = [...articles];
differentSort.sort(() => 0.5 - Math.random());

export const App: React.FC = () => (
    <div className="App">
        <div className="top" />
        <div className="middle">
            <Staged>
                {articles.map((a, i) => (
                    <img
                        src={`https://cdn.pixabay.com/photo${a.cover}`}
                        alt={a.title}
                        key={i}
                        draggable={false}
                        onClick={() => console.log('image clicked: ' + a.title)}
                    />
                ))}
            </Staged>
        </div>
        <div className="bottom">
            <Staged>
                {differentSort.map((a, i) => (
                    <img
                        src={`https://cdn.pixabay.com/photo${a.cover}`}
                        alt={a.title}
                        key={i}
                        draggable={false}
                        onClick={() => console.log('image clicked: ' + a.title)}
                    />
                ))}
            </Staged>
        </div>
    </div>
);

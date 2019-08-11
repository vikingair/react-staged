import React from 'react';
import { Staged } from './staged/';
import { articles } from './mocks';

const differentSort = [...articles];
differentSort.sort(() => 0.5 - Math.random());

export const App: React.FC = () => (
    <div className="App">
        <div className="top" />
        <div className="middle">
            <Staged amount={3}>
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
            <Staged hideArrows noDrag autoSlide={3000}>
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

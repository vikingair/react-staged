import React from 'react';
import { Staged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

export const Example1: React.FC = () => (
    <div className="example-1">
        <h2>Example 1</h2>
        <p>{'{ amount: 3 }'}</p>
        <Staged amount={3}>
            {articles.map((a, i) => (
                <Img article={a} key={i} />
            ))}
        </Staged>
    </div>
);

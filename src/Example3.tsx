import React from 'react';
import { Staged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

export const Example3: React.FC = () => (
    <div className="example-3">
        <h2>Example 3</h2>
        <p>{'{ amount: 2, noDrag: true }'}</p>
        <Staged amount={2} noDrag>
            {articles.map((a, i) => (
                <Img article={a} key={i} />
            ))}
        </Staged>
    </div>
);

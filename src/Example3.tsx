import React from 'react';
import { Staged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

export const Example3: React.FC = () => (
    <div className="example-3">
        <div className="description">
            <h2>Example 3</h2>
            <p>{'{ amount: 2, noDrag: true }'}</p>
        </div>
        <Staged amount={2} noDrag>
            {articles.slice(0, 6).map((a, i) => (
                <Img article={a} key={i} />
            ))}
        </Staged>
    </div>
);

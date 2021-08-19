import React from 'react';
import { InfinityStaged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

export const Example1: React.FC = () => (
    <div className="example-1">
        <div className="description">
            <h2>Example 1</h2>
            <p>{'<InfinityStaged amount={3}>'}</p>
        </div>
        <InfinityStaged amount={3}>
            {articles.map((a, i) => (
                <Img data={a} key={i} />
            ))}
        </InfinityStaged>
    </div>
);

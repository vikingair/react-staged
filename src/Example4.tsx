import React from 'react';
import { InfinityStaged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

export const Example4: React.FC = () => (
    <div className="example-4">
        <div className="description">
            <h2>Example 4</h2>
            <p>{'Only 2 children'}</p>
            <p>{`<InfinityStaged animation="cubic-bezier(.19,.91,.24,.87)">`}</p>
        </div>
        <InfinityStaged animation="cubic-bezier(.19,.91,.24,.87)">
            <Img article={articles[0]} />
            <Img article={articles[1]} />
        </InfinityStaged>
    </div>
);

import React from 'react';
import { Staged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

export const Example4: React.FC = () => (
    <div className="example-4">
        <div className="description">
            <h2>Example 4</h2>
            <p>{'Only 2 children'}</p>
            <p>{`{ infinity: true, animation: 'cubic-bezier(.19,.91,.24,.87)' }`}</p>
        </div>
        <Staged infinity animation="cubic-bezier(.19,.91,.24,.87)">
            {articles.slice(0, 2).map((a, i) => (
                <Img article={a} key={i} />
            ))}
        </Staged>
    </div>
);

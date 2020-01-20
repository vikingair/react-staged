import React from 'react';
import { Staged } from './staged';

const nums = new Array(7).fill(null).map((_, i) => i + 1);

export const Example6: React.FC = () => {
    return (
        <div className="example-6">
            <div className="description">
                <h2>Example 6</h2>
                <p>- The slider automatically adjusts sliding amounts.</p>
                <p>{`<Staged amount={3}>`}</p>
            </div>
            <Staged amount={3}>
                {nums.map(n => (
                    <div className="huge-num-container" key={n}>
                        <div className="huge-num">{n}</div>
                    </div>
                ))}
            </Staged>
        </div>
    );
};

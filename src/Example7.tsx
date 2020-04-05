import React, { useCallback } from 'react';
import { Staged, useStaged } from './staged';

const nums = new Array(8).fill(null).map((_, i) => i + 1);

export const Example7: React.FC = () => {
    const staged = useStaged();

    // staged does not change since it's an react mutable ref, but the eslint rules for hooks don't allow
    // custom overrides for custom hooks. Hence we write staged into the dependency array even if not needed
    const onLeft = useCallback(() => staged.current.prev(), [staged]);
    // or simply do this to achieve the same result:
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onRight = useCallback(() => staged.current.next(), []);

    return (
        <div className="example-7">
            <div className="description">
                <h2>Example 7</h2>
                <div className="buttons">
                    <button onClick={onLeft}>LEFT</button>
                    <button onClick={onRight}>RIGHT</button>
                </div>
                <p>- The slider allows to handle paging from outside</p>
                <p>{`<Staged amount={3} ref={staged} noDrag hideArrows>`}</p>
            </div>
            <Staged amount={2} ref={staged} noDrag hideArrows>
                {nums.map((n) => (
                    <div className="huge-num-container" key={n}>
                        <div className="huge-num">{n}</div>
                    </div>
                ))}
            </Staged>
        </div>
    );
};

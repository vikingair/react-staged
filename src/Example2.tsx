import React, { useCallback, useState } from 'react';
import { Staged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

const differentSort = [...articles];
differentSort.sort(() => 0.5 - Math.random());

export const Example2: React.FC = () => {
    const [autoSlide, setAutoSlide] = useState<number | undefined>(5000);

    const onChange = useCallback(e => {
        const next = +e.target.value;
        if (!isNaN(next)) setAutoSlide(next || undefined);
    }, []);

    return (
        <div className="example-2">
            <h2>Example 2</h2>
            <p>{`{ hideArrows: true, autoSlide: ${autoSlide} }`}</p>
            <label htmlFor="example-2-autoSlide">autoSlide (in ms): </label>
            <input id="example-2-autoSlide" type="number" value={String(autoSlide || '')} onChange={onChange} />
            <Staged hideArrows autoSlide={autoSlide}>
                {differentSort.map((a, i) => (
                    <Img article={a} key={i} />
                ))}
            </Staged>
        </div>
    );
};

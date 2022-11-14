import React, { useCallback, useState } from 'react';
import { InfinityStaged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';

const differentSort = [...articles];
differentSort.sort(() => 0.5 - Math.random());

export const Example2: React.FC = () => {
    const [autoSlide, setAutoSlide] = useState<number | undefined>(5000);

    const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const next = +e.target.value;
        if (!isNaN(next)) setAutoSlide(next || undefined);
    }, []);

    return (
        <div className="example-2">
            <div className="description">
                <h2>Example 2</h2>
                <p>{`<InfinityStaged hideArrows autoSlide={${autoSlide}} animation="ease-in">`}</p>
                <label htmlFor="example-2-autoSlide">autoSlide (in ms): </label>
                <input id="example-2-autoSlide" type="number" value={String(autoSlide || '')} onChange={onChange} />
            </div>
            <div className="carousel">
                <InfinityStaged hideArrows autoSlide={autoSlide} animation="ease-in">
                    {differentSort.map((a, i) => (
                        <Img data={a} key={i} />
                    ))}
                </InfinityStaged>
            </div>
        </div>
    );
};

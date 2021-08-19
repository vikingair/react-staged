import React, { useCallback } from 'react';
import { InfinityStaged, OnSwipe, useStaged } from './staged';
import { articles } from './mocks';
import { Img } from './Img';
import aztecs from './assets/aztecs.svg';
import bookworm from './assets/bookworm.svg';

export const Example8: React.FC = () => {
    const staged = useStaged();

    const onSwipe = useCallback<OnSwipe>(
        ({ direction }) => {
            direction > 0 ? staged.current.next() : staged.current.prev();
        },
        [staged]
    );

    return (
        <div className="example-8">
            <div className="description">
                <h2>Example 8</h2>
                <p>{'Two overlapping stages'}</p>
                <p>{`<InfinityStaged ref={staged} className={'container__bg'} hideArrows>`}</p>
                <p>{`<InfinityStaged onSwipe={onSwipe} className={'container__fg'}>`}</p>
            </div>
            <div className="container">
                <InfinityStaged ref={staged} className={'container__bg'} hideArrows>
                    <Img data={articles[1]} />
                    <Img data={articles[0]} />
                </InfinityStaged>
                <InfinityStaged onSwipe={onSwipe} className={'container__fg'}>
                    <img key={'aztecs'} src={aztecs} alt={'Aztecs bird painting'} draggable={false} />
                    <img key={'bookworm'} src={bookworm} alt={'A worm reading a book'} draggable={false} />
                </InfinityStaged>
            </div>
        </div>
    );
};

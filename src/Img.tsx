import React, { useCallback, useState } from 'react';
import { Article } from './mocks';

export type ImgProps = { article: Article };

export const Img: React.FC<ImgProps> = ({ article: { title, cover } }) => {
    const [clicked, setClicked] = useState<boolean>(false);

    const onClick = useCallback(() => {
        setClicked(true);
        setTimeout(() => setClicked(false), 250);
    }, []);

    return (
        <img
            className={clicked ? 'clicked' : ''}
            src={`https://cdn.pixabay.com/photo${cover}`}
            alt={title}
            draggable={false}
            onClick={onClick}
        />
    );
};

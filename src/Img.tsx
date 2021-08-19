import React, { useCallback, useState } from 'react';
import { ImgData } from './mocks';

export type ImgProps = { data: ImgData };

export const Img: React.FC<ImgProps> = ({ data: { title, cover } }) => {
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

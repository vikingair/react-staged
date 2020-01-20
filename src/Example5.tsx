import React from 'react';
import { useMedia } from 'react-use';
import { Staged } from './staged';
import { Article, articles } from './mocks';
import { Img } from './Img';

const ArticleView: React.FC<{ article: Article }> = ({ article }) => (
    <div className="article">
        <div className="cover">
            <Img article={article} />
        </div>
        <div className="title">{article.title}</div>
        <div className="authors">{article.authors}</div>
    </div>
);

export const Example5: React.FC = () => {
    const isSmall = useMedia('(max-width: 650px)');
    const amount = isSmall ? 2 : 5;
    return (
        <div className="example-5">
            <div className="description">
                <h2>Example 5</h2>
                <p>- You can stage arbitrary React nodes.</p>
                <p>- Please notice the breakpoint at 650px screen width.</p>
                <p>{`<Staged amount={${amount}}>`}</p>
            </div>
            <Staged amount={amount}>
                {articles.map((a, i) => (
                    <ArticleView article={a} key={i} />
                ))}
            </Staged>
        </div>
    );
};

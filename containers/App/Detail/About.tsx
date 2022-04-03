import React from 'react';
import classNames from 'classnames';
import { AppDetailProps } from '@lib/apps';
import { BiChevronUp, BiChevronDown } from 'react-icons/bi';

const About = ({ detail }: AppDetailProps) => {
    const [isMore, setIsMore] = React.useState(false);

    let components = (
        <>
            <div className="flex space-x-2 items-baseline">
                <h2 className="flex-none font-medium">장르:</h2>
                <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                    {detail.genres.join(', ')}
                </div>
            </div>
            <div className="flex space-x-2 items-baseline">
                <h2 className="flex-none font-medium">태그:</h2>
                <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                    {detail.tags.join(', ')}
                </div>
            </div>
        </>
    );

    switch (detail.app) {
        case 'game':
            components = (
                <>
                    {components}
                    {detail.developers.length > 0 && (
                        <div className="flex space-x-2 items-baseline">
                            <h2 className="flex-none font-medium">개발사:</h2>
                            <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                                {detail.developers.map((item) => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                    {detail.publishers.length > 0 && (
                        <div className="flex space-x-2 items-baseline">
                            <h2 className="flex-none font-medium">배급사:</h2>
                            <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                                {detail.publishers.map((item) => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                    {detail.franchises.length > 0 && (
                        <div className="flex space-x-2 items-baseline">
                            <h2 className="flex-none font-medium">
                                프렌차이즈:
                            </h2>
                            <div className="flex flex-wrap gap-x-2 text-gray-700 dark:text-gray-400">
                                {detail.franchises.map((item) => (
                                    <div key={item}>{item}</div>
                                ))}
                            </div>
                        </div>
                    )}
                </>
            );

        // no default
    }

    return (
        <>
            <button
                type="button"
                className="flex sm:hidden items-center text-sm gap-x-0.5"
                onClick={() => {
                    setIsMore(!isMore);
                }}
            >
                상세정보
                {isMore ? (
                    <BiChevronUp size={18} />
                ) : (
                    <BiChevronDown size={18} />
                )}
            </button>
            <div
                className={classNames(
                    'flex-col space-y-1 text-sm',
                    isMore ? 'flex' : 'hidden sm:flex'
                )}
            >
                {components}
            </div>
        </>
    );
};

export default About;

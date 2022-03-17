/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import { Portal } from 'react-portal';
import Router, { useRouter } from 'next/router';
import { AppProps } from '@lib/apps';
import { GameDetailPage } from 'pages/games/[...slug]';

interface LinkProps extends React.HTMLProps<HTMLAnchorElement>, AppProps {
    slug: string;
}

const Link = ({ app, appid, slug, children, ...props }: LinkProps) => {
    const href = slug ? `/${app}s/${appid}/${slug}/` : `/${app}s/${appid}/`;

    const [isOpen, setIsOpen] = React.useState(false);
    const [referrer, setReferrer] = React.useState('');

    const router = useRouter();
    const { pathname, asPath } = router;

    const popupMode = pathname !== `/${app}s`;

    const render = () => {
        switch (app) {
            case 'game':
                return <GameDetailPage appid={appid} />;

            default:
                return null;
        }
    };

    const openAsPath = () => {
        if (!popupMode) {
            Router.push(
                {},
                {
                    pathname: href
                },
                { shallow: true }
            );
            setReferrer(asPath);
        } else {
            setIsOpen(true);
        }

        document.body.style.overflow = 'hidden';
    };

    const closeAsPath = () => {
        if (!popupMode) {
            if (referrer !== asPath) {
                Router.push({}, referrer, { shallow: true });
            } else {
                Router.back();
            }
        } else {
            setIsOpen(false);
        }

        document.body.style.overflow = '';
    };

    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                closeAsPath();
            }
        };

        window.addEventListener('keydown', handleKeyPress);

        const handleHistoryChange = (url: string) => {
            if (decodeURI(url) === href) {
                setIsOpen(true);
                document.body.style.overflow = 'hidden';
            } else if (isOpen) {
                setIsOpen(false);
                document.body.style.overflow = '';
            }
        };

        if (!popupMode)
            router.events.on('beforeHistoryChange', handleHistoryChange);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);

            if (!popupMode)
                router.events.off('beforeHistoryChange', handleHistoryChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isOpen]);

    return (
        <>
            <a
                {...props}
                href={href}
                onClick={(e) => {
                    openAsPath();
                    e.preventDefault();
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        openAsPath();
                        e.preventDefault();
                    }
                }}
            >
                {children}
            </a>
            {isOpen && (
                <Portal>
                    <div className="fixed top-12 bottom-0 inset-x-0 overflow-y-auto z-30">
                        <div
                            onClick={() => {
                                closeAsPath();
                            }}
                            onKeyPress={(e) => {
                                if (e.key === 'Esc') {
                                    closeAsPath();
                                }
                            }}
                            role="presentation"
                            className="absolute inset-0"
                        />
                        <div className="relative z-40 max-w-6xl mx-auto shadow-xl dark:shadow-black/60 overflow-hidden">
                            <div className="w-full flex items-center justify-between absolute top-4 px-6 z-50 font-medium text-white">
                                <div className="text-sm">
                                    닫기: ESC{!popupMode && ', 뒤로가기 '}
                                </div>
                                <button
                                    type="button"
                                    onClick={() => closeAsPath()}
                                    className="ml-auto"
                                >
                                    close
                                </button>
                            </div>
                            <div className="bg-background dark:bg-background-dark">
                                {render()}
                            </div>
                        </div>
                    </div>
                </Portal>
            )}
        </>
    );
};

export default Link;

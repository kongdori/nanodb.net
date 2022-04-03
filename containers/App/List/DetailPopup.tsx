/* eslint-disable @typescript-eslint/no-floating-promises */
import React from 'react';
import ReactDOM from 'react-dom';
import { useDetectClickOutside } from 'react-detect-click-outside';
import { withRouter, NextRouter } from 'next/router';
import { AppProps, getAppListUrl } from '@lib/apps';
import { GameDetailPage } from 'pages/games/[...queries]';

interface DetailPopupProps
    extends React.HTMLProps<HTMLAnchorElement>,
        AppProps {
    slug: string;
    router: NextRouter;
}

const DetailPopup = ({
    app,
    appid,
    slug,
    router,
    children,
    ...props
}: DetailPopupProps) => {
    const appUrl = getAppListUrl(app, appid, slug);

    const [isOpen, setIsOpen] = React.useState(false);
    const [referrer, setReferrer] = React.useState('');

    const openAsPath = () => {
        setReferrer(router.asPath);

        router.push({}, appUrl, { shallow: true });

        setIsOpen(true);
        document.body.style.overflow = 'hidden';
    };

    const closeAsPath = () => {
        if (router.asPath !== referrer) {
            router.push({}, referrer, { shallow: true });
        } else {
            router.back();
        }

        setIsOpen(false);
        document.body.style.overflow = '';
    };

    const portalRef = useDetectClickOutside({
        onTriggered: () => {
            closeAsPath();
        }
    });

    const render = () => {
        switch (app) {
            case 'game':
                return <GameDetailPage appid={appid} />;

            default:
                return null;
        }
    };

    React.useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (isOpen && e.key === 'Escape') {
                closeAsPath();
            }
        };

        const handleBeforeChange = (url: string) => {
            if (isOpen) {
                if (url === referrer) {
                    setIsOpen(false);
                }
                document.body.style.overflow = '';
            } else if (url === appUrl) {
                setIsOpen(true);
                document.body.style.overflow = 'hidden';
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        router.events.on('beforeHistoryChange', handleBeforeChange);

        return () => {
            window.removeEventListener('keydown', handleKeyPress);
            router.events.off('beforeHistoryChange', handleBeforeChange);
        };
    }, [isOpen]);

    return (
        <>
            <a
                {...props}
                href={appUrl}
                onClick={(e) => {
                    openAsPath();
                    e.preventDefault();
                    e.stopPropagation();
                }}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        openAsPath();
                        e.preventDefault();
                        e.stopPropagation();
                    }
                }}
            >
                {children}
            </a>
            {isOpen &&
                ReactDOM.createPortal(
                    <div className="fixed inset-0 overflow-y-auto z-30">
                        <div
                            ref={portalRef}
                            className="relative z-40 max-w-[74rem] mx-auto shadow-xl dark:shadow-black/60 overflow-hidden"
                        >
                            <div className="w-full flex items-center justify-between absolute top-16 px-6 z-50 font-medium text-white">
                                <div className="text-sm">
                                    닫기: ESC, 뒤로가기
                                    <span className="hidden xl:inline">
                                        , 화면 밖 클릭
                                    </span>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => closeAsPath()}
                                    className="ml-auto"
                                >
                                    close
                                </button>
                            </div>
                            <div>{render()}</div>
                        </div>
                    </div>,
                    document.body
                )}
        </>
    );
};

export default withRouter(DetailPopup);

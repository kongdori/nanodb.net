module.exports = {
    siteName: '나노디비',
    header: {
        globalNav: [
            {
                name: '게임',
                href: '/games',
                active: ['games', 'game'],
                subNav: [
                    {
                        name: 'PC 게임',
                        href: '/games/',
                        active: ['/games', '/games/[...slug]'],
                        io5Icon: 'IoDesktopOutline',
                        grid: true
                    },
                    {
                        name: '한국어 지원',
                        href: '/game/hangeuls/',
                        active: ['/game/hangeuls/[[...char]]'],
                        io5Icon: 'IoLanguage'
                    }
                ]
            }
        ],
        confNav: {
            links: [
                {
                    href: 'https://github.com/nanodbnet',
                    name: 'Github',
                    faIcon: 'FaGithubAlt'
                },
                {
                    href: 'https://steamcommunity.com/groups/nanodbnet',
                    name: 'Steam',
                    faIcon: 'FaSteamSymbol'
                }
            ],
            mails: [
                {
                    title: '나노디비 문의',
                    address: 'nano@nanodb.net'
                },
                {
                    title: '개인 문의',
                    address: 'nckres14@gmail.com'
                }
            ]
        }
    }
};

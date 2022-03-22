module.exports = {
    siteName: '나노디비',
    header: {
        globalNav: [
            {
                name: '게임',
                active: ['games', 'game'],
                menus: [
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
            mails: [
                {
                    title: '나노디비 문의',
                    address: 'nano@nanodb.net'
                },
                {
                    title: '개인 문의',
                    address: 'nckres14@gmail.com'
                }
            ],
            donations: {
                buymeacoffee: {
                    name: 'NanoDB',
                    url: 'https://www.buymeacoffee.com/nanodb'
                },
                kakaobank: {
                    name: '공채운',
                    account: '3333-22-8667531'
                },
                toss: {
                    url: 'https://toss.me/nanodb'
                }
            },
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
                },
                {
                    href: 'https://discord.gg/48yXEbVbZX',
                    name: 'Discord',
                    faIcon: 'FaDiscord'
                }
            ]
        }
    }
};

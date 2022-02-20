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
                        name: '한국어화',
                        href: '/game/hangeuls',
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
                    faIcon: 'FaGithub'
                },
                {
                    href: 'https://steamcommunity.com/groups/nanodbnet',
                    name: 'Steam',
                    faIcon: 'FaSteam'
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

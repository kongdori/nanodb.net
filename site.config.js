module.exports = {
    siteName: '나노디비',
    header: {
        topNav: {
            links: [
                {
                    key: 'github',
                    href: 'https://github.com/nanodbnet',
                    label: '나노디비 깃허브',
                    faIcon: 'FaGithub'
                },
                {
                    key: 'steam',
                    href: 'https://steamcommunity.com/groups/nanodbnet',
                    label: '나노디비 스팀',
                    faIcon: 'FaSteam'
                }
            ],
            mail: {
                label: '나노디비 문의',
                faIcon: 'FaEnvelope',
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
        },
        globalNav: [
            {
                key: 'games',
                name: '게임',
                href: '/games/',
                current_match: false,
                subNav: [
                    {
                        name: '한국어화'
                    }
                ]
            }
        ]
    }
};

import Link from 'next/link';
import Image from 'next/image';
import { FaGithub, FaSteam, FaEnvelope } from 'react-icons/fa';

const aboutLinks = [
    {
        key: 'github',
        href: 'https://github.com/nanodbnet',
        content: <FaGithub />
    },
    {
        key: 'steam',
        href: 'https://steamcommunity.com/groups/nanodbnet',
        content: <FaSteam />
    },
    {
        key: 'mail',
        href: 'mailto:nano@nanodb.net',
        content: <FaEnvelope />
    }
];

const Header = () => {
    return (
        <>
            <div className="w-full bg-neutral-800">
                <div className="max-w-7xl mx-auto h-8 px-4 flex items-center justify-between">
                    <div className="flex">
                        <div className="flex items-center space-x-3">
                            {aboutLinks.map((link) => {
                                return (
                                    <a
                                        key={link.key}
                                        href={link.href}
                                        target="_blank"
                                        rel="noreferrer nofollow external"
                                        className="font-medium text-neutral-300 hover:text-neutral-100"
                                    >
                                        {link.content}
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
            <header className="sticky top-0 z-40 w-full backdrop-blur transition-colors border-b border-gray-900/10 duration-500 bg-white/20">
                <div className="max-w-7xl mx-auto">
                    <div className="px-4 py-2.5">
                        <div className="relative flex items-center">
                            <Link href="/">
                                <a>
                                    <h1 className="flex flex-nowrap items-center">
                                        <Image
                                            src="/logo.svg"
                                            alt="nanodb"
                                            width="23"
                                            height="28"
                                        />
                                        <span className="text-base ml-3 font-semibold text-[#403d39]">
                                            나노디비
                                        </span>
                                    </h1>
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </header>
        </>
    );
};

export default Header;

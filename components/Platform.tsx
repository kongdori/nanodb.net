import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';

interface PlatformProps {
    platform: 'win' | 'mac' | 'linux';
}

const Platform = ({ platform }: PlatformProps) => {
    switch (platform) {
        case 'win':
            return <FaWindows />;

        case 'mac':
            return <FaApple />;

        case 'linux':
            return <FaLinux />;

        default:
            return null;
    }
};

export default Platform;

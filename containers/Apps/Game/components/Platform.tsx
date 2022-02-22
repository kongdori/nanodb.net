import { GamePlatformsItem } from '@lib/apps/game';
import { FaWindows, FaApple, FaLinux } from 'react-icons/fa';

// export const Platform = {
//     win: <FaWindows />,
//     mac: <FaApple />,
//     linux: <FaLinux />
// };

interface PlatformProps {
    platform: GamePlatformsItem;
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
            return <i />;
    }
};

export default Platform;

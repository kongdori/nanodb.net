import * as faIcons from 'react-icons/fa';
import * as io5Icons from 'react-icons/io5';

const FaIcon = ({ name }: { name: string }) => {
    const IconComponent = faIcons[name as keyof typeof faIcons];
    return <IconComponent />;
};

const Io5Icon = ({ name }: { name: string }) => {
    const IconComponent = io5Icons[name as keyof typeof io5Icons];
    return <IconComponent />;
};

export { FaIcon, Io5Icon };

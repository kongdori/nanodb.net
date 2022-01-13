import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Switch } from '@headlessui/react';
import classNames from 'classnames';
import { IoSunny, IoMoon } from 'react-icons/io5';

const ThemeSwitch = () => {
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme } = useTheme();

    // When mounted on client, now we can show the UI
    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <Switch.Group as="div" className="flex items-center">
            <Switch.Label className="mr-1 text-medium text-orange-400 dark:text-white/70">
                <IoSunny />
            </Switch.Label>
            <Switch
                checked={theme === 'dark'}
                onChange={() => {
                    setTheme(theme === 'light' ? 'dark' : 'light');
                }}
                className={classNames(
                    'relative inline-flex flex-shrink-0 h-4 w-8 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200',
                    theme === 'dark' ? 'bg-yellow-500' : 'bg-neutral-500'
                )}
            >
                <span className="sr-only">Choose theme</span>
                <span
                    aria-hidden="true"
                    className={classNames(
                        'pointer-events-none inline-block h-3 w-3 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200',
                        theme === 'dark' ? 'translate-x-4' : 'translate-x-0'
                    )}
                />
            </Switch>
            <Switch.Label className="ml-1 text-medium text-white/70 dark:text-yellow-400">
                <IoMoon />
            </Switch.Label>
        </Switch.Group>
    );
};

export default ThemeSwitch;

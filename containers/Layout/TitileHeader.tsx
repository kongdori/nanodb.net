import Link from 'next/link';
import { withRouter, NextRouter } from 'next/router';
import * as site from 'site.config.js';

const MobileHeader = ({ router }: { router: NextRouter }) => {
    const { globalNav } = site.header;

    const title = globalNav
        .flatMap((item) => item.menus)
        .find((item) => item.active.includes(router.pathname));

    if (!title) return null;

    return (
        <Link href={title.href}>
            <a className="text-black dark:text-white">{title.name}</a>
        </Link>
    );
};

export default withRouter(MobileHeader);

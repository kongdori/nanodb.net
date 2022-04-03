import React from 'react';
import { HiChevronRight } from 'react-icons/hi';

interface BreadcrumbProps {
    item: React.ReactNode[];
    chevronClassName?: string;
}

const Breadcrumb = ({ item, chevronClassName }: BreadcrumbProps) => {
    const render = () => {
        const breadcrumbs = [];

        for (let i = 0; i < item.length; i += 1) {
            breadcrumbs.push(
                <React.Fragment key={`link${i}`}>{item[i]}</React.Fragment>
            );

            if (i + 1 in item) {
                breadcrumbs.push(
                    <HiChevronRight
                        key={`chevron${i}`}
                        className={chevronClassName}
                    />
                );
            }
        }

        return breadcrumbs;
    };

    return <>{render()}</>;
};

Breadcrumb.defaultProps = {
    chevronClassName: 'text-sm'
};

export default Breadcrumb;

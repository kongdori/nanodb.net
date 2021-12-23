import Header from './header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <>
            <Header />
            <main className="container mx-auto max-w-7xl px-4">{children}</main>
        </>
    );
};

export default Layout;

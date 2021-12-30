import Header from './Header';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => (
    <>
        <Header />
        <main>{children}</main>
    </>
);

export default Layout;

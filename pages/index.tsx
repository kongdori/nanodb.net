const Index = () => <div />;

export default Index;

export const getServerSideProps = () => {
    return {
        redirect: {
            destination: '/games/',
            permanent: true
        }
    };
};

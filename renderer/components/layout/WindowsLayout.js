import Head from 'next/head';

const WindowsLayout = ({ children, title }) => {

    return (
        <>
            <Head>
                <link rel="stylesheet" href="/css/photon.min.css" />
                <title>{title}</title>
            </Head>
            {children}
        </>
    );
};

export default WindowsLayout;
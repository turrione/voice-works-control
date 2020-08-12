import Head from 'next/head';
import Navigation from './Navigation';
import Actions from './Actions';

const Layout = ({ children, title }) => {

    return (
        <div>
            <Head>
                <link rel="stylesheet" href="/css/photon.min.css" />
                <title>{title}</title>
            </Head>
            <div className="window">
                <Actions />
                <div className="window-content">
                    <div className="pane-group">
                        <div className="pane-sm">
                            <Navigation />
                        </div>
                        <div className="pane">
                            <div id="main">{children}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Layout;

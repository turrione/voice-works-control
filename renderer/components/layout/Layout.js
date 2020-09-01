import Head from 'next/head';
import Navigation from './Navigation';
import Actions from './Actions';
import { useState, useEffect } from 'react';

const Layout = ({ children, title }) => {

    let [section, setSection] = useState('')

    useEffect(() => {
        setSection(window.location.pathname.replace('/', ''))
    }, [section])

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
                        <div className="pane-sm sidebar">
                            <Navigation section={section} />
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

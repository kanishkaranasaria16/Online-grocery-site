import React from 'react';
import HEADER from './HEADER';
import SIDEBAR from './SIDEBAR';

const LAYOUT = ({ children }) => {
    return (
        <div className="layout">
            <HEADER />
            <div className="content">
                <SIDEBAR />
                <main>{children}</main>
            </div>
        </div>
    );
};

export default LAYOUT;

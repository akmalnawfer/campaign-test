import React from 'react';

import styled from 'styled-components';

const Loader = (): JSX.Element => (
    <LoaderWrapper>
        <div className="loading-image">
            <img src="/loading.svg" alt="Loading" />
        </div>
    </LoaderWrapper>
);

export default Loader;

const LoaderWrapper = styled.div`
    width: 100vw;
    height: calc(100vh - 188px);
    position: absolute;
    z-index: 999;
    background: #efefefaf;
    left: 0;
    top: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
`;

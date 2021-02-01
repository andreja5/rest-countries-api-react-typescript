import React, { useRef, useEffect, FC } from "react";

interface LoadingProps {
  dependency: string;
}

const Loading: FC<LoadingProps> = ({ dependency }):JSX.Element => {
    const loadingRef = useRef() as React.MutableRefObject<any>;

    useEffect(() => {
        if (!dependency) {
            loadingRef.current.classList.value = "loading isRevealed";
        } else {
            loadingRef.current.classList.value = "loading";
            setTimeout(() => {
                loadingRef.current.classList.value = "loading isRemoved";
            }, 250);
        }
    }, [dependency]);

    return (
        <main className="loading" ref={loadingRef}>
            <h1 className="loading-label">Loading...</h1>
            <i className="fa fa-spinner fa-spin loading-buffer" />
        </main>
    );
}

export default Loading;

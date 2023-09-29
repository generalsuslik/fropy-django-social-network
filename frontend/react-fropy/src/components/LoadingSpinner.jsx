import { useState } from "react";
import { css } from "@emotion/react";
import SquareLoader from "react-spinners/SquareLoader";


const override = css`
    display: block;
    margin: 200px auto;
    border-color: blue;
    align-items: center;
    `


const LoadingSpinner = () => {

    // const [loading, setLoading] = useState(true);

    return (
        <div className="loading-spinner">
            <SquareLoader color="#0066ff" loading={true} css={override} size={50} />
        </div>
    );
}

export default LoadingSpinner;


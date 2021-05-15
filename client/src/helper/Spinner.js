import FadeLoader from "react-spinners/FadeLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 40vh auto;
`;

export const LoadingSpinner = (loading) => <FadeLoader color={"#e4e6eb"} loading={loading} css={override} />;
export const LoadingSpinnerPost = () => <FadeLoader color={"#e4e6eb"} css={override} />;

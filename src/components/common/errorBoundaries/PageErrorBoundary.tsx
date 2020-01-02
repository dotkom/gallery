import React, { Component, FC } from 'react';
import styled from 'styled-components';
// import { HTTPError } from 'ky-universal';

const ErrorMessage = styled.h3`
  color: gray;
`;

const ErrorDialog: FC = ({ children }) => {
  return (
    <>
      <ErrorMessage>Det skjedde noe galt med siden</ErrorMessage>
      <ErrorMessage>{children}</ErrorMessage>
    </>
  );
};

export class PageErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: '',
  };

  /*
  public componentDidCatch(error: Error, _: ErrorInfo) {
    if (error instanceof HTTPError) {
      this.setState({ hasError: true, errorMessage: error.message });
    } else {
      throw error;
    }
  }
  */

  public render() {
    return this.state.hasError ? <ErrorDialog>{this.state.errorMessage}</ErrorDialog> : this.props.children;
  }
}

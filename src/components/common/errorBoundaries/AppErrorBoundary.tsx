import * as Sentry from '@sentry/browser';
import React, { Component, FC } from 'react';
import styled from 'styled-components';

const ErrorMessage = styled.h3`
  color: gray;
`;

const ErrorDialog: FC = ({ children }) => {
  return (
    <>
      <ErrorMessage>Det skjedde noe galt med siden</ErrorMessage>
      <ErrorMessage>{children}</ErrorMessage>
      <button onClick={() => Sentry.showReportDialog()}>Klikk her for å repportere feilen</button>
    </>
  );
};

export class AppErrorBoundary extends Component {
  state = {
    hasError: false,
    errorMessage: '',
  };

  /*
  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({ hasError: true, errorMessage: error.message });
    Sentry.withScope((scope) => {
      Object.entries(errorInfo).forEach(([key, value]) => {
        scope.setExtra(key, value);
      });
      Sentry.captureException(error);
    });
  }
  */

  public render() {
    return this.state.hasError ? <ErrorDialog>{this.state.errorMessage}</ErrorDialog> : this.props.children;
  }
}

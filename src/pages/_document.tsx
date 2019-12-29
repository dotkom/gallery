import Document, { Head, Html, Main, NextScript, DocumentContext, DocumentInitialProps } from 'next/document';
import { ServerStyleSheet } from 'styled-components';
import { ComponentProps } from 'react';

const getInitialProps = async (ctx: DocumentContext): Promise<DocumentInitialProps> => {
  const sheet = new ServerStyleSheet();
  const originalRenderPage = ctx.renderPage;

  try {
    ctx.renderPage = () => {
      return originalRenderPage({
        enhanceApp: (App) => (props) => sheet.collectStyles(<App {...props} />),
      });
    };

    const initialProps = await Document.getInitialProps(ctx);
    return {
      ...initialProps,
      styles: (
        <>
          {initialProps.styles}
          {sheet.getStyleElement()}
        </>
      ),
    };
  } finally {
    sheet.seal();
  }
};

type DocumentProps = ComponentProps<typeof Document>;

const CustomDocument = (_: DocumentProps): JSX.Element => {
  return (
    <Html>
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
};

CustomDocument.getInitialProps = getInitialProps;
CustomDocument.renderDocument = Document.renderDocument;

export default CustomDocument;

import { FC } from 'react';

import { Button } from 'components/tokens/Button';

import { DownloadLink } from 'types';

import './Action.css';

type ActionProps = {
  downloadLink?: DownloadLink;
  onClick: () => Promise<void>;
};

export const Action: FC<ActionProps> = ({ downloadLink, onClick }) => (
  <section className="handle-btns">
    <Button
      className="btn merge-btn"
      /**
       * This can also be fixed adding rule in `.eslintrc` file
       *
       * ```
       * {
       *  "@typescript-eslint/no-misused-promises": [
       *    "error",
       *    {
       *      "checksVoidReturn": false
       *   }
       *  ]
       * }
       * ```
       *
       * Link: https://typescript-eslint.io/rules/no-misused-promises/
       */
      onClick={() => {
        void (async () => await onClick())();
      }}
    >
      Process files
    </Button>
    <a
      type="button"
      className={`btn download-btn ${
        !downloadLink?.href ? 'disabled-btn' : ''
      }`}
      {...downloadLink}
    >
      Download
    </a>
  </section>
);

export default Action;

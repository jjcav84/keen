import React, { FC, MutableRefObject, forwardRef } from 'react';

import { ChartContext } from '../contexts';

import { Margins, Dimension, Theme, ScaleSettings } from '../types';

type Props = {
  svgDimensions: Dimension;
  margins: Margins;
  theme: Theme;
  children: React.ReactNode;
  yScaleSettings?: ScaleSettings;
  xScaleSettings?: ScaleSettings;
  ref?: MutableRefObject<SVGSVGElement>;
};

const ChartBase: FC<Props> = forwardRef(
  (
    { theme, xScaleSettings, yScaleSettings, svgDimensions, margins, children },
    ref
  ) => (
    <ChartContext.Provider
      value={{
        theme,
        xScaleSettings,
        yScaleSettings,
        svgDimensions,
        margins,
      }}
    >
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        preserveAspectRatio="xMinYMin"
        width="100%"
        height="100%"
      >
        {children}
      </svg>
    </ChartContext.Provider>
  )
);

ChartBase.displayName = 'ChartBase';

export default ChartBase;

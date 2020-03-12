import React, { FC, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tooltip } from '@keen.io/ui-core';

import { generateDonutChart, LabelsPosition } from './utils';

import DonutSlice from './donut-slice.component';
import TooltipContent from '../../components/tooltip-content.component';
import ShadowFilter from '../../components/shadow-filter.component';

import { ChartBase } from '../../components';
import DonutTotal from './donut-total.component';

import { useTooltip } from '../../hooks';
import { theme as defaultTheme } from '../../theme';
console.log('defaultTheme', defaultTheme);

import { CommonChartSettings } from '../../types';

export type Props = {
  /** Chart data */
  data: object[];
  /** Name of data object property used to create series */
  labelSelector?: string;
  /** Keys picked from data object used to genrate slices */
  keys?: string[];
  /** Labels that are disabled for rendering data series */
  disabledLabels?: string[];
  /** Spacing between donut slices */
  padAngle?: number;
  /** Radius between donut slices */
  padRadius?: number;
  /** Arc corner radius */
  cornerRadius?: number;
  /** Radius of inner circle */
  innerRadius?: number;
  /** The radius for slice labels */
  labelsRadius?: number;
  /** Show labels inside our outside donut slices */
  labelsPosition?: LabelsPosition;
  /** Automatically adjust labels color */
  labelsAutocolor?: boolean;
} & CommonChartSettings;

export const tooltipMotion = {
  transition: { duration: 0.3 },
  exit: { opacity: 0 },
};

export const DonutChart: FC<Props> = ({
  data,
  svgDimensions,
  theme = defaultTheme,
  margins = { top: 30, right: 20, bottom: 30, left: 40 },
  labelSelector = 'name',
  keys = ['value'],
  disabledLabels = [],
  padAngle = 0.02,
  padRadius = 100,
  cornerRadius = 2,
  innerRadius = 150,
  labelsRadius = 30,
  labelsPosition = 'inside',
  labelsAutocolor = true,
}) => {
  const { total, arcs, drawArc, drawActiveArc } = generateDonutChart({
    data,
    margins,
    padAngle,
    padRadius,
    cornerRadius,
    innerRadius,
    labelSelector,
    labelsRadius,
    keys,
    disabledLabels,
    labelsPosition,
    dimension: svgDimensions,
    colors: theme.colors,
  });

  const svgElement = useRef(null);

  const {
    tooltipVisible,
    tooltipPosition,
    tooltipSelectors,
    updateTooltipPosition,
    hideTooltip,
  } = useTooltip(svgElement);

  const { tooltip: tooltipSettings, total: totalSettings } = theme;
  console.log('total settings: ', totalSettings, theme, defaultTheme);
  console.log(margins);
  return (
    <>
      <AnimatePresence>
        {tooltipVisible && (
          <motion.div
            {...tooltipMotion}
            initial={{ opacity: 0, x: tooltipPosition.x, y: tooltipPosition.y }}
            animate={{
              x: tooltipPosition.x,
              y: tooltipPosition.y,
              opacity: 1,
            }}
            style={{
              position: 'absolute',
              pointerEvents: 'none',
            }}
          >
            <Tooltip hasArrow={false}>
              {tooltipSelectors && (
                <TooltipContent
                  data={data}
                  selectors={tooltipSelectors}
                  keys={keys}
                />
              )}
            </Tooltip>
          </motion.div>
        )}
      </AnimatePresence>
      <ChartBase
        ref={svgElement}
        theme={theme}
        svgDimensions={svgDimensions}
        margins={margins}
      >
        <g
          style={{
            transform: `translate(${svgDimensions.width /
              2}px, ${svgDimensions.height / 2}px)`,
            // transform: `translate: ${margins.left}px ${margins.right}`,
            // width: `${svgDimensions.width}px`,
            // height: `${svgDimensions.height}px`,
          }}
        >
          <ShadowFilter />
          {arcs.map(
            ({
              index,
              label,
              labelPosition,
              activePosition,
              startAngle,
              endAngle,
              color,
              selector,
            }) => (
              <DonutSlice
                key={index}
                draw={drawArc}
                drawActive={drawActiveArc}
                startAngle={startAngle}
                endAngle={endAngle}
                label={label}
                autocolor={labelsAutocolor}
                activePosition={activePosition}
                labelPosition={labelPosition}
                background={color}
                onMouseMove={e => {
                  if (tooltipSettings.enabled) {
                    updateTooltipPosition(e, [{ color, selector }]);
                  }
                }}
                onMouseLeave={() => hideTooltip()}
              />
            )
          )}
          {totalSettings.enabled && (
            <DonutTotal {...totalSettings.typography}>{total}</DonutTotal>
          )}
        </g>
      </ChartBase>
    </>
  );
};

export default DonutChart;

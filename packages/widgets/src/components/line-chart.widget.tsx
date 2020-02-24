/*eslint @typescript-eslint/no-empty-function: 0*/
import React, { FC } from 'react';
import {
  LineChart,
  LineChartSettings,
  ResponsiveWrapper,
  Legend,
  theme as defaultTheme,
} from '@keen.io/charts';

import ChartWidget from './chart-widget.component';
import {
  ContentSocket,
  LegendSocket,
  TitleSocket,
} from './widget-sockets.component';

import { useLegend } from '../hooks';

import { legendSettings } from '../widget-settings';
import { WidgetSettings } from '../types';

type Props = WidgetSettings & LineChartSettings;

/** Line Chart widget integrated with other components */
export const LineChartWidget: FC<Props> = ({
  title,
  subtitle,
  legend = legendSettings,
  theme = defaultTheme,
  ...props
}) => {
  const { disabledKeys, updateKeys } = useLegend();

  return (
    <ChartWidget
      legendSettings={{
        position: legend.position,
        alignment: legend.alignment,
        layout: legend.layout,
      }}
    >
      <TitleSocket>
        {title && <div>{title}</div>}
        {subtitle && <div>{subtitle}</div>}
      </TitleSocket>
      {legend.enabled && (
        <LegendSocket>
          <Legend
            {...legend}
            onClick={updateKeys}
            labels={props.keys.map((key, idx) => ({
              name: key,
              color: theme.colors[idx],
            }))}
          />
        </LegendSocket>
      )}
      <ContentSocket>
        <ResponsiveWrapper>
          {(width: number, height: number) => (
            <LineChart
              {...props}
              theme={theme}
              disabledKeys={disabledKeys}
              svgDimensions={{ width, height }}
            />
          )}
        </ResponsiveWrapper>
      </ContentSocket>
    </ChartWidget>
  );
};

export default LineChartWidget;

import React from 'react';
import {
  BarChartWidget,
  LineChartWidget,
  PieChartWidget,
  MetricChartWidget,
  WidgetSettings,
} from '@keen.io/widgets';
import { ScaleSettings } from '@keen.io/charts';

import { ComponentSettings } from './types';

export type Widgets = 'bar' | 'line' | 'pie' | 'metric';

type Options = {
  type: Widgets;
  keys: string[];
  data: any[];
  scaleSettings: Partial<ScaleSettings>;
  componentSettings?: ComponentSettings;
  widgetSettings?: WidgetSettings;
};

export const renderWidget = ({
  type,
  keys,
  data,
  scaleSettings,
  componentSettings,
  widgetSettings,
}: Options) => {
  const config = {
    keys,
    data,
    labelSelector: 'name',
    ...componentSettings,
    ...widgetSettings,
  };

  switch (type) {
    case 'metric':
      return <MetricChartWidget {...config} />;
    case 'pie':
      return <PieChartWidget {...config} />;
    case 'bar':
      return (
        <BarChartWidget
          xScaleSettings={{ type: 'band', ...scaleSettings }}
          {...config}
        />
      );
    case 'line':
      return (
        <LineChartWidget
          xScaleSettings={{
            type: 'time',
            ...scaleSettings,
          }}
          {...config}
        />
      );
  }
};

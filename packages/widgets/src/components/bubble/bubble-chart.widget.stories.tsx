import * as React from 'react';
import { text, object, number, boolean, select } from '@storybook/addon-knobs';
import {
  cardKnobs,
  typographyKnobs,
  legendKnobs,
} from '@keen.io/storybook-utils';
import { Typography } from '@keen.io/ui-core';
import { theme as keenTheme } from '@keen.io/charts';
import { colors } from '@keen.io/colors';

import { BubbleChartWidget } from './bubble-chart.widget';
import { chartData } from './bubble-chart.widget.fixtures';

import { widgetSettings } from '../../widget-settings';

export default {
  title: 'Visualizations|Bubble Chart|Widget',
  parameters: {
    component: BubbleChartWidget,
    componentSubtitle: 'Widget to be directly integrated on website',
  },
};

const createThemeKnobs = () => ({
  ...keenTheme,
});

const bubbleLegendTypography = {
  fontSize: 12,
  fontFamily: 'Lato Bold',
  fontStyle: 'normal',
  fontWeight: 'normal',
  fontColor: colors.black['500'],
};

const bubblePositionOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

const bubbleAlignmentOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
};

export const widget = () => (
  <div style={{ width: '700px', height: '400px' }}>
    <BubbleChartWidget
      title={{
        content: text('Title', 'Widget Title', 'Title Settings'),
        typography: typographyKnobs(
          'Title Settings',
          widgetSettings.title.typography as Typography
        ),
      }}
      subtitle={{
        content: text('Subtitle', 'Widget Subtitle', 'Subtitle Settings'),
        typography: typographyKnobs(
          'Subtitle Settings',
          widgetSettings.subtitle.typography as Typography
        ),
      }}
      card={cardKnobs('Card')}
      legend={{
        position: select(
          'Position',
          bubblePositionOptions,
          bubblePositionOptions.right,
          'Legend'
        ) as any,
        series: legendKnobs('Series Legend') as any,
        bubble: {
          enabled: boolean('Enabled', true, 'Bubble Legend'),
          position: select(
            'Position',
            bubblePositionOptions,
            bubblePositionOptions.right,
            'Bubble Legend'
          ) as any,
          alignment: select(
            'Alignment',
            bubbleAlignmentOptions,
            bubbleAlignmentOptions.right,
            'Bubble Legend'
          ),
          typography: typographyKnobs('Bubble Legend', { fontSize: 12 }),
          title: {
            value: text(
              'Title',
              'Bubble Legend Subtitle',
              'Bubble Legend Title'
            ),
            typography: typographyKnobs(
              'Bubble Legend Title',
              bubbleLegendTypography as Typography
            ),
          },
        },
      }}
      labelSelector="channel"
      valueKey="cost"
      xDomainKey="users"
      yDomainKey="conversion"
      minAreaRadius={number('Min area radius', 5, { min: 5, max: 40 }, 'Chart')}
      maxAreaRadius={number(
        'Max area radius',
        40,
        { min: 5, max: 40 },
        'Chart'
      )}
      margins={object(
        'Margins',
        { top: 20, right: 20, bottom: 50, left: 40 },
        'Chart'
      )}
      theme={createThemeKnobs()}
      data={chartData}
    />
  </div>
);

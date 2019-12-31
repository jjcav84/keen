import { boolean, number, select, color, text } from '@storybook/addon-knobs';

import { colors } from '@keen/colors';

const typhographyOptions = {
  fontStyle: {
    normal: 'normal',
    italic: 'italic',
  },
  fontWeight: {
    normal: 'normal',
    bold: 'bold',
  },
};

const layoutOptions = {
  vertical: 'vertical',
  horizontal: 'horizontal',
};

const alignmentOptions = {
  left: 'left',
  center: 'center',
  right: 'right',
};

const positionOptions = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
};

export const createCardKnobs = (namespace: string) => ({
  hasShadow: boolean('Shadow On / Off', true, namespace),
  border: text('Border', '', namespace),
  borderRadius: text('Border Radius', '0px', namespace),
  backgroundColor: color('Background Color', colors.white['500'], namespace),
});

export const createLayoutKnobs = (
  namespace: string,
  defaultValue: string = layoutOptions.vertical
) => select('Layout', layoutOptions, defaultValue, namespace);

export const createTyphographyKnobs = (namespace: string) => ({
  fontSize: number('Font Size', 10, {}, namespace),
  fontStyle: select(
    'Font Style',
    typhographyOptions.fontStyle,
    typhographyOptions.fontStyle.normal,
    namespace
  ) as any,
  fontWeight: select(
    'Font Weight',
    typhographyOptions.fontWeight,
    typhographyOptions.fontWeight.normal,
    namespace
  ) as any,
  fontColor: color('Font Color', colors.black['500'], namespace),
});

export const createLegendKnobs = (namespace: string) => ({
  enabled: boolean('Enabled', true, namespace),
  position: select(
    'Position',
    positionOptions,
    positionOptions.top,
    namespace
  ) as any,
  alignment: select(
    'Alignment',
    alignmentOptions,
    alignmentOptions.left,
    namespace
  ),
  layout: createLayoutKnobs(namespace, layoutOptions.horizontal),
  typhography: createTyphographyKnobs(namespace),
  card: createCardKnobs(namespace),
});

export const createThemeKnobs = () => ({
  axisX: {
    enabled: boolean('Enabled', true, 'Axis X'),
    tickSize: number('Tick Size', 10, {}, 'Axis X'),
    tickPadding: number('Tick Padding', 10, {}, 'Axis X'),
    color: color('Line Color', colors.blue['100'], 'Axis X'),
    labels: {
      enabled: boolean('Show Labels', true, 'Axis X'),
      typhography: createTyphographyKnobs('Axis X'),
    },
  },
  axisY: {
    enabled: boolean('Enabled', true, 'Axis Y'),
    tickSize: number('Tick Size', 10, {}, 'Axis Y'),
    tickPadding: number('Tick Padding', 10, {}, 'Axis Y'),
    color: color('Line Color', colors.blue['100'], 'Axis Y'),
    labels: {
      enabled: boolean('Show Labels', true, 'Axis Y'),
      typhography: createTyphographyKnobs('Axis Y'),
    },
  },
  gridX: {
    enabled: boolean('Enabled', true, 'Grid X'),
    color: color('Color', colors.gray['500'], 'Grid X'),
  },
  gridY: {
    enabled: boolean('Enabled', true, 'Grid Y'),
    color: color('Color', colors.gray['500'], 'Grid Y'),
  },
});

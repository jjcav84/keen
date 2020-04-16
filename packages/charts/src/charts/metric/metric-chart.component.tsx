import React, { FC } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '@keen.io/icons';
import { Text } from '@keen.io/ui-core';

import MetricIcon from './metric-icon.component';
import {
  Excerpt,
  Wrapper,
  ValueContainer,
  IconWrapper,
  Layout,
} from './metric-chart.styles';

import { generateMetric } from './utils';
import { formatNumber } from '../../utils/format.utils';
import { createMargins } from '../../utils/element.utils';

import { theme as defaultTheme } from '../../theme';

import { CommonChartSettings } from '../../types';

export const textMotion = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.3, delay: 0.2 },
  exit: {},
};

export const decreaseMotion = {
  initial: { opacity: 0.5, y: -5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
  exit: {},
};

export const increaseMotion = {
  initial: { opacity: 0.5, y: 5 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.2 },
  exit: {},
};

export type Props = {
  /** Chart data */
  data: object[];
  /** Caption for describing metric */
  caption?: string;
  /** Name of data object property used to create label */
  labelSelector?: string;
  /** Keys picked from data object used to create metric */
  keys?: string[];
  /** Value format function */
  formatValue?: (value: string | number) => React.ReactNode;
  /** Metric type */
  type?: 'percent' | 'difference' | 'compare';
} & CommonChartSettings;

export const MetricChart: FC<Props> = ({
  data,
  caption,
  formatValue,
  labelSelector = 'name',
  theme = defaultTheme,
  keys = ['value'],
  type = 'compare',
}) => {
  const { value, difference } = generateMetric({
    labelSelector,
    keys,
    data,
    type,
  });

  const {
    metric: { excerpt, caption: captionSettings, value: valueSettings, icon },
  } = theme;

  const statusIcon = {
    ...(difference?.status === 'increase'
      ? excerpt.icons.increase
      : excerpt.icons.decrease),
  };

  return (
    <Layout>
      <ValueContainer>
        <AnimatePresence>
          <motion.div {...textMotion}>
            <Text data-test="metric-label" {...valueSettings.typography}>
              {formatValue ? formatValue(value) : value}
            </Text>
          </motion.div>
        </AnimatePresence>
        {caption && <Text {...captionSettings.typography}>{caption}</Text>}
        {difference && (
          <div>
            <Excerpt
              data-test="metric-excerpt-container"
              background={excerpt.backgroundColor}
            >
              <Wrapper>
                {type !== 'compare' && difference.status !== 'static' && (
                  <AnimatePresence>
                    <motion.div
                      {...(difference.status === 'increase'
                        ? increaseMotion
                        : decreaseMotion)}
                    >
                      <IconWrapper>
                        <Icon type={statusIcon.type} fill={statusIcon.color} />
                      </IconWrapper>
                    </motion.div>
                  </AnimatePresence>
                )}
                <Text data-test="metric-excerpt-label" {...excerpt.typography}>
                  {type === 'percent'
                    ? `${difference.value}%`
                    : formatNumber(difference.value)}
                </Text>
              </Wrapper>
            </Excerpt>
          </div>
        )}
      </ValueContainer>
      {icon.enabled && (
        <div style={createMargins(icon.margins)}>
          <MetricIcon
            position={icon.position}
            circleStyle={icon.style}
            baseColor={valueSettings.typography.fontColor}
          >
            <Icon
              type={icon.type}
              width={60}
              height={60}
              opacity={icon.style === 'solid' ? 0.15 : 0.2}
              fill={valueSettings.typography.fontColor}
            />
          </MetricIcon>
        </div>
      )}
    </Layout>
  );
};

export default MetricChart;

import styled from 'styled-components';
import { variant } from 'styled-system';
import { transparentize } from 'polished';
import { colors } from '@keen.io/colors';

import { Variant } from './types';

const alertVariants = {
  prop: 'type',
  variants: {
    success: {
      color: colors.green['500'],
      borderColor: colors.green['400'],
      background: transparentize(0.8, colors.green['100']),
    },
    error: {
      color: colors.orange['500'],
      borderColor: colors.orange['500'],
      background: transparentize(0.5, colors.pink['100']),
    },
  },
};

export const StyledAlert = styled.div<{
  type: Variant;
}>`
  padding: 10px 20px;
  border-left: solid;

  font-family: 'Lato Regular', sans-serif;
  font-size: 14px;
  line-height: 16px;
  font-weight: 400;

  ${variant(alertVariants)}
`;

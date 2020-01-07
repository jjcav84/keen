import styled from 'styled-components';
import { colors } from '@keen/colors';

type Props = {
  backgroundColor?: string;
  border?: string;
  borderRadius?: string;
  hasShadow?: boolean;
};

const Card = styled.div<Props>`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 10px;
  background: ${props => props.backgroundColor};
  border: ${props => props.border};
  border-radius: ${props => props.borderRadius};
  box-shadow: ${props =>
    props.hasShadow ? '0px 2px 4px 0px rgba(29,39,41,0.15)' : 'none'};
`;

Card.defaultProps = {
  border: 'none',
  borderRadius: '0px',
  backgroundColor: colors.white,
  hasShadow: true,
};

export default Card;

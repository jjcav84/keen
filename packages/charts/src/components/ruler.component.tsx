import React, { useMemo, useRef, useEffect, useState } from 'react';
import { ScaleBand, ScaleLinear, ScaleTime } from 'd3-scale';

import { Text, Tick, Line } from './elements';
import { Group } from './ruler.styles';
import AxisTitle from './axis-title.component';

import { createRuler, rotateLabel } from './ruler.utils';

import { Axis, Tick as RulerTick, Orientation, ScaleSettings } from '../types';

const TEXT_CENTER = '0.32em';

type Props = {
  scale:
    | ScaleBand<string>
    | ScaleLinear<number, number>
    | ScaleTime<number, number>;
  orientation: Orientation;
  x: number;
  y: number;
  scaleSettings?: ScaleSettings;
  axisTitle?: string;
} & Axis;

const Ruler = ({
  scale,
  x,
  y,
  tickPadding,
  orientation,
  tickSize,
  stroke,
  labels,
  title,
  color,
  scaleSettings,
  axisTitle,
}: Props) => {
  const groupElement = useRef(null);
  const [groupBox, setGroupBox] = useState({ x: 0, y: 0, height: 0 });

  useEffect(() => {
    if (groupElement.current) {
      const { x, y, height } = groupElement.current.getBBox();
      setGroupBox({ x, y, height });
    }
  }, [groupElement, x, y, axisTitle]);

  const { enabled, typography, radiusAngle } = labels;
  const { line, ticks } = createRuler({
    x,
    y,
    scale,
    scaleSettings,
    orientation,
    tickSize,
  });

  const { fontColor, ...rest } = typography;
  const textPosition = useMemo(
    () =>
      orientation === Orientation.HORIZONTAL
        ? {
            dy: tickPadding + tickSize,
            dx: 0,
          }
        : {
            dx: -Math.abs(tickPadding + tickSize),
            dy: TEXT_CENTER,
          },
    [orientation, tickPadding, tickSize]
  );

  const { anchor, radius, translateX, translateY } = rotateLabel(
    orientation,
    radiusAngle,
    tickPadding,
    tickSize
  );

  return (
    <>
      <Group color={fontColor} style={{ ...rest }} ref={groupElement}>
        <Line {...line} color={color} stroke={stroke} />
        {ticks.map(({ x, y, size, text }: RulerTick, idx: number) => (
          <Tick
            key={idx}
            x={x}
            y={y}
            size={size}
            color={color}
            orientation={orientation}
          >
            {enabled && (
              <g
                textAnchor={anchor}
                transform={`translate(${translateX}, ${translateY}) rotate(${radius})`}
              >
                <Text {...textPosition}>{text}</Text>
              </g>
            )}
          </Tick>
        ))}
      </Group>
      {axisTitle && (
        <AxisTitle
          titleSettings={title}
          orientation={orientation as Orientation}
          line={line}
          groupBox={groupBox}
        >
          {axisTitle}
        </AxisTitle>
      )}
    </>
  );
};

export default Ruler;

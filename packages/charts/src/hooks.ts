import React, { MutableRefObject, useRef, useState, useCallback } from 'react';

import { TooltipState, DataSelector } from './types';

export const useTooltip = (
  container: MutableRefObject<any>,
  debounce = 100
) => {
  const tooltipUpdate = useRef(null);

  const [tooltip, setTooltip] = useState<TooltipState>({
    selectors: null,
    visible: false,
    x: 0,
    y: 0,
  });

  const updateTooltipPosition = useCallback(
    (
      e: React.MouseEvent,
      { selector, color }: { selector: DataSelector; color: string }
    ) => {
      if (tooltipUpdate.current) clearTimeout(tooltipUpdate.current);
      e.persist();
      const {
        top,
        left,
      }: ClientRect = container.current.getBoundingClientRect();

      tooltipUpdate.current = setTimeout(() => {
        setTooltip({
          visible: true,
          selectors: [{ selector, color }],
          x: e.pageX - left - window.scrollX,
          y: e.pageY - top - window.scrollY,
        });
      }, debounce);
    },
    [container, debounce]
  );

  const hideTooltip = useCallback(() => {
    if (tooltipUpdate.current) clearTimeout(tooltipUpdate.current);
    setTooltip(currentState => ({
      ...currentState,
      visible: false,
      selectors: null,
    }));
  }, []);

  return {
    hideTooltip,
    updateTooltipPosition,
    tooltipSelectors: tooltip.selectors,
    tooltipPosition: { x: tooltip.x, y: tooltip.y },
    tooltipVisible: tooltip.visible,
  };
};

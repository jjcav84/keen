import React, { FC, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Toggle } from '@keen.io/ui-core';

import { List, ListTitle, ListItem } from '../list';

import {
  Summary,
  Label,
  Currency,
  BllingMode,
  BillingPeriod,
  PricingPoints,
  Price,
  Total,
} from './billing-summary.styles';

import { MONTHLY_BILLING } from '../../../constants';

const priceMotion = {
  transition: { duration: 0.3 },
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};

type Props = {
  basePrice: number;
  planName: string;
  overageEventsPrice: number;
  overageQueriesPrice: number;
  s3ServicePrice: number;
};

const BillingSummary: FC<Props> = ({
  basePrice,
  planName,
  overageEventsPrice,
  overageQueriesPrice,
  s3ServicePrice,
}) => {
  const [annualBilling, setAnnualBilling] = useState(false);
  const planPrice = annualBilling
    ? Math.round(basePrice - basePrice * 0.1)
    : basePrice;

  const totalPrice =
    planPrice + overageEventsPrice + overageQueriesPrice + s3ServicePrice;

  return (
    <Summary>
      <Total>
        <Currency>$</Currency>
        <Price>{totalPrice}</Price>
        <BillingPeriod>/{MONTHLY_BILLING}</BillingPeriod>
      </Total>
      <PricingPoints>
        <List>
          <ListTitle>Price Details:</ListTitle>
          <ListItem>
            ${planPrice} base of {planName}
          </ListItem>
          <AnimatePresence>
            {overageEventsPrice > 0 && (
              <ListItem key="events" {...priceMotion}>
                + ${overageEventsPrice} for events overage
              </ListItem>
            )}
            {overageQueriesPrice > 0 && (
              <ListItem key="queries" {...priceMotion}>
                + ${overageQueriesPrice} for queries overage
              </ListItem>
            )}
            {s3ServicePrice > 0 && (
              <ListItem key="s3" {...priceMotion}>
                + ${s3ServicePrice} for S3 Add-on
              </ListItem>
            )}
          </AnimatePresence>
        </List>
      </PricingPoints>
      <BllingMode>
        <Label onClick={() => setAnnualBilling(!annualBilling)}>
          Annual billing (save 10%)
        </Label>
        <Toggle
          isOn={annualBilling}
          onChange={state => setAnnualBilling(state)}
        />
      </BllingMode>
    </Summary>
  );
};

export default BillingSummary;

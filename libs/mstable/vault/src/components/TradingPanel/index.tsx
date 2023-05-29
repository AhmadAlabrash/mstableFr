import { useEffect, useMemo } from 'react';

import {
  useGeneralTradingPanelHandlers,
  useOnTradingTypeChange,
} from '@dhedge/core-ui-kit/hooks/component';
import {
  useTradingPanelPoolConfig,
  useTradingPanelType,
} from '@dhedge/core-ui-kit/hooks/state';
import { Card, CardContent, Stack, Tab, Tabs } from '@mui/material';
import { useIntl } from 'react-intl';

import { TradingInputs } from './TradingInputs';
import { TradingRecap } from './TradingRecap';

import type { TradingPanelType } from '@dhedge/core-ui-kit/types';
import type { CardProps } from '@mui/material';
import type { FC } from 'react';

const TABS: TradingPanelType[] = ['deposit', 'withdraw'];
const TRADING_TAB_INDEX_MAP = TABS.reduce<Record<number, TradingPanelType>>(
  (acc, type, index) => {
    acc[index] = type;
    return acc;
  },
  {},
);

export const useTradingPanel = () => {
  const [type] = useTradingPanelType();
  const onTradingTypeChange = useOnTradingTypeChange();
  const poolConfig = useTradingPanelPoolConfig();

  useGeneralTradingPanelHandlers();

  const onTabChange = (index: number) => {
    onTradingTypeChange(TRADING_TAB_INDEX_MAP[index]);
  };

  useEffect(() => {
    onTradingTypeChange('deposit'); // Reset to "Deposit" tab on product change to set correct input tokens
  }, [poolConfig.address]);

  return {
    tabIndex: TABS.indexOf(type),
    isDeposit: type === 'deposit',
    onTabChange,
  };
};

export const TradingPanel: FC<CardProps> = (props) => {
  const intl = useIntl();
  const { tabIndex, onTabChange, isDeposit } = useTradingPanel();

  const tabNameMap: Record<TradingPanelType, string> = useMemo(
    () => ({
      deposit: intl.formatMessage({ defaultMessage: 'Buy', id: 'EnCOBJ' }),
      withdraw: intl.formatMessage({ defaultMessage: 'Sell', id: '9AgXoz' }),
    }),
    [intl],
  );

  return (
    <Card {...props} sx={{ position: 'relative', ...props?.sx }}>
      <CardContent>
        <Tabs
          value={tabIndex}
          onChange={(_, tab: number) => {
            onTabChange(tab);
          }}
          textColor="inherit"
          variant="fullWidth"
        >
          {TABS.map((tab) => (
            <Tab key={tab} label={tabNameMap[tab]} />
          ))}
        </Tabs>
        <Stack pt={2} spacing={2}>
          <TradingInputs />
          <TradingRecap />
        </Stack>
      </CardContent>
    </Card>
  );
};

import React from 'react';
import { useOrderWave } from '../providers/orderwave-provider';
import { OrderWaveSummary } from './OrderWaveSummary';
import { OrderWaveOrders } from './OrderWaveOrders';
import { OrderWaveDetails } from './OrderWaveDetails';
import { ActionsPanel } from './ActionsPanel';
import { useAuth } from '../providers/auth-provider';
import OwnOrderSummary from './OwnOrderSummary';

export function HomePage() {

  const {isHandler, userName} = useAuth();
  const {handler} = useOrderWave();

  const showhandlerDetails = () => isHandler() && userName === handler;

  return (<>
    <ActionsPanel>
      <OrderWaveDetails />
    </ActionsPanel>
    <OwnOrderSummary />
    {showhandlerDetails() && <>
      <OrderWaveSummary />
      <OrderWaveOrders />
    </>}
  </>);
}
import React, { useState } from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
// Import the supply function from the Aave utilities SDK (assumed import)
import { supplyUSDC } from '@aave/utilities-sdk';

export const AaveSupplyUSDC: React.FC = () => {
  const [status, setStatus] = useState<string>('');

  const handleSupply = async () => {
    setStatus('Supplying USDC on Base network...');
    try {
      // Call the SDK function to supply USDC (example parameters)
      const tx = await supplyUSDC({ amount: '1000', network: 'base' });
      setStatus(`Success! Transaction hash: ${tx.hash}`);
    } catch (error: any) {
      setStatus(`Error: ${error.message}`);
    }
  };

  return (
    <div>
      <h3>Supply USDC to Base Network</h3>
      <button onClick={handleSupply}>Supply USDC</button>
      <p>{status}</p>
    </div>
  );
};

export default {
  title: 'Lending/AaveSupplyUSDC',
  component: AaveSupplyUSDC,
} as ComponentMeta<typeof AaveSupplyUSDC>;

const Template: ComponentStory<typeof AaveSupplyUSDC> = (args) => <AaveSupplyUSDC {...args} />;

export const Default = Template.bind({});
Default.args = {};
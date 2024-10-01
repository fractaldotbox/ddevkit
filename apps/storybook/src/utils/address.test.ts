import { describe, expect, it } from 'vitest';
import { getShortAddress } from './address';

  describe('utils', () => {
    it('getShortAddress', () => {

        expect(getShortAddress(
          '0xa5cc3c03994db5b0d9a5eEdD10Cabab0813678ac'
       )).toEqual('0xa5cc...78AC');
    });
  });
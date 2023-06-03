import product from './product';
import banner from './banner';
import cpu from './cpu';
import gpu from './gpu';
import motherboard from './motherboard';
import storage from './storage';
import PCcase from './case.js';
import buildLow from './buildLow';
import buildMed from './buildMed';
import buildHigh from './buildHigh';

export const schemaTypes = [product, banner, buildLow, buildMed, buildHigh, cpu, gpu, motherboard, storage, PCcase];

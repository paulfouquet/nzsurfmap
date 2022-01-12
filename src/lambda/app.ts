import { fsa } from '@chunkd/fs';
import Forecast from './msw/forecast.js';
import * as zlib from 'zlib';
import pino from 'pino';
import axios from 'axios';
import { Spots } from './config.js';
import * as path from 'path';

const logger = pino();
const prefix = process.env.CACHE_PREFIX;
const apiKey = process.env.MSW_API_KEY;

const instance = axios.create({
  baseURL: `http://magicseaweed.com/api/${apiKey}/forecast`,
  timeout: 30000,
});

async function getForecast(spotId: string): Promise<Forecast[]> {
  try {
    const response = await instance.get('?spot_id=' + spotId + '&units=eu');
    logger.info({ response: response }, 'getForecast(' + spotId + ')');
    return response.data;
  } catch (error) {
    logger.error({ err: error }, 'getForecast error');
    throw error;
  }
}

export async function update(): Promise<void> {
  if (prefix == null) {
    throw new Error('Missing $CACHE_PREFIX');
  }

  const date = new Date();
  const latestFileName = prefix + '/' + 'latest.json';
  const backupFolder = path.join(date.getFullYear().toString(), (date.getMonth() + 1).toString());
  const todayFileName = prefix + '/' + path.join(backupFolder, date.toISOString().substring(0, 13).concat('.json'));

  let data = [];
  for (let [key, value] of Spots) {
    const forecasts = await getForecast(key.toString());
    const spotData = {
      spotInfo: value,
      forecasts: forecasts,
    };
    data.push(spotData);
  }

  const dataString = JSON.stringify(data, null, 2);
  const gzipData = zlib.gzipSync(Buffer.from(dataString));
  await fsa.write(todayFileName, gzipData, { contentEncoding: 'gzip' });
  await fsa.write(latestFileName, gzipData, { contentEncoding: 'gzip' });
}

export const handler = async () => {
  await update();
};

import Forecast from './ForecastInterface';

export default interface Spot {
  spotInfo: {
    id: number;
    name: string;
    coordinatex: number;
    coordinatey: number;
    picture: string;
  };
  forecasts: Forecast[];
}

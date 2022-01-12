import Swell from "./swell";
import Wind from "./wind";
import Condition from "./condition";
import Charts from "./charts";

export default interface Forecast {
  timestamp: string;
  localTimestamp: string;
  issueTimestamp: string;
  fadedRating: Number;
  solidRating: Number;
  threeHourTimeText: string;
  swell: Swell;
  wind: Wind;
  condition: Condition;
  charts: Charts;
}

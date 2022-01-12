export default interface Forecast {
  timestamp: string;
  localTimestamp: string;
  issueTimestamp: string;
  fadedRating: number;
  solidRating: number;
  swell: {
    absMinBreakingHeight: number;
    absMaxBreakingHeight: number;
    probability: number;
    unit: string;
    minBreakingHeight: number;
    maxBreakingHeight: number;
    components: {
      combined: {
        height: number;
        period: number;
        direction: number;
        compassDirection: string;
      };
      primary: {
        height: number;
        period: number;
        direction: number;
        compassDirection: string;
      };
      secondary: {
        height: number;
        period: number;
        direction: number;
        compassDirection: string;
      };
      tertiary: {
        height: number;
        period: number;
        direction: number;
        compassDirection: string;
      };
    };
  };
  wind: {
    speed: number;
    direction: number;
    compassDirection: string;
    chill: number;
    gusts: number;
    unit: string;
  };
  condition: {
    pressure: number;
    temperature: number;
    weather: string;
    unitPressure: string;
    unit: string;
  };
  charts: {
    swell: string;
    period: string;
    wind: string;
    pressure: string;
    sst: string;
  };
}

export const defaultForecast: Forecast = {
  timestamp: "",
  localTimestamp: "",
  issueTimestamp: "",
  fadedRating: 0,
  solidRating: 0,
  swell: {
    absMinBreakingHeight: 0,
    absMaxBreakingHeight: 0,
    probability: 0,
    unit: "",
    minBreakingHeight: 0,
    maxBreakingHeight: 0,
    components: {
      combined: {
        height: 0,
        period: 0,
        direction: 0,
        compassDirection: "",
      },
      primary: {
        height: 0,
        period: 0,
        direction: 0,
        compassDirection: "",
      },
      secondary: {
        height: 0,
        period: 0,
        direction: 0,
        compassDirection: "",
      },
      tertiary: {
        height: 0,
        period: 0,
        direction: 0,
        compassDirection: "",
      },
    },
  },
  wind: {
    speed: 0,
    direction: 0,
    compassDirection: "",
    chill: 0,
    gusts: 0,
    unit: "",
  },
  condition: {
    pressure: 0,
    temperature: 0,
    weather: "",
    unitPressure: "",
    unit: "",
  },
  charts: {
    swell: "",
    period: "",
    wind: "",
    pressure: "",
    sst: "",
  },
};

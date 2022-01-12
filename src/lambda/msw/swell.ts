import Component from "./component";

export default interface Swell {
  minBreakingHeight: Number;
  absMinBreakingHeight: Number;
  maxBreakingHeight: Number;
  absMaxBreakingHeight: Number;
  /* % chance of the swell being in the forecast range. */
  probability: Number;
  unit: string;
  components: {
    combined: Component;
    primary: Component;
    secondary: Component;
    tertiary: Component;
  };
}

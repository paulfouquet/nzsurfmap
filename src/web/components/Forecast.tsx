import * as React from 'react';
import Forecast from '../ForecastInterface';

export default class ForecastComponent extends React.Component<Forecast, {}> {
  constructor(props: Forecast) {
    super(props);
  }

  render() {
    const unit: string = this.props.swell.unit;
    let rating = [];
    for (var i = 0; i < this.props.solidRating; i++) {
      rating.push("<img src='/img/star_filled.png'>");
    }
    for (var i = 0; i < this.props.fadedRating; i++) {
      rating.push("<img src='/img/star_empty.png'>");
    }
    var d = new Date(parseInt(this.props.localTimestamp) * 1000);

    return (
      <li>
        <h2>{d.toLocaleTimeString()}</h2>
        <div dangerouslySetInnerHTML={{ __html: rating.join(' ') }}></div>
        {this.props.swell.minBreakingHeight}
        {unit} to {this.props.swell.maxBreakingHeight}
        {unit}
      </li>
    );
  }
}

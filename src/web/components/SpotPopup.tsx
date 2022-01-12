import * as React from 'react';
import './SpotPopup.css';
import Spot from '../SpotInterface';
import ForecastComponent from './Forecast';

export default class SpotPopupComponent extends React.Component<Spot, {}> {
  constructor(props: Spot) {
    super(props);
  }

  render() {
    const forecasts = this.props.forecasts
      .slice(0, 4)
      .map((d) => (
        <ForecastComponent
          timestamp={d.timestamp}
          localTimestamp={d.localTimestamp}
          issueTimestamp={d.issueTimestamp}
          fadedRating={d.fadedRating}
          solidRating={d.solidRating}
          swell={d.swell}
          wind={d.wind}
          condition={d.condition}
          charts={d.charts}
        />
      ));
    // /return ()
    return (
      <div>
        <h1>{this.props.spotInfo.name}</h1>
        <img src={'img/spots/' + this.props.spotInfo.picture} alt={this.props.spotInfo.name} width="150" />
        <div>
          <ul>{forecasts}</ul>
        </div>
        <a href="http://magicseaweed.com" target="_blank">
          <img src="http://im-1-uk.msw.ms/msw_powered_by.png" />
        </a>
      </div>
    );
  }
}

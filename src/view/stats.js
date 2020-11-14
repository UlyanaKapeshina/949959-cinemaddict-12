import Abstract from "./abstract";
import ChartDataLabels from "chartjs-plugin-datalabels";
import Chart from "chart.js";
import moment from "moment";
import {getRatingName} from "../utils/profile";
import {getHoursFilmForStat, getMinutesFilmForStat} from "../utils/common";
const BAR_HEIGHT = 50;

const renderChart = (statisticCtx, genres) => {
  return new Chart(statisticCtx, {
    plugins: [ChartDataLabels],
    type: `horizontalBar`,
    data: {
      labels: Object.keys(genres),
      datasets: [{
        data: Object.values(genres),
        backgroundColor: `#ffe800`,
        hoverBackgroundColor: `#ffe800`,
        anchor: `start`
      }]
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 20
          },
          color: `#ffffff`,
          anchor: `start`,
          align: `start`,
          offset: 40,
        }
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: `#ffffff`,
            padding: 100,
            fontSize: 20
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
          barThickness: 24
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true
          },
          gridLines: {
            display: false,
            drawBorder: false
          },
        }],
      },
      legend: {
        display: false
      },
      tooltips: {
        enabled: false
      }
    }
  });
};
const TimeFilterType = {
  ALL: `all-time`,
  TODAY: `today`,
  WEEK: `week`,
  MONTH: `month`,
  YEAR: `year`
};
const filterByTime = (filter, data) => {
  let filterData = 0;
  const today = moment().subtract(1, `days`).unix();
  const lastWeek = moment().subtract(7, `days`).unix();
  const lastMonth = moment().subtract(1, `months`).unix();
  const lastYear = moment().subtract(1, `years`).unix();

  switch (filter) {
    case TimeFilterType.TODAY:
      filterData = data.slice().filter((it) => moment(it.watchingDate).unix() >= today);
      break;
    case TimeFilterType.WEEK:
      filterData = data.slice().filter((it) => moment(it.watchingDate).unix() >= lastWeek);
      break;
    case TimeFilterType.MONTH:
      filterData = data.slice().filter((it) => moment(it.watchingDate).unix() >= lastMonth);
      break;
    case TimeFilterType.YEAR:
      filterData = data.slice().filter((it) => {
        const date = moment(it.watchingDate).unix();
        return date >= lastYear;
      });
      break;
    default:
      filterData = data.slice();
  }
  return filterData;
};
const getGroupGenresCount = (films) => {
  return films.map((it) => it.genres).flat().reduce((sum, current) => {
    sum[current] = (sum[current] || 0) + 1;
    return sum;
  }, {});
};
const getTopGenre = (films) => {
  const genres = getGroupGenresCount(films);
  let max = 0;
  let top = ``;
  for (let genre in genres) {
    if (genres[genre] > max) {
      max = genres[genre];
      top = genre;
    }
  }
  return top;
};

export default class Stats extends Abstract {
  constructor(films) {
    super();
    this._filter = TimeFilterType.ALL;
    this._films = films.slice().filter((it) => it.isWatched);
    this._filteredFilms = filterByTime(this._filter, this._films.slice());
    this._onFilterChangeHandler = this._onFilterChangeHandler.bind(this);
    this._setChart();
    this._setFilterHandler();
  }

  _setChart() {
    const groupGenresCount = getGroupGenresCount(this._filteredFilms);
    const statisticCtx = this.element.querySelector(`.statistic__chart`);
    statisticCtx.height = BAR_HEIGHT * Object.keys(groupGenresCount).length;
    renderChart(statisticCtx, groupGenresCount);
  }
  _setFilterHandler() {
    this.element.querySelector(`.statistic__filters`).addEventListener(`change`, this._onFilterChangeHandler);
  }
  _onFilterChangeHandler(evt) {
    if (evt.target.tagName !== `INPUT`) {
      return;
    }
    this._filter = evt.target.value;
    this._filteredFilms = filterByTime(this._filter, this._films.slice());
    this._update();

  }

  _restoreHandlers() {
    this._setChart();
    this._setFilterHandler();
  }
  _update() {
    let prevElement = this.element;
    const parent = prevElement.parentElement;
    this.removeElement();
    this._restoreHandlers();
    const newElement = this.element;
    parent.replaceChild(newElement, prevElement);
    prevElement = null;
  }


  createTemplate() {
    const watchedFilmsCount = this._filteredFilms.length;
    const duration = this._filteredFilms.reduce((sum, current) => {
      return sum + current.runtime;
    }, 0);

    const watchedFilmsHours = getHoursFilmForStat(duration);
    const watchedFilmsMinutes = getMinutesFilmForStat(duration);
    const profileRatingName = getRatingName(this._films);

    const topGenre = getTopGenre(this._filteredFilms.slice());
    const rankTemplate = profileRatingName ? `<p class="statistic__rank">
      Your rank
      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
      <span class="statistic__rank-label">${profileRatingName}</span>
      </p>` : ``;
    const filtersTemplate = Object.values(TimeFilterType).map((it) => {
      return `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${it}" value="${it}" ${it === this._filter ? `checked` : ``} ><label for="statistic-${it}" class="statistic__filters-label">${it}</label>`;
    }).join(``);


    return `<section class="statistic">
     ${rankTemplate}
    <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
      <p class="statistic__filters-description">Show stats:</p>
     ${filtersTemplate}
    </form>
    <ul class="statistic__text-list">
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">You watched</h4>
        <p class="statistic__item-text">${watchedFilmsCount} <span class="statistic__item-description">movies</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Total duration</h4>
        <p class="statistic__item-text">${watchedFilmsHours} <span class="statistic__item-description">h</span> ${watchedFilmsMinutes} <span class="statistic__item-description">m</span></p>
      </li>
      <li class="statistic__text-item">
        <h4 class="statistic__item-title">Top genre</h4>
        <p class="statistic__item-text">${topGenre}</p>
      </li>
    </ul>
    <div class="statistic__chart-wrap">
      <canvas class="statistic__chart" width="1000"></canvas>
    </div>
  </section>`;
  }
}

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import HorizontalCard from '../layout/HorizontalCard';
import FadeIn from 'react-fade-in';
import {
  addSavedItem,
  getSavedItems,
  deleteSavedItem,
} from '../../actions/saved_items';

const weekly_recc_1 = {
  title: 'Taxi Driver',
  imdbID: 'tt0075314',
  rated: ['R'],
  genre: ['Crime', 'Drama'],
  runtime: 114,
  language: ['English', 'Spanish'],
  year: 1976,
  oscarNominated: true,
  bigFive: false,
  actors: ['Diahnne Abbott', 'Robinson Frank Adu', 'Victor Argo'],
  imdbRating: 8.3,
  imdbVotes: 678235,
  rotTomRating: 97,
  metacriticRating: 94,
  services: ['netflix', 'criterion_channel', 'rent'],
  poster:
    'https://m.media-amazon.com/images/M/MV5BM2M1MmVhNDgtNmI0YS00ZDNmLTkyNjctNTJiYTQ2N2NmYzc2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg',
  plot:
    'A mentally unstable veteran works as a nighttime taxi driver in New York City, where the perceived decadence and sleaze fuels his urge for violent action by attempting to liberate a presidential campaign worker and an underage prostitute.',
  trailer: 'https://www.youtube.com/watch?v=UUxD4-dEzn0'
};
const weekly_recc_2 = {
  title: 'Primal Fear',
  imdbID: 'tt0117381',
  rated: ['R'],
  genre: ['Crime', 'Drama', 'Mystery', 'Thriller'],
  runtime: 129,
  language: ['English', 'Spanish'],
  year: 1996,
  oscarNominated: true,
  bigFive: true,
  actors: ['Richard Gere', 'Laura Linney', 'John Mahoney'],
  imdbRating: 7.7,
  imdbVotes: 173342,
  rotTomRating: 75,
  metacriticRating: 47,
  services: ['starz', 'rent'],
  poster:
    'https://m.media-amazon.com/images/M/MV5BZTM2NWI2OGYtYWNhMi00ZTlmLTg2ZTAtMmI5NWRjODA5YTE1XkEyXkFqcGdeQXVyODE2OTYwNTg@._V1_SX300.jpg',
  plot:
    'An altar boy is accused of murdering a priest, and the truth is buried several layers deep.',
  trailer: 'https://www.youtube.com/watch?v=PnmTi7hSjrA'
};
const weekly_recc_3 = {
  title: 'Eternal Sunshine of the Spotless Mind',
  imdbID: 'tt0338013',
  rated: ['R'],
  genre: ['Drama', 'Romance', 'Sci-Fi'],
  runtime: 108,
  language: ['English'],
  year: 2004,
  oscarNominated: true,
  bigFive: false,
  actors: ['Jim Carrey', 'Kate Winslet', 'Gerry Robert Byrne'],
  imdbRating: 8.3,
  imdbVotes: 863130,
  rotTomRating: 93,
  metacriticRating: 89,
  services: ['starz', 'rent'],
  poster:
    'https://m.media-amazon.com/images/M/MV5BMTY4NzcwODg3Nl5BMl5BanBnXkFtZTcwNTEwOTMyMw@@._V1_SX300.jpg',
  plot:
    'When their relationship turns sour, a couple undergoes a medical procedure to have each other erased from their memories.',
  trailer: 'https://www.youtube.com/watch?v=rb9a00bXf-U'
};

export class LandingPageBox extends Component {
  componentDidMount() {
    this.props.getSavedItems();
  }

  handleSaveClick(item) {
    const matches = this.props.saved_items.filter(
      (saved_item) =>
        saved_item[item_id_names[this.props.item_type]] ==
        item[item_id_names[this.props.item_type]]
    );

    if (matches.length > 0) {
      this.props.deleteSavedItem(matches[0]['id']);
    } else {
      this.props.addSavedItem({
        ...item,
        item_type: 'movies',
      });
    }
  }

  render() {
    return (
      <Fragment>
        <br />
        <div className="jumbotron">
          <h1 className="display-4">Suggestr</h1>
          Designed by Josh Greensmith
          <p className="lead">
            <br />
            Find your new favourite film or TV show here!
            <br />
            Answer a few questions and discover a new film from the top 10,000
            films on IMDb.
            <br />
            Save them for later or watch now by creating an account or signing
            in.
          </p>
          <div className="row">
            <div className="col-4">
              <Link className="btn btn-primary btn-lg" to="/movies/questions">
                Movies
              </Link>
            </div>
            <div className="col-4">
              <Link className="btn btn-primary btn-lg" to="/tv/questions">
                TV
              </Link>
            </div>
          </div>
        </div>
        <div className="container">
          <h3>Weekly reccomendations</h3>
          <br />
          <div className="row">
            <div className="col-auto mb-3">
              <FadeIn>
                <HorizontalCard
                  {...weekly_recc_1}
                  showReloadButton={false}
                  handleSaveClick={() => this.handleSaveClick(weekly_recc_1)}
                />
              </FadeIn>
            </div>
            <div className="col-auto mb-3">
              <FadeIn>
                <HorizontalCard
                  {...weekly_recc_2}
                  showReloadButton={false}
                  handleSaveClick={() => this.handleSaveClick(weekly_recc_2)}
                />
              </FadeIn>
            </div>
            <div className="col-auto mb-3">
              <FadeIn>
                <HorizontalCard
                  {...weekly_recc_3}
                  showReloadButton={false}
                  handleSaveClick={() => this.handleSaveClick(weekly_recc_3)}
                />
              </FadeIn>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

const mapStateToProps = (state) => ({
  saved_items: state.saved_items.saved_items,
});

export default connect(mapStateToProps, {
  addSavedItem,
  getSavedItems,
  deleteSavedItem,
})(LandingPageBox);

import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import FadeIn from 'react-fade-in';
import HorizontalCard from '../layout/HorizontalCard';

import { getSavedItems, deleteSavedItem } from '../../actions/saved_items';
const plot_length = 100;
const item_id_names = {
  movies: 'imdbID',
  tv: 'imdbID',
  books: 'goodreadsID',
};

export class SavedItemsBox extends Component {
  static propTypes = {
    saved_items: PropTypes.array.isRequired,
  };

  componentDidMount() {
    this.props.getSavedItems();
  }

  handleDeleteSavedItem(item) {
    this.props.deleteSavedItem(item.id);
  }

  render() {
    let saved_items_cards = [];
    for (let i = 0; i < this.props.saved_items.length; i += 3) {
      saved_items_cards.push(
        <div key={i}>
          <div className="row justify-content-left" key={i}>
            {this.props.saved_items.slice(i, i + 3).map((item) => (
              <div className="col-auto mb-3" key={item.title}>
                <FadeIn>
                  <HorizontalCard
                    {...item}
                    showReloadButton={false}
                    handleSaveClick={() => this.handleDeleteSavedItem(item)}
                  />
                </FadeIn>
              </div>
            ))}
          </div>
          <br />
        </div>
      );
    }

    return (
      <div className="container-fluid">
        <br />
        <h2>Your saved items</h2>
        Choose one of the movies or TV shows you saved for later to watch now!
        <br />
        <br />
        <FadeIn>{saved_items_cards}</FadeIn>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  saved_items: state.saved_items.saved_items,
});

export default connect(mapStateToProps, { getSavedItems, deleteSavedItem })(
  SavedItemsBox
);

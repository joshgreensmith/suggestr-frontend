import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../../store';
import FadeIn from 'react-fade-in';
import HorizontalCard from '../layout/HorizontalCard';

import {
  addSavedItem,
  getSavedItems,
  deleteSavedItem,
} from '../../actions/saved_items';
import { REPLACE_WATCHED_ITEM } from '../../actions/types';

const reccs_to_load = 12;
const item_id_names = {
  movies: 'imdbID',
  tv: 'imdbID',
  books: 'goodreadsID',
};

export class ReccsBox extends Component {
  static propTypes = {
    reccs: PropTypes.array.isRequired,
    item_type: PropTypes.string.isRequired,
    saved_items: PropTypes.array.isRequired,
    getSavedItems: PropTypes.func.isRequired,
    addSavedItem: PropTypes.func.isRequired,
  };

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
        item_type: this.props.item_type,
      });
    }
  }

  handleWatchedButtonClick(item) {
    store.dispatch({
      type: REPLACE_WATCHED_ITEM,
      payload: this.props.reccs.indexOf(item),
    });
  }

  render() {
    let recc_cards = [];
    for (let i = 0; i < reccs_to_load; i += 3) {
      recc_cards.push(
        <Fragment key={i}>
          <div className="row justify-content-left" key={i}>
            {this.props.reccs.slice(i, i + 3).map((item) => (
              <div className="col-auto mb-3" key={item.title}>
                <FadeIn>
                  <HorizontalCard
                    {...item}
                    showReloadButton={true}
                    handleWatchedButtonClick={() => this.handleWatchedButtonClick(item)}
                    handleSaveClick={() => this.handleSaveClick(item)}
                  />
                </FadeIn>
              </div>
            ))}
          </div>
          <br />
        </Fragment>
      );
    }

    return (
      <div className="container-fluid">
        <br />
        <h2>Pick from one of the following films!</h2>
        Click the reload button if you've already watched it or save it for
        later with the saved button if you are logged in.
        <br />
        <br />
        <FadeIn>{recc_cards}</FadeIn>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  reccs: state.reccs.reccs,
  item_type: state.questions.item_type,
  saved_items: state.saved_items.saved_items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, {
  getSavedItems,
  addSavedItem,
  deleteSavedItem,
})(ReccsBox);

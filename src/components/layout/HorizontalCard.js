import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const plot_length = 120;
const item_id_names = {
  movies: 'imdbID',
  tv: 'imdbID',
  books: 'goodreadsID',
};
const card_horizontal_style = {
  display: 'flex',
  flex: '1 1 auto',
};

export class HorizontalCard extends Component {
  static propTypes = {
    item_type: PropTypes.string.isRequired,
    saved_items: PropTypes.array.isRequired,
  };
  
  render() {
    return (
      <div className="card" style={{ width: '20rem' }}>
        <div style={card_horizontal_style}>
          <div className="img-square-wrapper">
            <img
              className=""
              src={this.props.poster}
              style={{ width: 'auto', height: '150px' }}
              alt="Card poster"
            />
          </div>
          <div className="card-body p-3">
            {this.props.showReloadButton && (
              <img
                className="float-right"
                onClick={this.props.handleWatchedButtonClick}
                src="https://icon-library.com/images/refresh-button-icon/refresh-button-icon-18.jpg"
                style={{
                  width: 'auto',
                  height: '25px',
                  cursor: 'pointer',
                }}
              />
            )}

            <h6 className="card-title">{this.props.title}</h6>

            <p className="card-text" style={{ fontSize: '0.9rem' }}>
              <small className="font-weight-light">
                {this.props.plot < plot_length
                  ? this.props.plot
                  : this.props.plot.substr(0, plot_length).split(' ').slice(0,-1).join(' ').concat(' ...')}
              </small>
            </p>
          </div>
        </div>
        <div className="card-footer">
          <div className="row text-muted">
            <div className="col-5">
              {this.props.imdbRating ? (
                <Fragment>
                  <img
                    src="https://www.kindpng.com/picc/m/460-4608215_picture-logo-imdb-png-transparent-png.png"
                    style={{ width: 'auto', height: '20px' }}
                  />
                  <small> {this.props.imdbRating}/10</small>
                </Fragment>
              ) : (
                ''
              )}
            </div>
            <div className="col-4">
              {this.props.rotTomRating ? (
                <Fragment>
                  <img
                    src="https://www.pngitem.com/pimgs/m/138-1381056_rotten-tomatoes-fresh-logo-hd-png-download.png"
                    style={{ width: 'auto', height: '25px' }}
                  />
                  <small> {this.props.rotTomRating}%</small>
                </Fragment>
              ) : (
                ''
              )}
            </div>
            <div className="col-3">
              {this.props.isAuthenticated && (
                <button
                  className="btn btn-outline-primary btn-sm float-right"
                  onClick={this.props.handleSaveClick}
                  style={{cursor: 'pointer'}}
                >
                  {this.props.saved_items.filter(
                    (saved_item) =>
                      saved_item[item_id_names[this.props.item_type]] ==
                      item[item_id_names[this.props.item_type]]
                  ).length > 0
                    ? 'Saved'
                    : 'Save'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  item_type: state.questions.item_type,
  saved_items: state.saved_items.saved_items,
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(HorizontalCard);

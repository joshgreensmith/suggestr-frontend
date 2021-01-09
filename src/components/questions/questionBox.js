import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getPoolSize, getReccs } from '../../actions/reccs';
import { nextPrevQuestion } from '../../actions/questions';
import {
  SET_ITEM_TYPE,
  GET_QUESTIONS,
  RESET_QUESTIONS,
} from '../../actions/types';
import store from '../../store';

import GaugeChart from 'react-gauge-chart';

const chartProps = {
  id: 'gauge-chart-1',
  style: {
    width: 200,
    height: 100,
    position: 'absolute',
    right: 10,
  },
  nrOfLevels: 30,
  colors: ['#FF5F6D', '#FFC371'],
  arcWidth: 0.3,
  marginInPercent: 0.05,
  cornerRadius: 6,
  arcPadding: 0.05,
  textColor: '#000000',
  needleColor: '#a6a6a6',
  needleBaseColor: '#a6a6a6',
  hideText: false,
  animate: true,
};

export class QuestionBox extends Component {
  state = {
    response: {
      multi_response_arr: [],
    },
    max_pool_size: 0,
    got_reccs: false,
    width: 0,
    height: 0,
  };

  static propTypes = {
    questions: PropTypes.array.isRequired,
    question_number: PropTypes.number.isRequired,
    responses: PropTypes.array.isRequired,
    pool_size: PropTypes.number.isRequired,
    reccs: PropTypes.array,
  };

  componentDidMount() {
    // Load initial response, get pool size, set item type and load the questions
    store.dispatch({
      type: RESET_QUESTIONS,
      payload: null,
    });
    store.dispatch({
      type: SET_ITEM_TYPE,
      payload: this.props.item_type,
    });
    store.dispatch({
      type: GET_QUESTIONS,
      payload: this.props.item_type,
    });
    this.props.getPoolSize(this.props.item_type, []);

    // Get screen size for excluding gaugeChart on mobile
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentDidUpdate(prevProps) {
    if (this.props.item_type !== prevProps.item_type) {
    }
    // Load first response when got questions
    if (this.props.got_questions && !prevProps.got_questions) {
      this.loadResponse();
    }

    // Load the next response into component state when the question number is changed
    if (this.props.question_number !== prevProps.question_number) {
      this.loadResponse();
    }
    // Get the pool size if the responses are updated
    if (this.props.responses !== prevProps.responses) {
      this.props.getPoolSize(this.props.item_type, this.props.responses);
    }
    // Set the max pool size on the first time the poolsize is loaded
    if (this.props.pool_size !== prevProps.pool_size) {
      if (!this.state.max_pool_size) {
        this.setState({ max_pool_size: this.props.pool_size });
      }
    }
    // Redirect to reccomendations page in render of component when questions finished
    if (this.props.reccs.length > 0 && prevProps.reccs.length == 0) {
      this.setState({ got_reccs: true });
    }
  }

  loadResponse() {
    const {
      db_key,
      multi_response,
      multi_response_alt,
      exact_match,
      single_response,
      single_response_alt,
      range,
      range_alt,
      responses_alt,
    } = this.props.questions[this.props.question_number];

    let multi_response_arr = [];
    let single_response_str = '';

    for (let i = 0; i < this.props.responses.length; i++) {
      const response = this.props.responses[i];
      if (response.db_key == db_key) {
        multi_response_arr = response.multi_response_arr;
        single_response_str = response.single_response_str;
        break;
      }
    }

    this.setState({
      response: {
        db_key,
        multi_response,
        multi_response_alt,
        exact_match,
        single_response,
        single_response_alt,
        range,
        range_alt,
        multi_response_arr,
        responses_alt,
        single_response_str,
      },
    });
  }

  handleResponseClick = (e) => {
    if (this.state.response.multi_response) {
      const response = e.target.name;
      let multi_response_arr = this.state.response.multi_response_arr;

      if (multi_response_arr.includes(response)) {
        multi_response_arr = multi_response_arr.filter(
          (item) => item !== response
        );
      } else {
        multi_response_arr.push(response);
      }
      this.setState({
        response: { ...this.state.response, multi_response_arr },
      });
    } else if (
      this.state.response.single_response ||
      this.state.response.range
    ) {
      const response = e.target.name;
      let single_response_str = this.state.response.single_response_str;

      if (response !== single_response_str) {
        single_response_str = response;
      }

      this.setState({
        response: { ...this.state.response, single_response_str },
      });
    }
  };

  handleNextPrevClick = (e) => {
    this.props.nextPrevQuestion(e.target.name, this.state.response);
  };

  handleSubmitClick = (e) => {
    this.props.getReccs(this.props.item_type, this.props.responses);
  };

  render() {
    if (this.state.got_reccs) {
      return <Redirect to={`/${this.props.item_type}/reccomendations/`} />;
    } else if (this.props.got_questions) {
      const question = this.props.questions[this.props.question_number];

      let responses;
      if (question.multi_response) {
        if (question.responses_arr.length < 8) {
          responses = (
            <div className="list-group">
              {question.responses_arr.map((response) => (
                <button
                  type="button"
                  className={`list-group-item list-group-item-action ${
                    this.state.response.multi_response_arr.includes(response)
                      ? 'active'
                      : ''
                  }`}
                  key={response}
                  name={response}
                  onClick={this.handleResponseClick}
                >
                  {response}
                </button>
              ))}
            </div>
          );
        } else {
          responses = [];
          for (let i = 0; i < question.responses_arr.length; i += 3) {
            responses.push(
              <div className="row" key={i}>
                {question.responses_arr.slice(i, i + 3).map((response) => (
                  <div key={response} className="col-sm">
                    <button
                      type="button"
                      className={`list-group-item list-group-item-action ${
                        this.state.response.multi_response_arr.includes(
                          response
                        )
                          ? 'active'
                          : ''
                      }`}
                      key={response}
                      name={response}
                      onClick={this.handleResponseClick}
                    >
                      {response}
                    </button>
                  </div>
                ))}
              </div>
            );
          }
        }
      } else if (question.single_response || question.range) {
        responses = (
          <div className="list-group">
            {question.responses_arr.map((response) => (
              <button
                type="button"
                className={`list-group-item list-group-item-action ${
                  this.state.response.single_response_str == response
                    ? 'active'
                    : ''
                }`}
                key={response}
                name={response}
                onClick={this.handleResponseClick}
              >
                {response}
              </button>
            ))}
          </div>
        );
      }
      return (
        <div className="container">
          <br />
          <div className="row">
            <div className="col-sm">
              <h2>{question.title}</h2>
              {question.secondary}
            </div>

            {this.state.max_pool_size && this.state.width > 600 ? (
              <div className="col-sm">
                <GaugeChart
                  {...chartProps}
                  percent={this.props.pool_size / this.state.max_pool_size}
                />
              </div>
            ) : (
              ''
            )}
          </div>

          <br />
          {responses}
          <br />
          {this.props.question_number > 0 ? (
            <div className="float-left">
              <button
                className="btn btn-outline-primary"
                name="Previous"
                onClick={this.handleNextPrevClick}
                style={{ cursor: 'pointer' }}
              >
                Previous
              </button>
            </div>
          ) : (
            ''
          )}

          {this.props.question_number < this.props.questions.length - 1 ? (
            <div className="float-right">
              <button
                className="btn btn-outline-primary"
                name="Next"
                onClick={this.handleNextPrevClick}
                style={{ cursor: 'pointer' }}
              >
                Next
              </button>
            </div>
          ) : (
            <div className="float-right">
              <button
                className="btn btn-outline-primary"
                name="Submit"
                onClick={this.handleSubmitClick}
                style={{ cursor: 'pointer' }}
              >
                Submit
              </button>
            </div>
          )}
          <br />
          <br />
        </div>
      );
    } else {
      return null;
    }
  }
}

const mapStateToProps = (state) => ({
  questions: state.questions.questions,
  got_questions: state.questions.got_questions,
  question_number: state.questions.question_number,
  responses: state.questions.responses,
  pool_size: state.reccs.pool_size,
  reccs: state.reccs.reccs,
});

export default connect(mapStateToProps, {
  getPoolSize,
  getReccs,
  nextPrevQuestion,
})(QuestionBox);

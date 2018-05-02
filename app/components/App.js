import React from 'react';
import { connect } from 'react-redux'

import NumericInput from 'react-numeric-input';

import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import moment from 'moment';

import {
    loadProjectInfo,
    pledge
} from '../actions';

class App extends React.Component {
    state = {
        amount: 20
    }

    backProject = () => {
        // validate
        // go to payment gateway, [fiat] => ETH
        // or show ethereum address
        this.props.pledge(this.state.amount)
    }

    componentDidMount() {
        this.props.loadProjectInfo()
    }

    render() {
        let {
            goal,
            raised,
        } = this.props.project;
        let deadline = moment(this.props.project.deadline).endOf('day').fromNow();

        let numBackers = 0;
        // BackerContributed

        return <div className='container'>
            <h1>Crowdfunding</h1>

            <p>{goal} ETH goal - {deadline}</p>
            <p>{raised} ETH pledged</p>
            <p>{numBackers} backers</p>
            
            <div className="form-row">
                <input type='number' min='0' value={this.state.amt} onChange={(ev) => this.setState({ amount: parseInt(ev.target.value), })}/>
                <button type="button" class="btn btn-primary btn-lg" onClick={this.backProject}>
                    Back this project
                </button>
            </div>
        </div>
    }
}

const mapStateToProps = state => {
    return {
        project: state.project
    }
}

const mapDispatchToProps = dispatch => {
    return {
        loadProjectInfo: () => dispatch(loadProjectInfo()),
        pledge: (amt) => dispatch(pledge(amt))
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);
import React, { Component } from "react";
import { goalService } from "./../../services";

class Goal extends Component {
  constructor(props) {
    super(props);
    this.state = { goal: props.goal };
  }

  render() {
    return (
      <div key={this.state.goal.id} className="card text-center">
        <div className="card-header">Root goal</div>
        <div className="card-body">
          <h5 className="card-title">{this.state.goal.title}</h5>
          <p className="card-text">{this.state.goal.desc}</p>
          <button className="btn btn-primary">Open goal</button>
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

class Goals extends Component {
  constructor(props) {
    super(props);
    this.state = { goals: [] };
  }

  async componentWillMount() {
    let goals = await goalService.getGoals();
    this.setState({
      goals
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col-md-12">
          <h3>My Goals</h3>
          {this.drawGoals(this.state.goals)}
        </div>
      </div>
    );
  }

  drawGoals = goals => {
    return goals.map(g => <Goal key={g.id} goal={g} />);
  };
}

export {Goals, Goal};

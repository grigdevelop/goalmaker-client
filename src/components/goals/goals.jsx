import React, { Component } from "react";
import { goalService } from "./../../services";

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

  drawGoals = (goals) => {
      return goals.map(g => this.drawGoal(g));
  }

  drawGoal = (goal) => {
    return (
      <div key={goal.id} className="card text-center">
        <div className="card-header">Root goal</div>
        <div className="card-body">
          <h5 className="card-title">{goal.title}</h5>
          <p className="card-text">
            {goal.desc}
          </p>
          <button className="btn btn-primary">
            Open goal
          </button>         
        </div>
        <div className="card-footer text-muted">2 days ago</div>
      </div>
    );
  }
}

export default Goals;

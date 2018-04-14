// @flow

import React, { Component } from "react";
import shuffle from "shuffle-array";
import "./App.css";
import Photos from "../lib/Photos";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      images: null,
      state: "REQUESTED",
      message: null,
      displayIndex: 0
    };
  }

  componentDidMount() {
    setTimeout(() => window.location.reload(), 30 * 60 * 1000);

    Photos.get()
      .then(images => shuffle(images).slice(0, 100))
      .then(images => this.setState({ images, state: "SUCCEEDED" }))
      .then(() => {
        setInterval(() => {
          let displayIndex = this.state.displayIndex + 1;

          if (displayIndex >= this.state.images.length) {
            displayIndex = 0;
          }

          this.setState({ displayIndex });
        }, 20000);
      })
      .catch(err => {
        console.error(err);

        this.setState({
          state: "FAILED",
          message: err.message || "Undefined error"
        });
      });
  }

  render() {
    if (this.state.images && this.state.images.length) {
      return (
        <div
          className="app"
          style={{
            width: `${this.state.images.length * 100}vw`,
            marginLeft: `-${this.state.displayIndex * 100}vw`
          }}
        >
          <div className="app__list">
            {this.state.images.map(image => (
              <div
                key={image}
                className="app__listitem"
                style={{ backgroundImage: `url('${image}')` }}
              />
            ))}
          </div>
        </div>
      );
    }

    switch (this.state.state) {
      case "REQUESTED":
        return <h1>Loading</h1>;

      case "FAILED":
        return <h1>Error: {this.state.message}</h1>;

      default:
        return <h1>Success but not images</h1>;
    }
  }
}

export default App;

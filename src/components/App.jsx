// @flow

import React, { Component } from "react";
import "./App.css";

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

    Promise.all([
      this.fetchInstagramPhotos("charlie_a_jackson"),
      this.fetchInstagramPhotos("vikibell")
    ])
      .then(response => [].concat(response[0].photos, response[1].photos))
      .then(photos => photos.sort(() => 0.5 - Math.random()))
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

  fetch;

  fetchInstagramPhotos(username, cursor) {
    const url = cursor
      ? `https://www.instagram.com/${username}/?__a=1&max_id=${cursor}`
      : `https://www.instagram.com/${username}/?__a=1`;

    return fetch(url)
      .then(res => res.json())
      .then(json => ({
        photos: json.graphql.user.edge_owner_to_timeline_media.edges
          .filter(edge => !edge.node.is_video)
          .map(edge => edge.node.display_url),
        cursor:
          json.graphql.user.edge_owner_to_timeline_media.page_info.end_cursor
      }));
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

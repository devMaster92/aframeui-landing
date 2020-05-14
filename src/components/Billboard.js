// Billboards on the Globe (DO NOT CHANGE)

import React, { Component } from "react";
import GlobalEvents from "../utils/global-events";
class Billboard extends Component {
  triggerNext(e) {
    // console.log('element',e.currentTarget.getAttribute('id'))
    GlobalEvents.trigger("triggercountry", this.props.value.toLowerCase());
    // alert("wait for next build :-P")
  }
  render() {
    return (
      <a-entity
        class='clickable'
        id={"billboard_".concat(this.props.value)}
        scale='1.6 1.6 1.6'
        position={this.props.position}
        rotation={this.props.rotation}
        geometry='primitive:box;width: 0.01; height: 0.1; depth: 0.01'
        material='src: #wooden'
        onClick={this.triggerNext.bind(this)}
      >
        <a-entity
          class='clickable'
          rotation='0 0 90'
          position='0.03 0.03 0'
          geometry=' primitive:box; width: 0.01; height: 0.1; depth: 0.01'
          material='src: #wooden'
        >
          <a-entity
            class='clickable'
            position='-0.025 -0.013 0'
            geometry=' primitive:plane; width: 0.035; height: 0.07;'
            material='src: #wooden'
          >
            <a-text
              class='clickable'
              position='0 0 0.005'
              rotation='0 0 -90'
              align='center'
              anchor='center'
              value={this.props.value}
              color='white'
              width={`${1.5 / this.props.value.length}`}
            />
          </a-entity>
        </a-entity>
      </a-entity>
    );
  }
}
export default Billboard;

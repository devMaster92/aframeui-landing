// Aframe CrawlText Event (DO NOT CHANGE)

import React, { Component } from "react";
import { Power2, TimelineLite } from "gsap";
import logo from "../../src/logo.png";
import "../css/App.css";
import "aframe";
import GlobalEvents from "../utils/global-events.js";

class CrawlText extends Component {
  constructor(props) {
    super(props);
    this.intro = React.createRef();
    this.logo = React.createRef();
    this.content = React.createRef();
    this.audio = React.createRef();

    this.state = {
      muted: true
    };
  }

  onVolumeClick = () => {
    if (this.state.muted) {
      this.audio.current.muted = false;
    } else {
      this.audio.current.muted = true;
    }

    this.setState({ muted: !this.state.muted });
  };

  componentDidMount() {
    var timelinePromise = () => {
      return new Promise(resolve => {
        const tl = new TimelineLite({
          paused: true,
          onComplete: () => {
            resolve(true);
          }
        })
          .to(this.intro.current, 4.5, { opacity: 1, delay: 9 })
          .to(this.intro.current, 1.5, {
            opacity: 0,
            onComplete: () => {
              if (this.audio.current) {
                this.audio.current.play();
              }
            }
          })
          .set(this.logo.current, {
            opacity: 1,
            scale: 2.75,
            delay: 0.5
          })
          .to(this.logo.current, 3, { scale: 0.05, ease: Power2.easeOut })
          .to(this.logo.current, 1, { opacity: 0 }, "-=1.5");

        tl.play();
      });
    };

    timelinePromise().then(function(res) {
      GlobalEvents.trigger("CrawlComplete");
    });
  }

  render() {
    return (
      <div className='container' id='CrawlText'>
        <section className='intro' ref={this.intro}>
          <h1>
            {" "}
            <p>
              <b>"With great power comes great responsibility"</b>
            </p>
          </h1>
        </section>
        <section className='logo' ref={this.logo}>
          <img src={logo} alt='Code Wars logo' />
        </section>
        <section className='crawl'>
          <div className='content' ref={this.content} />
        </section>
        <audio ref={this.audio} muted>
          <source
            type='audio/mpeg'
            src='https://ia801501.us.archive.org/23/items/StarWars_20180709/Star%20Wars.mp3'
          />
        </audio>
        <button className='volume' type='button' onClick={this.onVolumeClick}>
          {/* Icons created by Agarunov Oktay-Abraham from the Noun Project */}
          {/* https://thenounproject.com/agarunov/ */}
          {this.state.muted ? (
            <img src='volume_off.svg' alt='Volume is off' />
          ) : (
            <img src='volume_on.svg' alt='Volume is on' />
          )}
        </button>
      </div>
    );
  }
}

export default CrawlText;

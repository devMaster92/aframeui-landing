import React, {Component} from 'react';
import {ResponsiveRadar} from '@nivo/radar';

class SpiderChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: Array.isArray(this.props.compData) ? this.props.compData : [],
            colors: ['#2F32D1', '#7DAD24', '#F2B705', '#A60303', '#A6038B']
            // default chart data - comment previus line and uncomment lines below to test
            // data: [{"name":"health","Competitor_3":1,"Competitor_1":7,"Competitor_2":4,"Your Brand":5},
            // {"name":"pleasure","Competitor_3":1,"Competitor_1":2,"Competitor_2":6,"Your Brand":5},
            // {"name":"taste","Competitor_3":1,"Competitor_1":4,"Competitor_2":4,"Your Brand":5}]
        }
    }

    componentDidUpdate(oldProps) {
        const newProps = this.props
        if (oldProps.compData !== newProps.compData) {
            this.setState({
                data: newProps.compData,
                colors: newProps.colors
            })
        }
    }

    render() {
        if (this.state.data.length > 0) {
            return (
                <div style={{height: "100%"}}>
                    <ResponsiveRadar
                        data={this.state.data}
                        keys={Object.keys(this.state.data[0]).slice(1, Object.keys(this.state.data[0]).length)}
                        indexBy="name"
                        maxValue="auto"
                        margin={{
                            "top": 0,
                            "right": 36,
                            "bottom": 0,
                            "left": 35
                        }}
                        curve="linearClosed"
                        borderWidth={2}
                        borderColor={{
                            "from": "color",
                            "modifiers": []
                        }}
                        gridLevels={5}
                        gridShape="circular"
                        enableDots={true}
                        dotSize={5}
                        dotColor={{
                            "theme": "background"
                        }}
                        dotBorderWidth={2}
                        dotBorderColor={{
                            "from": "color"
                        }}
                        enableDotLabel={false}
                        dotLabel="value"
                        dotLabelYOffset={-12}
                        colors={
                            this.state.colors
                        }
                        fillOpacity={0.25}
                        blendMode="multiply"
                        animate={true}
                        motionStiffness={90}
                        motionDamping={15}
                        isInteractive={true}
                        gridLabelOffset={8}
                        // legends={[
                        //     {
                        //         "anchor": "top-left",
                        //         "direction": "column",
                        //         "translateX": -50,
                        //         "translateY": -40,
                        //         "itemWidth": 80,
                        //         "itemHeight": 20,
                        //         "itemTextColor": "#999",
                        //         "symbolSize": 12,
                        //         "symbolShape": "circle",
                        //         "effects": [
                        //             {
                        //                 "on": "hover",
                        //                 "style": {
                        //                     "itemTextColor": "#000"
                        //                 }
                        //             }
                        //         ]
                        //     }
                        // ]}
                    />

                </div>

            );

        } else {
            return (
                <div className="noSimText">
                    No data available for Radar chart
                </div>
            )
        }
    }
}

export default SpiderChart;

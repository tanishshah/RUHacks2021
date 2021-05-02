//Imports
import React from 'react';
import { VictoryBar, VictoryChart, VictoryPie, VictoryAxis,VictoryTheme } from 'victory';
import '../App.css';
import axios from 'axios'

//the class that displays the data 
class DataVisual extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: []
        }
    }
    //get data from the database
    componentDidMount() {
        axios.get('http://localhost:5000/events')
            .then(response => {
                if (response.data) {
                    console.log('did mount')
                    this.setState({
                        events: response.data
                })
                }
            })
            .catch(error => {
                console.log(error)
            }
        )
    };
    //used for the bar chart (counting how many of each trigger)
    countElements(triggers){
        let frequency = [0,0,0]
        for(let i=0;i<triggers.length;i++)
        {   
            console.log(triggers[i]);
            if(triggers[i][0] === "t")
                frequency[0]++;
            else if(triggers[i][0] === "l")
                frequency[1]++;
            else 
                frequency[2]++;
        }
        console.log(frequency);
        return frequency;
    }
    //used for the bar chart, determines what month the data was logged
    countMonth(dates){
        let frequency=Array(12).fill(0);
        for(let i=0;i<dates.length;i++)
        {   
            if(dates[i].slice(5,7) === "01")
                frequency[0]++;
            else if(dates[i].slice(5,7) === "02")
                frequency[1]++;
            else if(dates[i].slice(5,7) === "03")
                frequency[2]++;
            else if(dates[i].slice(5,7) === "04")
                frequency[3]++;
            else if(dates[i].slice(5,7) === "05")
                frequency[4]++;
            else if(dates[i].slice(5,7) === "06")
                frequency[5]++;
            else if(dates[i].slice(5,7) === "07")
                frequency[6]++;
            else if(dates[i].slice(5,7) === "08")
                frequency[7]++;
            else if(dates[i].slice(5,7) === "09")
                frequency[8]++;
            else if(dates[i].slice(5,7) === "10")
                frequency[9]++;
                else if(dates[i].slice(5,7) === "11")
                frequency[10]++;
            else if(dates[i].slice(5,7) === "12")
                frequency[11]++;
        }
        console.log(frequency);
        return frequency;
    }
    render() {
        //steps to convert the data into a way the data can be used by Victory
        let trigs =[];
        let dates = [];
        this.state.events.map(({trigger})=>(trigs.push(trigger)));
        this.state.events.map(({date})=>(dates.push(date)));
        let frequency = this.countElements(trigs);
        let months = this.countMonth(dates);
        console.log(months);
        
    return (
    <div>
        <div> {/*the code to make the bar chart */}
            <p className={"mainText"}>Number of alerts per month </p>           
            <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={100}
            width={1500}
            height={500}
            >
            <VictoryAxis
            tickValues={[1, 2, 3, 4,5,6,7,8,9,10,11,12]}
            tickFormat={["Jan", "Feb", "Mar", "Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]}
            />
            <VictoryAxis
            dependentAxis
            tickFormat={[0, 5, 10,15,20,25,30]}
            />
            <VictoryBar
            style={{
                data: { fill: "#6200ea" }
            }}
            animate={{
                duration: 2000,
                onLoad: { duration: 1000 }
              }}
            data={
                [
                    {x: 1, y: months[0]},
                    {x: 2, y: months[1]},
                    {x: 3, y: months[2]},
                    {x: 4, y: months[3]},
                    {x: 5, y: months[4]},
                    {x: 6, y: months[5]},
                    {x: 7, y: months[6]},
                    {x: 8, y: months[7]},
                    {x: 9, y: months[8]},
                    {x: 10, y: months[9]},
                    {x: 11, y: months[10]},
                    {x: 12, y: months[11]}
                ]
            }
            x="x"
            y="y"
            />
            </VictoryChart>
        </div>
    <p className={"mainText"}>Frequency of triggers </p>
    <div className="mainImg"> {/*The code to make the pie chart */}
        <VictoryPie 
            colorScale={["#6200ea", "#4400a3", "#8133ee"]}
            data={[
            { x: "TSC: "+ String(frequency[0]) , y: frequency[0] },
            { x: "LC: "+ String(frequency[1]), y: frequency[1] },
            { x: "DRC: "+ String(frequency[2]), y: frequency[2] }
            ]}
            width={1000} //for some reasons bigger width makes it smaller and vice versa???
        />
      </div>
    </div>
    );
  }
}

//export the class 
export default DataVisual;

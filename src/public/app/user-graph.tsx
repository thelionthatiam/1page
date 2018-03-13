import TextForm from './text-form-item';
import * as React from 'react';

let mockMonth = [
  {
    snooze:1,
    wake:true
  },
  {
    snooze:4,
    wake:false
  },
  {
    snooze:0,
    wake:false
  },
  {
    snooze:2,
    wake:false
  },
  {
    snooze:1,
    wake:true
  },
  {
    snooze:0,
    wake:false
  },
  {
    snooze:5,
    wake:false
  },
  {
    snooze:1,
    wake:false
  },
  {
    snooze:1,
    wake:true
  },
  {
    snooze:0,
    wake:true
  },
  {
    snooze:0,
    wake:true
  },
  {
    snooze:0,
    wake:true
  },
]

class GraphWrapper extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      max:0,
      snoozeSubTotal:0,
      dismissSubTotal:0,
      wakeSubTotal:0,
      snoozeProportion:0,
      dismissProportion:0,
      wakeProportion:0,
      topic:'payments',
      xAxis:'totals',
      yTitle:'COST',
      xTitle:'ACTION'
    }
    this.monthData = mockMonth
    this.snoozes = parseInt(props.snoozes);
    this.dismisses = parseInt(props.dismisses);
    this.wakes = parseInt(props.wakes);
    this.snoozePrice = parseFloat(props.snoozePrice);
    this.dismissPrice = parseFloat(props.dismissPrice);
    this.wakePrice = parseFloat(props.wakePrice);
    this.subTotalArr = [this.state.snoozeSubTotal, this.state.dismissSubTotal, this.state.wakeSubTotal]
    this.activitiesArr = [this.snoozes, this.dismisses, this.wakes]
    this.monthMax = this.setxAxis()

    this.handleClick = this.handleClick.bind(this)
  }


  setProportions() { // terible name
    if (this.state.topic === 'activities') {
      let activitiesArr = [this.snoozes, this.dismisses, this.wakes]
      let organized = activitiesArr.sort(function(a, b){return a - b});
      let max = organized[organized.length-1]
      this.setState({
        max:max,
        snoozeProportion:convertToProportion(this.snoozes, max),
        dismissProportion:convertToProportion(this.dismisses, max),
        wakeProportion:convertToProportion(this.wakes, max)
      })
    } else {
      let subtotalArr = [this.state.snoozeSubTotal, this.state.dismissSubTotal, this.state.wakeSubTotal]
      let organized = subtotalArr.sort(function(a, b){return a - b});
      let max = organized[organized.length-1]
      this.setState({
        max:max,
        snoozeProportion:convertToProportion(this.state.snoozeSubTotal, max),
        dismissProportion:convertToProportion(this.state.dismissSubTotal, max),
        wakeProportion:convertToProportion(this.state.wakeSubTotal, max)
      })
    }
  }

  scale = () => {
    let scale = {
      fifth: this.state.max,
      fourth: this.state.max*(4/5),
      third: (this.state.max/2),
      second: this.state.max*(2/5),
      first: 0
    }
    return scale;
  }

  setxAxis() {
    let d = new Date();
    let month = d.getMonth();
    let year = d.getYear();
    function daysInMonth (month, year) { // Use 1 for January, 2 for February, etc.
      return new Date(year, month + 1, 0).getDate();
    }
    let monthMax = daysInMonth(month, year)
    let dayArray = [];
    for (let i = 1; i <= monthMax; i++) {
      dayArray.push(i)
    }
    return dayArray
  }

  snoozeSubtotal() { this.setState({ snoozeSubTotal:this.snoozes * this.snoozePrice },
    function() {this.setProportions()}
  )}
  dismissSubtotal() { this.setState({ dismissSubTotal:this.dismisses * this.dismissPrice },
    function() {this.setProportions()}
  )}
  wakeSubtotal() { this.setState({ wakeSubTotal:this.wakes * this.wakePrice },
    function() {this.setProportions()}
  )}

  componentDidMount() {
    if (this.state.topic === 'payments') {
      this.snoozeSubtotal()
      this.dismissSubtotal()
      this.wakeSubtotal()
    }
  }

  handleClick(setting) {
    if (setting === 'payments') {
      this.setState({
        yTitle:'COST',
        xTitle:'ACTION',
        topic:'payments'
      }, function() {
        this.setProportions()
      })
    } else if (setting === 'activities') {
      this.setState({
        yTitle:'EVENTS',
        xTitle:'ACTION',
        topic:'activities'
      }, function() {
        this.setProportions()
      })
    } else if (setting === 'totals') {
      this.setState({
        xAxis:'totals'
      }, function() {
        this.setxAxis()
      })
    } else if (setting === 'time') {
      this.setState({
        xTitle:'DATE',
        xAxis:'time'
      }, function() {
        this.setxAxis()
      })
    }
  }

  render() {
    return (
      <div className = 'paymentInfoWrapper'>
        <div>
          <div className = 'graphWrapper'>
            <YAxisTitle yTitle = {this.state.yTitle}/>
            <YAxis
              topic = {this.state.topic}
              scale = {this.scale()}
              />
            <Graph
              snooze = {this.state.snoozeProportion}
              dismiss = {this.state.dismissProportion}
              wake = {this.state.wakeProportion}
              xAxis = {this.state.xAxis}
              monthMax = {this.monthMax}
              monthData = {this.monthData}
              />
          </div>
          <XAxis
            xAxis = {this.state.xAxis}
            monthMax = {this.monthMax}
            />
          <XAxisTitle xTitle = {this.state.xTitle}/>
          <button onClick = {() => this.handleClick('totals')}>totals</button>
          <button onClick = {() => this.handleClick('time')}>over time</button>
        </div>
        <UserData
          handleClick = {this.handleClick}
          snoozes = {this.props.snoozes}
          dismisses = {this.props.dismisses}
          wakes = {this.props.wakes}
          snoozePrice = {this.props.snoozePrice}
          dismissPrice = {this.props.dismissPrice}
          wakePrice = {this.props.wakePrice}
          snoozeSubtotal = {this.state.snoozeSubTotal}
          dismissSubtotal = {this.state.dismissSubTotal}
          wakeSubtotal = {this.state.wakeSubTotal}
          />
      </div>
    )
  }
}


function YAxisTitle(props) {
  return(
    <div className = 'y-title'>
      <p className = 'vert-text'>{props.yTitle}</p>
    </div>
  )
}
//
function YAxis(props) {
  let a, b, c, d, e;
  if (props.topic === 'payments') {
    a = '$' + props.scale.fifth
    b = '$' + props.scale.fourth
    c = '$' + props.scale.third
    d = '$' + props.scale.second
    e = '$' + props.scale.first
  } else if (props.topic === 'activities') {
    a = props.scale.fifth
    b = props.scale.fourth
    c = props.scale.third
    d = props.scale.second
    e = props.scale.first
  }
  return (
    <div className = 'y-axis'>
      <div><p>{a}</p></div>
      <div><p>{b}</p></div>
      <div><p>{c}</p></div>
      <div><p>{d}</p></div>
      <div><p>{e}</p></div>
    </div>
  )
}

function XAxisTitle(props) {
  return (
    <div className = 'x-axis'>
      <p>{props.xTitle}</p>
    </div>
  )
}

function XAxis(props) {
  if (props.xAxis === 'time') {
    return (
      <div className = 'x-axis'>
        {props.monthMax.map(function(date, index) {
          return <div key = {index}><p className = 'dates'>{date}</p></div>
        })}
      </div>
    )
  } else {
    return (
      <div className = 'x-axis'>
        <div><p>snoozes</p></div>
        <div><p>dismisses</p></div>
        <div><p>wakes</p></div>
      </div>
    )
  }
}


function Graph(props) {
  if (props.xAxis === 'time') {
    return (
      <div className = 'graph'>
        {props.monthMax.map(function(date, index) {
          let height = '1vh';
          let background = 'white'
          if (props.monthData[index] !== undefined) {
            height = props.monthData[index].snooze.toString() + 'vh';
            props.monthData[index].wake ? background = 'green' : background = 'red';
          }
          let genBarStyle = {
            height: height,
            transition:'600ms',
            border:'1px solid white',
            background:background
          }//
          return <div style = {genBarStyle} key = {index}></div>
        })}
      </div>
    )
  } else {
    let snoozeStyle = {
      height: props.snooze.toString() + '%',
      transition:'600ms',
    }
    let dismissStyle = {
      height: props.dismiss.toString() + '%',
      transition:'600ms',
    }
    let wakeStyle = {
      height: props.wake.toString() + '%',
      transition:'600ms',
    }
    return (
      <div className = "graph">
        <div style = {snoozeStyle}/>
        <div style = {dismissStyle}/>
        <div style = {wakeStyle}/>
      </div>
    )
  }
}

function UserData(props) {
  return(
    <div className = 'userDataSummary'>
      <h2>Summary</h2>
      <div className = 'titleButton'>
        <h4>Your prices</h4>
      </div>
      <p>snoozePrice: ${props.snoozePrice} </p>
      <p>dismissPrice: ${props.dismissPrice} </p>
      <p>wakePrice: ${props.wakePrice} </p>
      <button>change in settings</button> 
      <div className = 'titleButton'>
        <h4>Your activity</h4>
      </div>
      <p>snoozes: {props.snoozes} </p>
      <p>dismisses: {props.dismisses} </p>
      <p>wakes: {props.wakes} </p>
      <button onClick={() => props.handleClick('activities')}>activities</button> 
      <div className = 'titleButton'>
        <h4>Your payments</h4>
      </div>
      <p>snoozeSubTotal: ${props.snoozeSubtotal}</p>
      <p>dismissSubTotal: ${props.dismissSubtotal}</p>
      <p>wakeSubTotal: ${props.wakeSubtotal}</p>
      <button onClick = {() => props.handleClick('payments')}>payments</button>
      <h4>Total</h4>
      <p>total: ${props.snoozeSubtotal + props.dismissSubtotal + props.wakeSubtotal}</p>
    </div>
  )
}

// HELPER

function convertToProportion(number, max) {
  if (number !== 0) {
    return ((number/max)*100);
  } else {
    return 0;
  }
}

export default GraphWrapper;

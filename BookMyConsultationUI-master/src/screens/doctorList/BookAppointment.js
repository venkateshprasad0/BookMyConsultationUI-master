import { Component } from "react";
import { TextField, Card, Select } from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import TabContainer from "../../common/tabContainer/TabContainer";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";



import './doctor.css';
import { Router } from "react-router";


export default class BookAppointment extends Component {

  constructor() {
    super();
    this.state = {
      doctorId: "",
      doctorName: "",
      userId: "",
      userName: "",
      userEmailId: "",
      timeSlot: "",
      timeSlots: [],
      appointmentDate: "2021-11-28",
      symptoms: "",
      priorMedicalHistory: "NA",
      createdDate: "",
      doctorFName: "",
      doctorSName: "",
      selectedDate: "",
      baseUrl: "http://localhost:8080/"
    }
  }


  componentWillMount() {
    // console.log("location doctor id", this.props.match.params.doctorId);
    this.state.doctorId = this.props.match.params.doctorId;
    this.state.doctorFName = this.props.match.params.doctorFName;
    this.state.doctorSName = this.props.match.params.doctorSName;
    console.log("doctorId ", this.state.doctorId);
    console.log("doctor's First name", this.state.doctorFName);
    this.state.doctorName = this.state.doctorFName.concat(" ", this.state.doctorSName);
    console.log("Doctor Full Name ", this.state.doctorName);
    this.state.userId = sessionStorage.getItem("uuid");
    this.state.userEmailId = sessionStorage.getItem("uuid");
    this.state.userName = sessionStorage.getItem("First_Name");
    this.getTimeSlots();
  }

  tsBtnHandler = () =>{
    this.getTimeSlots();
  }

  bookAppointmentHandler = () => {

    let dataAppointment = JSON.stringify( {
      "doctorId" : this.state.doctorId,
      "doctorName" : this.state.doctorName,
      "userId" : this.state.userId,
      "userEmailId": this.state.userEmailId,
      "timeSlot" : this.state.timeSlot,
      "appointmentDate" : this.state.appointmentDate,
      "createdDate" : "",
      "symptoms" : this.state.symptoms,
      "priorMedicalHistory" : "NA"

    })

    

    let xhrBookAppointment = new XMLHttpRequest();
    let that = this;
    xhrBookAppointment.addEventListener("readystatechange",function() {
      if(this.readyState === 4) {
        alert("Booking confirmed");
      }
    })

        xhrBookAppointment.open("POST", this.state.baseUrl + "appointments/bookAppointment");
        xhrBookAppointment.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("access-token"));
        xhrBookAppointment.setRequestHeader("Content-Type", "application/json");
        xhrBookAppointment.setRequestHeader("Cache-Control", "no-cache");
        xhrBookAppointment.send(dataAppointment);

  }


  inputSymptomsChangeHandler = (e) => {
    this.setState({ symptoms: e.target.value });
  }

  inputAppointmentDateChangeHandler = (e) => {
    this.setState({ appointmentDate: e.target.value });
    
  }

  inputTimeSlotChangeHandler = (e) => {
    this.setState({ timeSlot: e.target.value });
    
  }

  handleChange = e => {
    
    this.setState({ timeSlot: e.target.value });
    console.log("selected timeslot ", this.state.timeSlot);

}

  getTimeSlots(){
    let dataTimeSlots = null;
    let xhrTimeSlots = new XMLHttpRequest();
    let that = this;
    xhrTimeSlots.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            that.setState({
                timeSlots: JSON.parse(this.responseText)['timeSlot']
            });
        }
    });

    xhrTimeSlots.open("GET", this.state.baseUrl + "doctors/" + encodeURI(this.state.doctorId) + "/timeSlots?date=" + encodeURI(this.state.appointmentDate));
    xhrTimeSlots.setRequestHeader("Cache-Control", "no-cache");
    xhrTimeSlots.send(dataTimeSlots);
    console.log("Time Slots of Doctor",this.state.timeSlots);

  }

  render() {
    return (
      <div>
        <Card className="card">
          <TabContainer>
            <h1> Book Appointment </h1>
            <h3> Doctor Name: {this.state.doctorName}</h3>
          

            <FormControl required>
              <InputLabel htmlFor="appointmentDate">Appointment Date</InputLabel>
              <Input id="input2" type="text" appointmentDate={this.state.appointmentDate} onChange={this.inputAppointmentDateChangeHandler} />
              <FormHelperText>
                <span className="red">required Format YYYY-MM-DD </span>
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="firstname">Visit Reason</InputLabel>
              <Input id="input" type="text" reason={this.state.symptoms} onChange={this.inputSymptomsChangeHandler} />
              <FormHelperText>
                <span className="red">required</span>
              </FormHelperText>
            </FormControl>

            <TabContainer>
            <Button variant="contained" color="default" onClick={this.tsBtnHandler}>
              Get TimeSlots
            </Button>
            <br/>
            <FormControl required>
             <h4>Select Time Slot</h4>
                <Select onClick={this.handleChange}>
                  {this.state.timeSlots.map( ts => (
                    <MenuItem key={ts} value={ts} onClick = { e => this.inputTimeSlotChangeHandler(e)}  > {ts} </MenuItem>
                  )

                  )

                  }
                </Select>
            </FormControl>
            </TabContainer>
            <TabContainer>
              <br/>
            <Button variant="contained" color="default" onClick={this.bookAppointmentHandler}>
              Book Appointment
            </Button>

            </TabContainer>
              <br/>
            <TabContainer>
            <Button className="homeBtn" variant="contained" color="default" onClick='/'>
              <Link className="homeBtn" to={`/`}>Home</Link>
            </Button>
            </TabContainer>

          </TabContainer>
        </Card>
      </div>
    )
  }
}
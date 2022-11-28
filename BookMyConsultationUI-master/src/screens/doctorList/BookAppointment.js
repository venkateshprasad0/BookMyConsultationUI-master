import { Component } from "react";
import { TextField, Card } from "@material-ui/core";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import TabContainer from "../../common/tabContainer/TabContainer";
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom";
import { Redirect } from 'react-router'


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
      appointmentDate: "",
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

  render() {
    return (
      <div>
        <Card className="card">
          <TabContainer>
            <h1> Book Appointment </h1>
            <h3> Doctor Name: {this.state.doctorName}</h3>
            <FormControl required>
              <InputLabel htmlFor="firstname">Visit Reason</InputLabel>
              <Input id="input" type="text" reason={this.state.symptoms} onChange={this.inputSymptomsChangeHandler} />
              <FormHelperText>
                <span className="red">required</span>
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="appointmentDate">Appointment Date</InputLabel>
              <Input id="input2" type="text" appointmentDate={this.state.appointmentDate} onChange={this.inputAppointmentDateChangeHandler} />
              <FormHelperText>
                <span className="red">required Format YYYY/MM/DD </span>
              </FormHelperText>
            </FormControl>

            <FormControl required>
              <InputLabel htmlFor="timeSlot"> Time Slot </InputLabel>
              <Input id="input3" type="text" timeSlot={this.state.timeSlot} onChange={this.inputTimeSlotChangeHandler} />
              <FormHelperText>
                <span className="red">required Format (ex. 01PM-02PM) </span>
              </FormHelperText>
            </FormControl>

            <TabContainer>

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
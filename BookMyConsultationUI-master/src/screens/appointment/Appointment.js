import { Component } from "react";
import Typography from "@material-ui/core/Typography";
import { Card, CardContent, Button } from "@material-ui/core"
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import './appointment.css'
import RateAppointment from "./RateAppointment";

class Appointment extends Component {

    constructor() {
        super();
        this.state = {
            appointments: [],
            userId: sessionStorage.getItem('uuid'),
            acessToken: sessionStorage.getItem("access-token"),
            rating:"",
            loggedIn: sessionStorage.getItem("access-token") == null ? false : true,
        }
    }
    componentWillMount() {
        if(this.state.loggedIn===true){
        this.getAppointments();
        }
    }


    getAppointments() {
        let dataAppointments = null;
        let xhrAppointments = new XMLHttpRequest();
        let that = this;
        xhrAppointments.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    appointments: JSON.parse(this.responseText)
                });
            }
        });

        xhrAppointments.open("GET", this.props.baseUrl + "users/" + encodeURI(this.state.userId) + "/appointments");
        xhrAppointments.setRequestHeader('Authorization', 'Bearer ' + this.state.acessToken);
        xhrAppointments.setRequestHeader("Cache-Control", "no-cache");
        xhrAppointments.send(dataAppointments);
        console.log(this.state.appointments);
    }


    render() {
        return (
            <div>
                {this.state.loggedIn === false &&
                     <span>
                        Login to see appointments
                    </span>
                }
                {this.state.appointments.map(appointment =>
                    <Card className="cards"
                        style={{
                            width: "100%",
                            margin: 10,

                        }}
                    >

                        <CardContent>
                            <Typography
                                style={{ fontSize: 14, textAlign: "left" }}


                            >
                                Doctor Name: {appointment.doctorName}
                            </Typography>

                            <Typography
                                style={{ fontSize: 14, textAlign: "left" }}


                            >
                                Date : {appointment.appointmentDate}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14, textAlign: "left" }}


                            >
                                symptoms : {appointment.symptoms}
                            </Typography>
                        </CardContent>

                        <CardActions>
                            <Button className = 'btn'  style={{ backgroundColor: "blue", width: "200px", color: "white" }} > Rate Appointment </Button>
                            <RateAppointment appointmentId = {appointment.appointmentId}
                                             doctorId = {appointment.doctorId}   
                                                ></RateAppointment>
                        </CardActions>
                    </Card>

                )}
            </div>
        )
    }
}

export default Appointment;
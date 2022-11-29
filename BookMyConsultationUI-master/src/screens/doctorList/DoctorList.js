import { Button } from "@material-ui/core";
import { InputLabel, MenuItem, Select, Card, CardContent} from "@material-ui/core"
import { Component } from "react";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import {Link} from "react-router-dom";
import './doctor.css';
import DoctorDetails from "./DoctorDetails";



class DocotrList extends Component {

    constructor() {
        super();
        this.state = {
            specialities: [],
            doctors: [],
            speciality: "",
            selectValue: "",
            rating:"",
            doctorName:"",
            modalIsOpen: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getDoctors = this.getDoctors.bind(this);
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
    }

    // specialitySelectHandler = event => {
    //     this.setState({ speciality: event.target.value });
    // }

    handleChange = e => {
        console.log("selected value ", this.state.selectValue);
        this.setState({ selectValue: e.target.value });

    }

    handleSubmit(event) {
        event.preventDefault();
        this.getDoctors();
        console.log("Doctors List.. ", this.state.doctors);
    }

    getDoctors() {
        let dataDoctors = null;
        let xhrDoctors = new XMLHttpRequest();
        let that = this;
        xhrDoctors.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                that.setState({
                    doctors: JSON.parse(this.responseText)
                });
            }
        });

        xhrDoctors.open("GET", this.props.baseUrl + "doctors?speciality=" + encodeURI(this.state.selectValue));
        xhrDoctors.setRequestHeader("Cache-Control", "no-cache");
        xhrDoctors.send(dataDoctors);
        console.log(this.state.doctors);
    }

    componentWillMount() {
        
        this.setState({
            selectValue: { value: 'CARDIOLOGIST' }
        })
        this.getDoctors();


    }

    render() {
        return (
            <div 
            >
                <form onSubmit={this.handleSubmit}>
                    <InputLabel id="demo-simple-select-label">Select Speciality</InputLabel>
                    <br></br>
                    <Select onChange={this.handleChange} value={this.state.selectValue} >
                        <MenuItem value={"CARDIOLOGIST"}>CARDIOLOGIST</MenuItem>
                        <MenuItem value={"GENERAL_PHYSICIAN"}>GENERAL_PHYSICIAN</MenuItem>
                        <MenuItem value={"DENTIST"}>DENTIST</MenuItem>
                        <MenuItem value={"PULMONOLOGIST"}>PULMONOLOGIST</MenuItem>
                        <MenuItem value={"ENT"}>ENT</MenuItem>
                        <MenuItem value={"GASTRO"}>GASTRO</MenuItem>
                    </Select>
                    <Button style={{margin:"10px", padding:"5px"}} className="SubmitBtn" variant="contained" onClick={this.handleSubmit}>Submit</Button>

                </form>
                {this.state.doctors.map(doctor =>
                    <Card className="cards"
                    style={{
                        width: "40%",
                        marginLeft: '25%' ,
                        alignItems: "center",
                        justifySelf: "center",
                        marginTop: '10px'
                      }}
                    >

                        <CardContent>
                            <Typography
                                style={{ fontSize: 14 }}
                                color="textSecondary"
                                
                            >
                                Doctor Name: {doctor.firstName} {doctor.lastName}
                            </Typography>

                            <Typography
                                style={{ fontSize: 14 }}
                                color="textSecondary"
    
                            >
                                Doctor Speciality : {doctor.speciality}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                                color="textSecondary"
    
                            >
                                Rating: <Rating name="read-only" value={doctor.rating} readOnly />
                            </Typography>
                        </CardContent>

                     <CardActions>
                            <Button className="btn" style={{margin:"10px", backgroundColor:"blue", width:"40%" }}>
                                 <Link className="lnk" to={`bookappointment/${doctor.id}/${doctor.firstName}/${doctor.lastName}`} > Book Appointment </Link></Button>
                            <DoctorDetails doctorId = {doctor.id} doctorFirstName= {doctor.firstName}
                                doctorLastName = {doctor.lastName} mobile = {doctor.mobile} email = {doctor.emailId}
                                speciality = {doctor.speciality} rating = {doctor.rating} ></DoctorDetails>
                     </CardActions>
                    </Card>
                
                ) }
            </div>
        )
    }

}

export default DocotrList;
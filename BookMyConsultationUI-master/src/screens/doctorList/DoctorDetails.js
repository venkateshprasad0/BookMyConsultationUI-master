import { Component } from "react";
import { TextField, Card, CardContent } from "@material-ui/core";

import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";

export default class DoctorDetails extends Component{

    constructor(){
        super();
        this.state = {
            doctorId : "",
            doctorFName : "",
            doctorSName : "",
            doctorMobile: "",
            doctorEmail : "",
            doctorSpeciality: "", 
            doctorRating: ""
        }
    }
    componentWillMount(){
      this.state.doctorId=this.props.match.params.doctorId;
      this.state.doctorFName = this.props.match.params.doctorFName;
      this.state.doctorSName = this.props.match.params.doctorSName;
      this.state.doctorMobile= this.props.match.params.doctorMobile;
      this.state.doctorEmail = this.props.match.params.doctorEmail;
      this.state.doctorSpeciality= this.props.match.params.doctorSpeciality;
      this.state.doctorRating= this.props.match.params.doctorRating;
    }

    render(){
        return (
            <div>
                <Card className="cards"
                    style={{
                        width: "100%",
                        margin: 10,
                        alignItems: "center",
                        justifySelf: "center"
                      }}
                    >

                        <CardContent>
                            <h1> Details</h1>
                            <Typography
                                style={{ fontSize: 14 }}
                               
                                
                            >
                                Doctor Name: {this.state.doctorFName} {this.state.doctorSName}
                            </Typography>

                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Doctor Email : {this.state.doctorEmail}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Doctor Mobile : {this.state.doctorMobile}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Doctor Speciality : {this.state.doctorSpeciality}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Rating: <Rating name="read-only" value={this.state.doctorRating} readOnly />
                            </Typography>
                        </CardContent>
                    </Card>
            </div>
        )
    }


}
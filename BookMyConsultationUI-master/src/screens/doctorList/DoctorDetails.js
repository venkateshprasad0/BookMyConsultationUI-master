import { Component } from "react";
import { TextField, Card, CardContent } from "@material-ui/core";
import {Link} from "react-router-dom";
import TabContainer from "../../common/tabContainer/TabContainer";
import Button from '@material-ui/core/Button';
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import Rating from "@material-ui/lab/Rating";
import Modal from 'react-modal';
import { Input, InputLabel } from "@material-ui/core";


const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

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
            doctorRating: "",
            modalIsOpen: false
        }
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }


    componentWillReceiveProps(props){
      this.state.doctorId=this.props.doctorId;
      this.state.doctorFName = this.props.doctorFirstName;
      this.state.doctorSName = this.props.doctorLastName;
      this.state.doctorMobile= this.props.mobile;
      this.state.doctorEmail = this.props.email;
      this.state.doctorSpeciality= this.props.speciality;
      this.state.doctorRating= this.props.rating;
    }

    render(){
        return (
            <div>
                <Button className="btn" onClick={this.openModalHandler} style={{margin:"10px", backgroundColor:"green", width:"270px", color:"white"}} > VIEW DETAILS </Button>

                
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Rating"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <div className="header"></div>
                            <h1> Details</h1>
                            <Typography
                                style={{ fontSize: 14 }}
                               
                                
                            >
                                Doctor Name: {this.props.doctorFirstName} {this.props.doctorLastName}
                            </Typography>

                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Doctor Email : {this.props.email}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Doctor Mobile : {this.props.mobile}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Doctor Speciality : {this.props.speciality}
                            </Typography>
                            <Typography
                                style={{ fontSize: 14 }}
                               
    
                            >
                                Rating: <Rating name="read-only" value={this.props.rating} readOnly />
                            </Typography>
    
            </Modal>
            </div>
        )
    }


}
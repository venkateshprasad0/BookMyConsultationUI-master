import { Component } from "react";
import Rating from "@material-ui/lab/Rating";
import Modal from 'react-modal';
import { Button, Input, InputLabel } from "@material-ui/core";

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



export default class RateAppointment extends Component {

    constructor() {
        super();
        this.state = {
            rating: "",
            appointmentId: "",
            baseUrl: "http://localhost:8080/",
            doctorId: "",
            modalIsOpen: false,
            comments: "NA"
        }
    }

    openModalHandler = () => {
        this.setState({ modalIsOpen: true });
    }

    closeModalHandler = () => {
        this.setState({ modalIsOpen: false });
    }

    componentWillMount() {
        this.setState({ appointmentId: this.props.appointmentId });
        this.setState({ doctorId: this.props.doctorId });
    }

    inputCommentsChangeHandler = (e) => {
        this.setState({ comments: e.target.value });
      }

    setValue = (rating) => {
        this.setState({ rating: rating });
        let dataRating = JSON.stringify({
            "appointmentId": this.state.appointmentId,
            "doctorId": this.state.doctorId,
            "rating": rating,
            "comments": this.state.comments
        })
        let xhrRating = new XMLHttpRequest();
        let that = this;
        xhrRating.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
                alert("Rating Submitted");
            }
        })

        xhrRating.open("POST", this.state.baseUrl + "ratings");
        xhrRating.setRequestHeader('Authorization', 'Bearer ' + sessionStorage.getItem("access-token"));
        xhrRating.setRequestHeader("Content-Type", "application/json");
        xhrRating.setRequestHeader("Cache-Control", "no-cache");
        xhrRating.send(dataRating);
    }

    render() {
        return (
            <div>
                <Button className = 'btn' onClick={this.openModalHandler} style={{ backgroundColor: "blue", width: "200px", color: "white" }} > Rate Appointment </Button>
                <Modal
                    ariaHideApp={false}
                    isOpen={this.state.modalIsOpen}
                    contentLabel="Rating"
                    onRequestClose={this.closeModalHandler}
                    style={customStyles}
                >
                    <h1>Rate Your Appointment</h1>

                    <InputLabel htmlFor="Comments">comments</InputLabel>
                    <Input type="text" comments={this.state.comments} onChange={this.inputCommentsChangeHandler} />
              

                    <Rating
                        name="simple-controlled"
                        value={this.state.rating}
                        onChange={(event, newValue) => {
                            this.setValue(newValue);
                        }}
                    />  
                </Modal>

            </div>
        )
    }

}
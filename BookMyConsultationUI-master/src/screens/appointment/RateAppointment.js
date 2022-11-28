import { Component } from "react";
import Rating from "@material-ui/lab/Rating";

export default class RateAppointment extends Component {

    constructor() {
        super();
        this.state = {
            rating: "",
            appointmentId: "",
            baseUrl: "http://localhost:8080/",
            doctorId:""
        }
    }

    componentWillMount() {
        this.setState({appointmentId:this.props.appointmentId});
        this.setState({doctorId: this.props.doctorId});
    }

    setValue = (rating) =>{
        this.setState({rating:rating});
        let dataRating = JSON.stringify({
            "appointmentId":this.state.appointmentId,
            "doctorId":this.state.doctorId,
            "rating": this.state.rating,
            "comments":"NA"
        })
        let xhrRating = new XMLHttpRequest();
        let that = this;
        xhrRating.addEventListener("readystatechange",function() {
            if(this.readyState === 4) {
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
                <Rating
                    name="simple-controlled"
                    value={this.state.rating}
                    onChange={(event, newValue) => {
                       this.setValue(newValue);
                    }}
                />
            </div>
        )
    }

}
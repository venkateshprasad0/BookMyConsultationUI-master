import React,{ Component } from "react";
import Header from "../../common/header/Header";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabContainer from "../../common/tabContainer/TabContainer";
import Doctors from  "../doctorList/DoctorList";
import Appointments from  "../appointment/Appointment";
import "../home/Home.css"

class Home extends Component{

    constructor(){
        super();
        this.state = {
            value:0
        }
    }

    tabChangeHandler = (event, value) => {
        this.setState({ value });
    }


    render(){
        return(
            <div>
                <Header baseUrl={this.props.baseUrl} />
                    <Tabs 
                        value={this.state.value}
                        onChange={this.tabChangeHandler}
                        indicatorColor="secondary"
                        textColor="inherit"
                        variant="fullWidth"
                    >
                        <Tab label="Doctors" ></Tab>
                        <Tab label="Appointments"></Tab>
                    </Tabs>

                    { this.state.value===0 && 
                       <TabContainer>
                            <Doctors baseUrl={this.props.baseUrl}></Doctors>
                       </TabContainer>
                    }
                    { this.state.value===1 && 
                        <TabContainer>
                            <Appointments baseUrl={this.props.baseUrl}></Appointments>
                        </TabContainer>
                    }
        </div>
        )
    }

}


export default Home;

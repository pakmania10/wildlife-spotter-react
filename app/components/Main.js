//include Main react dependencies
import React, { Component } from "react";
import GoogleMap from "./children/Google_Map";
import Form from "./children/Form";

var helpers = require("./utils/helpers");

export default class Main extends Component {
  constructor(props) {
  	super(props);
    this.state = { 
    	imagePreviewURL: "", 
    	imageLatitude: 0,
    	imageLongitude: 0,
    	imageDate: null,
    	imageHistory: []
    };
    this.setImage = this.setImage.bind(this);
    this.setLatitude = this.setLatitude.bind(this);
    this.setLongitude = this.setLongitude.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  	setImage(imageURL) {
		this.setState({
			imagePreviewURL: imageURL
		});
	}
	setLatitude(latitude) {
		this.setState({
			imageLatitude: latitude
		});
	}
	setLongitude(longitude) {
		this.setState({
			imageLongitude: longitude
		});
	}
	setDate(date) {
		this.setState({
			imageDate: date
		});
	}
	componentDidUpdate(prevProps, prevState) {
		//console.log("component updated");
		var coords = [this.state.imageLongitude, this.state.imageLatitude];
		console.log(coords);
		if(this.state.imageHistory === prevState.imageHistory) {
			helpers.postHistory("www.google.com", this.state.imageDate, coords).then(function() {
				console.log("info sent to server to update DB");
				helpers.getHistory().then(function(response) {
					//THIS GIVES US A RESPONSE AND ALLOWS US TO UPDATE THE STATE OF IMAGEHISTORY WITH THE FIRST OBJECT IN THE ARRAY
					console.log("Response: " + response.data);
						this.setState({ imageHistory: response.data });
				}.bind(this));	
			}.bind(this));
		}
	}
	componentDidMount() {
		console.log("main component mounted")
	}	
	render() {
		return(
			<div className="" style={{height: "100%"}}>
				<div className="" style={{height: "100%"}}>
					<div className="bear col-xs-12 col-md-8 col-lg-6">
						<h2 className="heading text-center">Spotimal</h2>
						<div className="header-text">
							<p className="header-text text-center"><span>You Spot Wildlife.</span></p>
							<br/>
							<p className="header-text text-center"><span>You Share Geotagged Images.</span> </p>
							<br/>
							<p className="header-text text-center">Others Can Spot the Wildlife.</p>						
						</div>
						<div className="bottom-header">
							<ul className="navigation text-center">
								<a href="#form"><li className="glyphicon glyphicon-plus-sign">Add a spotting</li></a>
								<a href="#map"><li className="glyphicon glyphicon-map-marker">View recent spottings</li></a>
							</ul>

						</div>
						 
					</div>
					<div>

					</div>
		
					<div id="form" style={{height: "100%"}}>
						{/*This will be the code we pass to the form Component*/}						
						<Form setImage={this.setImage} setLatitude={this.setLatitude} setLongitude={this.setLongitude}
						setDate={this.setDate}/>
					</div>
					<div style={{height: "100%"}}>
						<GoogleMap lat={this.state.imageLatitude} lng={this.state.imageLongitude} image={this.state.imagePreviewURL}
						history={this.state.imageHistory}/>
					</div>					
				</div>
			</div>
		);
	}
}

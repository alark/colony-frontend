import React from 'react';
import emailjs from 'emailjs-com';
import { useProfileProvider } from 'contexts/profile';
import { Redirect } from 'react-router-dom';

export default class extends React.Component {

  getFormattedDateTime() {
    var today = new Date();
    var month = (today.getMonth() + 1);               
    var day = today.getDate();
    if (month < 10) 
        month = "0" + month;
    if (day < 10) 
        day = "0" + day;
    var date = today.getFullYear()+'-'+month+'-'+day;

    var hours = today.getHours();
    var minutes = today.getMinutes();
    var seconds = today.getSeconds();
    if (hours < 10) 
        hours = "0" + hours;
    if (minutes < 10) 
      minutes = "0" + minutes;
    if (seconds < 10) 
      seconds = "0" + seconds;
    var time = hours + ":" + minutes;
    var dateTime = date + 'T' + time;
    return dateTime;
  }

  constructor(props) {
  super(props);
  this.state = { feedback: '', time: this.getFormattedDateTime(), name: 'Michael Jordan', email: 'AnimalColonyTest@gmail.com', redirect: false};
  this.handleEventChange = this.handleEventChange.bind(this);
  this.handleTimeChange = this.handleTimeChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  getName() {
    const {state: {name}} = useProfileProvider();
    console.log(name);
    return name;
  }

  setRedirect = () => {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/dashboard' />
    }
  }

  render() {
	return (
  	<form className="test-mailing">
      <script type="text/javascript"
          src="https://cdn.jsdelivr.net/npm/emailjs-com@2.3.2/dist/email.min.js"></script>
      <script type="text/javascript">
        (function(){
          emailjs.init("user_5s0yUz3ijdNCVlexZ3sEt")
        })();
        </script>
    	<h1>What event is coming up?</h1>
    	<div>
      	<textarea
        	id="event"
        	name="event"
        	onChange={this.handleEventChange}
        	placeholder="Write the details for your event here"
        	required
        	value={this.state.feedback}
        	style={{width: '100%', height: '50px'}}
      	/>
    	</div>
      <div>
        <input type="datetime-local" id="event-time"
         name="meeting-time" 
         value={this.state.time}
         min="2020-01-01T00:00" 
         max="2025-12-31T00:00"
         onChange={this.handleTimeChange}
         />
      </div>
      <input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
      <div>
        {this.renderRedirect()}
        <button onClick={this.setRedirect}>Home</button>
       </div>
    </form>
	)
  }

  handleEventChange(event) {
    this.setState({feedback: event.target.value})
  }

  handleTimeChange(time) {
    this.setState({time: time.target.value})
  }

  handleSubmit (event, time) {  
    const templateId = 'template_xsxfiru';
    this.sendFeedback(templateId, {timestamp: this.state.time, event_name: this.state.feedback, to_name: this.state.name, to_email: this.state.email});
    alert("Email has been sent!");

  }

  sendFeedback (templateId, variables) {
    var eventDate = new Date(this.state.time);
    var startDate = new Date();
    console.log('Sending Feedback...')
    setTimeout(() => { 
    window.emailjs.send(
      'service_kyfs3n6', templateId,
      variables
      ).then(res => {
        console.log('Email successfully sent!')
      })
      .catch(err => console.error('Oh well, you failed. Here some thoughts on the error that occured:', err)) }, eventDate.getTime() - startDate.getTime());
  }
}
// Import React
import React from "react";

// Import Custom CSS
import "./App.css";

// Import from react-router-dom
import { BrowserRouter as Router, 
	Route} from "react-router-dom";

// Import other React Component
import EditStudent from
	"./components/edit-student.component";
import StudentList from
	"./components/student-list";
import Main from "./components/main";


// App Component
const App = () => {
return (
	<Router>
	<div className="App">
		
		<Route path="/"
			exact component={Main } />	
		<Route path="/edit-student/:id"
			component={EditStudent } />
		<Route path="/student-list"
			component={StudentList } /> 
	</div>
	</Router>
);
};

export default App;

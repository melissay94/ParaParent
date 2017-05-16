// Renders a list of old jobs
const renderJobList = function() {
	if (this.state.data.length === 0) {
		return (
			<div className="jobList">
				<h3 className="emptyList">You have no requests</h3>
			</div>
		);
	}
	
	const jobNodes = this.state.data.map(function(job){
		return (
			<div key={job._id} className="job">
				<h3 className="service">{job.name}</h3>
			</div>
		);
	});
	
	return (
		<div className="jobList">
			{jobNodes}
		</div>
	);
};
// Return the responses from a reporter object.
// A reporterObject is a JavaScript object parsed from a reporter app, JSON export.
function getResponses(reporterObject) {
	var snapshotResponses = [];
	var snapshots = reporterObject.snapshots;
	
	// For each snapshot from the export
	for (var i = 0; i < snapshots.length; i++) {
		snapshotResponses.push(snapshots[i].responses);
		snapshotResponses[i].date = snapshots[i].date;
	};
	
	return snapshotResponses;
}

// Returns all answers to the userQuestionPrompt from the selected day
function getQuestionData(userQuestionPrompt) {
	var results = [];
	var currentResponses = responses[dataIndex];
	
	// For each response from the snapchats
	for (var iResponse = 0; iResponse < currentResponses.length; iResponse++) {
		var response = currentResponses[iResponse];
		
		// For each question answered during the report
		for (var iQuestion = 0; iQuestion < response.length; iQuestion++) {
			var question = response[iQuestion];
			
			// If the question matches the user's query
			if (question.questionPrompt == userQuestionPrompt) {
				var result = {};
				
				// Find the answer
				for (var property in question) {
					if (property != "questionPrompt") {
						result['value'] = question[property];
					}
				}
				
				// Attach the time to the answer
				result.date = response.date;
				results.push(result);
			}
		}
	};
	
	return results;
}
const fs = require('fs');
const fileContents = fs.readFileSync('./leads.json', 'utf8');

const data = JSON.parse(fileContents);
console.log(data);


//Process JSON data
function processJSONData (data) {
  var getLeadsData = data.leads;
  var getDuplicateValues = {};
  var getDuplicateEmails = {};
  var getDuplicateIds = {};
  var maxDate;
  

  //Get values depending on the identifier (_id/email)
  var getIdentifierSpecificValues = function (identifier) {
    	getDuplicateValues = {};
	    uniqueValues = getLeadsData.map(function(obj) { return obj[identifier]; });
	  	  
	    uniqueValues.forEach(function(elem,i) {
	      if (getDuplicateValues[elem] === undefined) {
	        getDuplicateValues[elem] = [i];			//store identifier and their respective indices
	      } else {
	        getDuplicateValues[elem].push(i);		//store identifier and their respective indices
	      }
	      

	      //store only those elements which are "repeated"
	      if (uniqueValues.length-1 === i) {
	        for (var ids in getDuplicateValues) {
	          if (getDuplicateValues[ids].length === 1 ) {
	            delete getDuplicateValues[ids];
	          }
	        }
	      }
	    });
    return getDuplicateValues;
};
  
  
  //Compare the dates, if dates are equal, take the date provided last in the list
  var filterWithIdentifier = function (getDuplicateValues) {
  for (var ids in getDuplicateValues) {
      var duplicateIndices = getDuplicateValues[ids];
      for (var i = 0; i < getDuplicateValues[ids].length; i++) {
        if (maxDate === undefined){
          maxDate = getLeadsData[duplicateIndices[i]].entryDate;
        } else if (getLeadsData[duplicateIndices[i]].entryDate > maxDate ||
                 getLeadsData[duplicateIndices[i]].entryDate === maxDate ) {

        	//replace the current maxDate with the updated entryDate
          maxDate = getLeadsData[duplicateIndices[i]].entryDate;
          delete getLeadsData[duplicateIndices[i-1]]; //remove the previous entry from the getleadsdata array
        
        
        } else if (getLeadsData[duplicateIndices[i]].entryDate < maxDate) {
        	//remove the current entry from the getleadsdata array
          delete getLeadsData[duplicateIndices[i]]; 
        }
    }
  
  }
    return getLeadsData;
    
}


  //1. Get duplicate IDs with their indices
  getDuplicateIds = getIdentifierSpecificValues('_id');
  console.log('Get a list of duplicate _ids and their respective indices/position where they occur:');
  console.log(getDuplicateIds);
 
  //2. Filter the duplicate values based on the latest date
  filterWithIdentifier(getDuplicateIds);
  
  //3. Remove null/empty entries
  getLeadsData = getLeadsData.filter(function (elem) {
      return elem !== null;
    });

  console.log('Get leads data without null entries and without "_id" duplicates:');
  console.log(getLeadsData);
  
  
  //4. Get duplicate Email Ids with their indices
  getDuplicateEmails = getIdentifierSpecificValues('email');
  console.log('Get a list of duplicate emails and their respective indices/position where they occur:');
 	console.log(getDuplicateEmails);
  
  //5. Filter the duplicate values based on the latest date
  filterWithIdentifier(getDuplicateEmails);
  
  //6. Remove null/empty entries
  getLeadsData = getLeadsData.filter(function (elem) {
      return elem !== null;
    });


  console.log('Get the Final leads data without null entries, without ID and Email duplicates:');
  console.log(getLeadsData);
};

processJSONData(data);

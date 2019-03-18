# deduplicate
De-duplicate a JSON set.


To clone the repository, run this in command in the console: git clone https://github.com/suparnac/deduplicate.git

Run in console: npm install

To see the working example, run in console: node src\de-duplicate.js

Functions used:

//1. getIdentifierSpecificValues('_id') returns a list of duplicate _ids and their respective indices/position where they occur;
 
//2. filterWithIdentifier(getDuplicateIds) filters out the duplicate values based on the latest date;
  
//3. getIdentifierSpecificValues('email') returns a list of duplicate emails and their respective indices/position where they occur;
  
//4. filterWithIdentifier(getDuplicateEmails) filters out the duplicate values based on the latest date;
  
//5. At the end "Gets the Final leads data without null entries, without ID and Email duplicates:';

Programming Challenge:

Take a variable number of identically structured json records and de-duplicate the set.



An example file of records is given in the accompanying 'leads.json'. Output should be same format, with dups reconciled 

according to the following rules:



1. The data from the newest date should be preferred

2. duplicate IDs count as dups. Duplicate emails count as dups. Duplicate values elsewhere do not count as dups.

3. If the dates are identical the data from the record provided last in the list should be preferred



Simplifying assumption: the program can do everything in memory (don't worry about large files)



The application should also provide a log of changes including some representation of the source record, the output record and the individual field changes 

(value from and value to) for each field.



Please implement as a command-line java program.

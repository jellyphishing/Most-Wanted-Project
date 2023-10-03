// PRO TIP: To quickly navigate to a function, right click on its name and select "Go to Definition"

function app(people) {
	//debugger;
	displayWelcome();
	runSearchAndMenu(people);
	return exitOrRestart(people);
}

function displayWelcome() {
	alert('Hello and welcome to the Most Wanted search application!');
}

function runSearchAndMenu(people) {
	const searchResults = searchPeopleDataSet(people);

	if (searchResults.length > 1) {
		displayPeople('Search Results', searchResults);
	} else if (searchResults.length === 1) {
		const person = searchResults[0];
		mainMenu(person, people);
	} else {
		alert('No one was found in the search.');
	}
}

function searchPeopleDataSet(people) {
	const searchTypeChoice = validatedPrompt(
		'Please enter in what type of search you would like to perform.',
		['id', 'name', 'trait'],
	);

	let results = [];
	switch (searchTypeChoice) {
		case 'id':
			results = searchById(people);
			break;
		case 'name':
			results = searchByName(people);
			break;
		case 'trait':					
			 results = searchByTraits(people);
			break;
		default:
			return searchPeopleDataSet(people);
	}

	return results;
}

function searchByTraits(people){
	const searchTraitsChoice = validatedPrompt(
		'Enter which trait to search by: gender, DOB, height, weight, eyecolor, or occupation',
		['gender', 'dob', 'height', 'weight', 'eyecolor', 'occupation'],
	);
	let results = [];
	switch (searchTraitsChoice){
		case 'gender':
			results = searchByGender(people);
			break;
		case 'DOB':
			results = searchByDOB(people);
			break;
		case 'height':
			results = searchByHeight(people);
			break;
		case 'weight':
			results = searchByWeight(people);
			break;
		case 'eyecolor':
			results = searchByEyeColor(people);
			break;
		case 'occupation':
			results = searchByOccupation(people);
			break;
			}
			return results;
}

function searchByGender(people){
	const searchGenderChoice = prompt('Enter: male, female, or non-binary');
	const genderFilterResults = people.filter((person) => person.gender === searchGenderChoice);
	return genderFilterResults;
}
function searchByEyeColor(people){
	const searchEyeColorChoice = prompt('Choose one of the following: green, hazel, blue, black, or brown');
	const eyeColorFilterResults = people.filter((person) => person.eyeColor === searchEyeColorChoice);
	return eyeColorFilterResults;
}
function searchByOccupation(people){
	const searchOccupationChoice = prompt('Choose one of the following: programmer, assistant, landscaper, nurse, student, architect, doctor, or politician');
	const occupationFilterResults = people.filter((person) => person.occupation === searchOccupationChoice);
	return occupationFilterResults;
}
function searchByDOB(people){
	const searchDOB = prompt('Enter date of birth mm/dd/yyyy');
	const dobFilterResults = people.filter((person) => person.dob === searchDOB);
	return dobFilterResults;
}
function searchByHeight(people){
	const searchHeight = prompt('Enter the approximate height');
	const heightFilterResults = people.filter((person) => person.height === searchHeight);
	return heightFilterResults;
}
function searchByWeight(people){
	const searchWeight = prompt('Enter the approximate weight');
	const weightFilterResults = people.filter((person) => person.weight === searchWeight);
	return weightFilterResults;
}
function searchById(people) {
	const idToSearchForString = prompt('Please enter the id of the person you are searching for.');
	const idToSearchForInt = parseInt(idToSearchForString);
	const idFilterResults = people.filter((person) => person.id === idToSearchForInt);
	return idFilterResults;
}

function searchByName(people) {
	const firstNameToSearchFor = prompt(
		'Please enter the the first name of the person you are searching for.',
	);
	const lastNameToSearchFor = prompt(
		'Please enter the the last name of the person you are searching for.',
	);
	const fullNameSearchResults = people.filter(
		(person) =>
			person.firstName.toLowerCase() === firstNameToSearchFor.toLowerCase() &&
			person.lastName.toLowerCase() === lastNameToSearchFor.toLowerCase(),
	);
	return fullNameSearchResults;
}

function mainMenu(person, people) {
	const mainMenuUserActionChoice = validatedPrompt(
		`Person: ${person.firstName} ${person.lastName}\n\nDo you want to know their full information, family, or descendants?`,
		['info', 'family', 'descendants', 'quit'],
	);

	switch (mainMenuUserActionChoice) {
		case 'info':
			results =  displayPersonInfo(person);
			break;
		case 'family':
			let personFamily = findPersonFamily(person, people);
			//results =displayPeople('Family', personFamily);
			break;
		case 'descendants':
			let personDescendants = findPersonDescendants(person, people);
			results = displayPeople('Descendants', personDescendants);
			break;
		case 'quit':
			return;
		default:
			alert('Invalid input. Please try again.');
	}

	return mainMenu(person, people);
}

function displayPersonInfo(person){
	
	
	alert(`Id: ${person.id}\nFirst Name: ${person.firstName}\nLast Name: ${person.lastName}\nHeight: ${person.height}\nWeight: ${person.weight}\nEye Color: ${person.eyecolor}\nDOB: ${person.dob}\nOccupation: ${person.occupation}\nParents: ${person.parents}\nSpouse: ${person.currentSpouse}`);
	
	}

function findPersonFamily(foundPerson, people){
	let results;
	const spouseFilterResults = people.filter((person) => person.id === foundPerson.currentSpouse);
	const parentsFilterResults = people.filter((person) => foundPerson.parents.includes(person.id));
	const siblingsFilterResults = people.filter((person) => person.parents.includes(foundPerson.parents[0]));
	displayPeople(`Spouse`, spouseFilterResults);
	displayPeople(`Parents`, parentsFilterResults);
	displayPeople(`Siblings`, siblingsFilterResults);
	
	return results;
	}
	



function findPersonDescendants(person, people){
	let results;
	const  childrenFilterResults   =people.filter((el) => el.parents === person.id);
	const grandkidsFilterResults = people.filter((el) => el.parents === childrenFilterResults);
	alert(`Descendants: ${childrenFilterResults}\n${grandkidsFilterResults}`);
	
	return results;
}

function displayPeople(displayTitle, peopleToDisplay) {
	const formatedPeopleDisplayText = peopleToDisplay
		.map((person) => `${person.firstName} ${person.lastName}`)
		.join('\n');
	alert(`${displayTitle}\n\n${formatedPeopleDisplayText}`);
}
 
function validatedPrompt(message, acceptableAnswers) {
	acceptableAnswers = acceptableAnswers.map((aa) => aa.toLowerCase());

	const builtPromptWithAcceptableAnswers = `${message} \nAcceptable Answers: ${acceptableAnswers
		.map((aa) => `\n-> ${aa}`)
		.join('')}`;

	const userResponse = prompt(builtPromptWithAcceptableAnswers).toLowerCase();

	if (acceptableAnswers.includes(userResponse)) {
		return userResponse;
	} else {
		alert(
			`"${userResponse}" is not an acceptable response. The acceptable responses include:\n${acceptableAnswers
				.map((aa) => `\n-> ${aa}`)
				.join('')} \n\nPlease try again.`,
		);
		return validatedPrompt(message, acceptableAnswers);
	}
}

function exitOrRestart(people) {
	const userExitOrRestartChoice = validatedPrompt('Would you like to exit or restart?', [
		'exit',
		'restart',
	]);

	switch (userExitOrRestartChoice) {
		case 'exit':
			return;
		case 'restart':
			return app(people);
		default:
			alert('Invalid input. Please try again.');
			return exitOrRestart(people);
	}
}

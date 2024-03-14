// overview div
const overview = document.querySelector(".overview");
// GitHub username
const username = "crtang";
// list of repos
const listOfRepos = document.querySelector(".repo-list");
// repos info
const reposSection = document.querySelector(".repos");
// repos' data
const repoData = document.querySelector(".repo-data");

// async function to get info from GitHub profile
const getGithubInfo = async function () {
	const data = await fetch(`https://api.github.com/users/${username}`);
	const req = await data.json();
	
	userInfo(req);
};

getGithubInfo();

// get user's GitHub info
const userInfo = function (jsonData) {
	let newDiv = document.createElement("div");

	newDiv.classList.add("user-info");

	newDiv.innerHTML = `<figure>
      <img alt="user avatar" src=${jsonData.avatar_url} />
    </figure>
    <div>
      <p><strong>Name:</strong> ${jsonData.name}</p>
      <p><strong>Bio:</strong> ${jsonData.bio}</p>
      <p><strong>Location:</strong> ${jsonData.location}</p>
      <p><strong>Number of public repos:</strong> ${jsonData.public_repos}</p>
    </div>`;

    overview.append(newDiv);
    getRepos();
};

// get user's list of repos
const getRepos = async function () {
	const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
	const req = await data.json();

	displayRepoList(req);
};

// display list of repos
const displayRepoList = function (repos) {
	for (let repo of repos) {
		let li = document.createElement("li");
		li.innerHTML = `<h3>${repo.name}</h3>`;
		li.classList.add("repo");
		listOfRepos.append(li);
	}
};

// target specific repo when clicked
const repoList = listOfRepos.addEventListener("click", function (e) {
	if (e.target.matches("h3")) {
		let repoName = e.target.innerText;

		getRepoInfo(repoName);
	}
});

// get info about specific repo
const getRepoInfo = async function (repoName) {
	const repoData = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
	const repoInfo = await repoData.json();
	
	const fetchLanguages = await fetch(`https://api.github.com/repos/${username}/${repoName}/languages`);
	const languageData = await fetchLanguages.json();
	let languages = [];

	for (let key in languageData) {
		languages.push(key);
	}

	displayRepoInfo(repoInfo, languages);
};

// display info about specific repo
const displayRepoInfo = function (repoInfo, languages) {
	repoData.innerHTML = "";

	const repoInfoDiv = document.createElement("div");

	repoInfoDiv.innerHTML = `<h3>Name: ${repoInfo.name}</h3>
    	<p>Description: ${repoInfo.description}</p>
    	<p>Default Branch: ${repoInfo.default_branch}</p>
    	<p>Languages: ${languages.join(", ")}</p>
    	<a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;
    repoData.append(repoInfoDiv);

    repoData.classList.remove("hide");
    reposSection.classList.add("hide");
};

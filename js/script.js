// overview div
const overview = document.querySelector(".overview");
// github username
const username = "crtang";
// list of repos
const listOfRepos = document.querySelector(".repo-list");

// async function to get info from github profile
const getGithubInfo = async function () {
	const data = await fetch(`https://api.github.com/users/${username}`);
	const req = await data.json();
	
	userInfo(req);
};

getGithubInfo();

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

const getRepos = async function () {
	const data = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
	const req = await data.json();

	displayRepoInfo(req);
};

const displayRepoInfo = function (repos) {
	for (let repo of repos) {
		let li = document.createElement("li");
		li.innerHTML = `<h3>${repo.name}</h3>`;
		li.classList.add("repo");
		listOfRepos.append(li);
	}
}

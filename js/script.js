// overview div
const overview = document.querySelector(".overview");
// github username
const username = "crtang";

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
};

var uImage = document.getElementById('userAvatar');
var uName = document.getElementById('userName');
var uBio = document.getElementById('userBio');
var followersC = document.getElementById('followersCount');
var followingC = document.getElementById('followingCount');
var gitName = document.getElementById('userGit');
var uLocation = document.getElementById('userLoc');
var btn = document.getElementById('search_btn');
var myInput = document.getElementById('searchText');
var reposs = document.getElementById('myRepos');
var err = document.getElementById('container');
var t1 = document.getElementById('data1');
var t2 = document.getElementById('data2');
var t3 = document.getElementById('data3');

fetch(`https://api.github.com/users/natiqasgerov`).then(result => result.json())
    .then(response => MyFirstInfo(response));

btn.addEventListener('click',function (){
    fetch(`https://api.github.com/users/${myInput.value}`).then(result => result.json())
        .then(response => MyFirstInfo(response));
})

myInput.addEventListener('keypress',function (event){
    if (event.key === "Enter") {
        btn.click();
    }
});
async function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}


async function MyFirstInfo(response){
    if (response.message == 'Not Found'){
        ErrorPage();
        return;
    }
    reposs.classList.remove('hidden');
    uImage.classList.remove('hidden');
    uName.classList.remove('hidden');
    t1.classList.remove('hidden');
    t2.classList.remove('hidden');
    t3.classList.remove('hidden');
    uBio.classList.remove('hidden');
    err.classList.add('hidden');
    const container = document.querySelector('#myRepos');
    await removeAllChildNodes(container);
    uImage.src = response.avatar_url;
    uName.innerHTML = response.name;
    uBio.innerHTML = response.bio;
    followersC.innerHTML = response.followers;
    followingC.innerHTML = response.following;
    gitName.innerHTML = response.login;
    gitName.href = `https://github.com/${gitName.innerHTML}`;
    uLocation.innerHTML = response.location;
    if(response.location == null)
        uLocation.innerHTML = 'empty';
    await fetch(`${response.repos_url}`).then(result => result.json())
        .then(response => WriteRepos(response));
}

function ErrorPage(){
    uImage.src = "Images/def.png";
    err.classList.remove('hidden');
    reposs.classList.add('hidden');
    uImage.classList.add('hidden');
    uName.classList.add('hidden');
    uBio.classList.add('hidden');
    t1.classList.add('hidden');
    t2.classList.add('hidden');
    t3.classList.add('hidden');
}


async function WriteRepos(response){
    var parent = document.getElementById('myRepos');
    for (let j = 0; j < response.length; j++) {
        let firstDivTag = document.createElement('div');
        firstDivTag.classList.add('item');
        parent.appendChild(firstDivTag);
        for (let i = 0; i < 3;i++){
            let secondDivTag = document.createElement('div');
            secondDivTag.classList.add('itemIn');
            firstDivTag.appendChild(secondDivTag);
            if(i == 0){
                let imgTag = document.createElement('img');
                imgTag.classList.add('reposImg');
                imgTag.src = "Images/repository_icon.png";
                let aTag = document.createElement('a');
                aTag.href = `https://github.com/${response[j].owner.login}/${response[j].name}`;
                aTag.target = '_blank';
                let spanTag1 = document.createElement('span');
                spanTag1.innerHTML = `${response[j].owner.login}` + ' / ';
                let spanTag2 = document.createElement('span');
                spanTag2.innerHTML = `${response[j].name}`;
                spanTag2.classList.add('reposText');
                aTag.appendChild(spanTag1);
                aTag.appendChild(spanTag2);
                secondDivTag.appendChild(imgTag);
                secondDivTag.appendChild(aTag);
            }
            else if(i == 1){
                let pTag = document.createElement('p');
                if(response[j].description != null){
                    if (response[j].description.length > 50)
                        pTag.style.fontSize = '12px';
                }
                pTag.classList.add('reposAbout');
                pTag.innerHTML = `${response[j].description}`;
                secondDivTag.appendChild(pTag);
            }
            else{
                let imgTag1 = document.createElement('img');
                imgTag1.classList.add('reposIcons');
                imgTag1.src = "Images/star_icon.png";

                let pTag1 = document.createElement('p');
                pTag1.classList.add('reposIconsText');
                pTag1.innerHTML = `${response[j].stargazers_count}`;

                let imgTag2 = document.createElement('img');
                imgTag2.classList.add('reposIcons');
                imgTag2.classList.add('i1');
                imgTag2.src = "Images/branch_icon.png";

                let pTag2 = document.createElement('p');
                pTag2.classList.add('reposIconsText');
                pTag2.innerHTML = 1;

                secondDivTag.appendChild(imgTag1);
                secondDivTag.appendChild(pTag1);
                secondDivTag.appendChild(imgTag2);
                secondDivTag.appendChild(pTag2);

            }
        }

    }
}


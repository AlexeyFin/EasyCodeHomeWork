class UI {
    constructor() {
        this.profile = document.getElementById('profile');
        this.searchContainer = document.querySelector('.searchContainer');


    }

    //display profile
    showProfile(user) {
        this.profile.innerHTML = `
            <div class="card card-body mb-3">
                <div class="row">
                    <div class="col-md-3">
                        <img src="${user.avatar_url}" alt="" class="img-fluid mb-2">
                        <a href="${user.html_url}" target="_blank" class="btn btn-primary btn-block mb-4">View Profile</a>
                    </div>
                    <div class="col-md-9">
                        <div class="user-info-header mb-3">
                            <span class="badge badge-primary">Public Repos: ${user.public_repos}</span>
                            <span class="badge badge-secondary">Public Gists: ${user.public_gists}</span>
                            <span class="badge badge-success">Followers: ${user.followers}</span>
                            <span class="badge badge-info">Following: ${user.following}</span>
                        </div>
                        <ul class="list-group">
                            <li class="list-group-item">Company: ${user.company ? user.company : 'N/A'}</li>
                            <li class="list-group-item">Website/Blog: ${user.blog ? user.blog : 'N/A'}</li>
                            <li class="list-group-item">Location: ${user.location ? user.location : 'N/A'}</li>
                            <li class="list-group-item">Member Since: ${user.created_at}</li>
                        </ul>
                    </div>
                </div>
                </div>
                <h3 class="page-heading mb-3">Latest Repos</h3>
            <div id="repos"></div>
        `;
    }

    //display repos
    showRepos(repos) {
        let output = ``;

        repos.forEach(repo => {
            output += `
                <div class="card card-body mb-2">
                    <div class="row">
                        <div class="col-md-6">
                             <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                        </div>
                        <div class="col-md-6">
                            <span class="badge badge-primary">Stars: ${repo.stargazers_count}</span>
                            <span class="badge badge-secondary">Watchers: ${repo.watchers_count}</span>
                            <span class="badge badge-success">Forks: ${repo.forms_count}</span>
                        </div>
                    </div>
                </div>
            `
        });

        document.getElementById('repos').innerHTML = output;
    }

    //display alert message
    showAlert(message = '', className = 'alert alert-info') {
        //clear alert
        this.clearAlert();

        //create template

        let alert = `<div class="${className}">${message}</div>`;

        this.searchContainer.insertAdjacentHTML('afterbegin', alert);

        //hide alert
        setTimeout(() => this.clearAlert(), 2000);
    }

    // clear alert
    clearAlert() {
        const  currentAlert = document.querySelector('.alert');

        if (currentAlert) {
            currentAlert.remove();
        }
    }

    clearProfile() {
        this.profile.innerHTML = '';
    }

    showPreload() {
        this.profile.innerHTML = ` 
            <div class="preloader card-body text-center">
                <img src="img/preloader.gif" alt="">
            </div>
        `
    }
}
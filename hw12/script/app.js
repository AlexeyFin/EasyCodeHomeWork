//Init Github
const gitHub = new  Github();

//init UI

const ui = new UI();
// Init search input
const searchInput = document.getElementById('searchUser');

// Add event
searchInput.addEventListener('keyup', (e) => {
    //Get input text
    const userText = e.target.value;
    ui.showPreload();

    if (userText !== ''){
        //Make http request
        gitHub.getUser(userText)
            .then(user => {
                ui.clearProfile();

                if (user.message === 'Not Found'){
                    //show alert
                    ui.showAlert(`User: ${userText} not found`, 'alert alert-danger');
                    ui.clearProfile();

                } else {
                    //show profile
                    ui.showProfile(user);
                    ui.clearAlert()
                }

                return user
            })
            .then(user => gitHub.getRepos(user))
            .then(repos => {
                ui.showRepos(repos);
            })
            .catch(err => console.log(err));
    } else {
        //clear profile
        ui.clearProfile();
    }
});
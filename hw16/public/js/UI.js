// init user singleton


class UI {
    constructor() {
        this.login = document.querySelector('.login');
        this.authorized = document.querySelector('.authorized');
        this.roomsList = document.querySelector('.rooms-list');
        this.userList = document.querySelector('.users-list');
        this.messageContainer = document.querySelector('.message-container');
        this.navUserName = document.querySelector('.user-name');
        this.user = USER.getInstance();
    }

    showLogin() {

    }

    hideLogin() {
        this.login.style.display = 'none'
    }

    showAuthorized() {
        let iam = this.user.getUser();
        this.navUserName.innerText = `${iam.username}`;
        this.authorized.style.display = 'block'
    }

    hideAuthorized() {

    }

    generateRooms(rooms) {
        this.roomsList.innerHTML = '';
        rooms.forEach(room => {
            this.roomsList.insertAdjacentHTML("beforeend", UI.roomListTemplate(room))
        })
    }

    generateUsersInRoom(users) {
        this.userList.innerHTML ='';
        for (let user in users) {
            this.userList.insertAdjacentHTML("beforeend", UI.userListTemplate(user, users[user.id]))
        }
    }

    addMessage(info) {
        let className = this.getClass(info);
        this.messageContainer.insertAdjacentHTML("beforeend", UI.messageTemplate(info, className))
    }

    newUserJoin(name) {
        this.messageContainer.insertAdjacentHTML("beforeend", UI.newUserJoinTemplate(name))
    }

    getClass(data) {
        let iam = this.user.getUser();
        if (data.username === iam.username){
            return {
                target: 'from',
                bgColor: 'light-green accent-3'
            }
        } else {
            return {
                target: 'to',
                bgColor: 'light-blue accent-3'
            }
        }
    }

    static roomListTemplate(room) {
        return `
            <li><a href="#" class="waves-effect">${room}</a></li>
        `;
    }

    static userListTemplate(name, id) {
        return `
            <li class="collection-item" data-user-id="${id}">${name}</li>
        `;
    }

    static messageTemplate(msg, className) {
        return `
            <div class="message ${className.target} ">
                <div class="card ${className.bgColor}">
                    <div class="card-content white-text">
                        <p class="black-text">${msg.username} says:</p>
                        <h6>${msg.message}</h6>
                    </div>
                </div>
           </div>
        `;
    }

    static newUserJoinTemplate(name) {
        return `
            <div class="card teal lighten-2">
                
                    <div class="card-content white-text">
                        <p>New user: ${name} joined chat</p>
                    </div>
           </div>
        `;
    }




}
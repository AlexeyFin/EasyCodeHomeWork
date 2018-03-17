class Github {
    constructor() {
    this.client_id = "ba0353f58c5de783e08d";
    this.client_secret = "089c4b41a1bde0e915fcf1e9596a43d8576ab989";
    }

    //Get user by name
    getUser(name) {
        return new Promise((resolve, reject) => {
            fetch(`https://api.github.com/users/${name}?client_id=${this.client_id}&client_secret=${this.client_secret}`)
                .then(res => res.json())
                .then(user => resolve(user))
                .catch(err => reject(err))
        })
    }

    getRepos(user) {
        return new Promise((resolve, reject) => {
            if (!user.login) reject('User not found');

            fetch(`https://api.github.com/users/${user.login}/repos?per_page=${5}&sort=${'created: asc'}&client_id=${this.client_id}&client_secret=${this.client_secret}`)
                .then(res => res.json())
                .then(user => resolve(user))
                .catch(err => reject(err))
        })
    }
}
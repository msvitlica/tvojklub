import BaseService from './base-service';

class UserService extends BaseService {
    constructor(url, service) {
        super(url, service);
    }

    async fetchUserById(id) {
        try {
            let currentUser = await fetch(`${this.backendUrl}/user/${id}`);
            return await currentUser.json();
        } catch(err) {
            console.log(err);
        }
    }

    async editUser({ owner, name, _id }) {
        try {
            const userToEdit = await fetch(`${this.backendUrl}/user/${owner}`)
            let user = await fetch(`${this.backendUrl}/user/edit/${owner}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ...userToEdit, club: {clubName: name, clubId: _id }})
            });
            const response = await user.json();
            if(user.ok) {
                this.messageService.showSuccessMessage(response.msg);
            } else {
                this.messageService.showError(response.msg)
            }
        } catch (err) {
            console.log(err);
            this.messageService.showError(err.message);
        }
    }
}

export default UserService;
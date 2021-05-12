import BaseService from './base-service';

class UserService extends BaseService {
    constructor(url, service) {
        super(url, service);
    }

    async editUser({ owner, name, _id }) {
        try {
            let userToEdit = await fetch(`${this.backendUrl}/edit/${owner}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ ... userToEdit, club: {clubName: name, clubId: _id }})
            });
            const response = await userToEdit.json();
            if(userToEdit.ok) {
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
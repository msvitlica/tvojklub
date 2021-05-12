import BaseService from './base-service';

class ClubService extends BaseService {
    constructor(url, service) {
        super(url, service);
    }

    async fetchClub(id, abortController) {
        try {
            const clubRequest = await fetch(`${this.backendUrl}/${id}`, abortController);
            return await clubRequest.json();
        } catch (err) {
            console.log(err);
            this.messageService.showError(err.message);
        }
    }

    async addClub(club) {
        try {
            let postData = await fetch(`${this.backendUrl}/club`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({...club}),
            });
            const response = await postData.json();
            if(postData.ok) {
                this.messageService.showSuccessMessage(response.msg);
            } else {
                this.messageService.showError(response.msg)
            }
        } catch (err) {
            console.log(err);
        }
    }

    async editGroup(club) {
        try {
            let editedClub = await fetch(`${this.backendUrl}/club/edit/${club._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(club)
            });
            const response = await editedClub.json();
            if(editedClub.ok) {
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

export default ClubService;
import BaseService from "./base-service";

class MemeberService extends BaseService {
    constructor(url, service) {
        super(url, service);
    }

    async getAllMembers() {
        try {
            const res = await fetch(`${this.backendUrl}/members`);            
            const data = await res.json();
            return data.members;         
        } catch (err) {
            console.log(err);
        }
    }

    async getMemberById(id, abortController) {
        let requestedMember = await fetch(`${this.backendUrl}/members/edit/${id}`, abortController);
        return await requestedMember.json();
    }

    async postMember(newMember) {
        const postMember = await fetch(`${this.backendUrl}/members/newMember`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMember)
        });
        const response = await postMember.json();
        if(postMember.ok) {
            this.messageService.showSuccessMessage(response.msg);
        } else {
            this.messageService.showError(response.msg);
        }
    }

    async editMember(id, editedMember) {
        const postedMember = await fetch(`${this.backendUrl}/members/edit/${id}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(editedMember)
        });
        const response = await postedMember.json();
        if(postedMember.ok) {
            this.messageService.showSuccessMessage(response.msg);
        } else {
            this.messageService.showError(response.msg);
        }
    }

    async deleteMember(id) {
        try {
            const deleteRequest = await fetch(`${this.backendUrl}/members/${id}`, {
                method: 'DELETE',
            });
            const response = await deleteRequest.json();
            if(deleteRequest.ok) {
                this.messageService.showSuccessMessage(response.msg);
            } else {
                this.messageService.showError(response.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default MemeberService;
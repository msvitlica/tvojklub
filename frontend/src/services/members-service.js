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
}

export default MemeberService;
import BaseService from './base-service';

class GroupService extends BaseService {
    constructor(url, service) {
        super(url, service);
    }
    async getAllGroups(abortController) {
        try {
            const groupsRequest = await fetch(`${this.backendUrl}/groups`, abortController);
            return await groupsRequest.json();
        } catch (err) {
            console.log(err);
            this.messageService.showError(err.message);
        }
    }
    async deleteGroup(id) {
        try {
            const deleteRequest = await fetch(`${this.backendUrl}/groups/${id}`, {
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
    async getGroupById(id, abortController) { // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
        let requestGroup = await fetch(`${this.backendUrl}/groups/edit/${id}`, abortController);
        return await requestGroup.json();
    }
    async addGroup(groupName) {
        try {
            let postData = await fetch(`${this.backendUrl}/groups`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: groupName }),
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
    async editGroup(id, groupName) {
        try {
            let editedGroup = await fetch(`${this.backendUrl}/groups/` + id, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ _id: id, name: groupName })
            });
            const response = await editedGroup.json();
            if(editedGroup.ok) {
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
export default GroupService;
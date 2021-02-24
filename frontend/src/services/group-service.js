
import BaseService from './base-service';


class GroupService extends BaseService {
    constructor(url, message) {
        super(url, message);
    }

    async getAllGroups(abortController) {
        try {
            const groupsRequest = await fetch(`${this.backendUrl}/groups`, abortController);
            return await groupsRequest.json();
         
        } catch (err) {
            this.message.showError(err.msg)
        }
    }
    async deleteGroup(id) {
        try {
            const groupsRequest = await fetch(`${this.backendUrl}/groups/${id}`, {
                method: 'DELETE',
            });
            const data = await groupsRequest.json();
            if (groupsRequest.ok) {
                this.message.showSuccessMessage(data.msg);
            } else {
                this.message.showError(data.msg);
            }
        } catch (err) {
            this.message.showError(err.msg)
        }
    }
    async getGroupById(id, abortController) { // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
        let requestGroup = await fetch(`${this.backendUrl}/groups/edit/${id}`, abortController);
        return await requestGroup.json();
    }
    async addGroup(groupName) {
        try {
            let postedData = await fetch(`${this.backendUrl}/groups`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: groupName }),
            });
            const data = await postedData.json();
            if (postedData.ok) {
                this.message.showSuccessMessage(data.msg)
            }
            else {
                this.message.showError(data.msg)
            }

        } catch (err) {
           this.message.showSuccessMessage(err.msg)
        }
    }
    async editGroup(id, groupName) {
        try {
            let editedGroup = await fetch(`${this.backendUrl}/groups/` + id,
                {
                    method: 'PUT',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ _id: id, name: groupName })
                });
            let data = await editedGroup.json();
            if (editedGroup.ok) {
                this.message.showSuccessMessage(data.msg);
            } else {
                this.message.showError(data.msg);
            }
        } catch (err) {
            console.log(err);
            this.message.showError(err.msg);
        }
    }
}
export default GroupService;
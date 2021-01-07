class GroupService {
    constructor(url) {
        this.backendUrl = url;
    }
    async getAllGroups(abortController) {
        try {
            const groupsRequest = await fetch(`${this.backendUrl}/groups`, abortController);
            return await groupsRequest.json();
        } catch (err) {
            console.log(err);
        }
    }
    async deleteGroup(id) {
        try {
            const groupsRequest = await fetch(`${this.backendUrl}/groups/${id}`, {
                method: 'DELETE',
            });
            return await groupsRequest.json();
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
            let postedGroup = await fetch(`${this.backendUrl}/groups`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: groupName }),
            });
            return await postedGroup.json();
        } catch (err) {
            console.log(err);
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
                })
            return await editedGroup.json();
        } catch (err) {
            console.log(err);
        }
    }
}
export default GroupService;
class MemeberService {
    constructor(url) {
        this.backendUrl = url;
    }

    async getAllMembers() {
        try {
            const res = await fetch(`${this.backendUrl}/members`);
            const data = await res.json();
            return data.members;
        } catch (err) {
            
        }
    }

    async postMember(newMember) {
        const postMemeber = await fetch(`${this.backendUrl}/members/newMember`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMember)
        });
        return postMemeber;
    }
}

export default MemeberService;
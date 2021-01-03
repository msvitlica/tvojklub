import BaseService from './base-service';
const baseService = new BaseService('http://localhost:3001/members');

class MemeberService extends BaseService {
    constructor(url) {
        super(url)
        this.members = [];
    }

    async getAllMembers() {
        const res = await fetch(this.url);
        const data = await res.json();
        this.members = data.members;
        return Promise.resolve(this.members);
    }
}

export default new MemeberService('http://localhost:3001/members');
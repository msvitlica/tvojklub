
import BaseService from './base-service';

class MemeberService extends BaseService {
    constructor(url, message) {
        super(url, message);
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
        try{
      let postedMember = await fetch(`${this.backendUrl}/members/newMember`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newMember)
        });
        const responseData= await postedMember.json();
        if(postedMember.ok){
            this.message.showSuccessMessage(responseData.msg);
        }else{
            this.message.showError(responseData.msg);
        }
    } catch(err){
        this.message.showError(err.message);
    }
}
}

export default MemeberService;
import BaseService from "./base-service";

class ScheduleService extends BaseService {
    constructor(url, message) {
        super(url, message);
    }

    async getAllSchedule(abortController) {
        const scheduleRequest = await fetch(`${this.backendUrl}/schedule-management`, abortController);
        return await scheduleRequest.json();
    }
    async deleteSchedule(id) {
        const deletedSchedule = await fetch(`${this.backendUrl}/schedule-management/delete/${id}`, {
            method: 'DELETE'
        });
        const responseData = await deletedSchedule.json();
        if (deletedSchedule.ok) {
            this.message.showSuccessMessage(responseData.msg);
        } else {
            this.message.showError(responseData.msg);
        }
    }
    async getScheduleById(id, abortController) { // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
        let requestSchedule = await fetch(`${this.backendUrl}/schedule-management/edit/${id}`, abortController);
        return await requestSchedule.json();
    }
    async addSchedule(schedule) {
        try {
            const postedSchedule = await fetch(`${this.backendUrl}/schedule-management/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schedule })
            });
            const responseData = await postedSchedule.json();
            if (postedSchedule.ok) {
                return this.message.showSuccessMessage(responseData.msg);
            } else {
                return this.message.showError(responseData.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
    async editSchedule(schedule) {
        try {
            const editedSchedule = await fetch(`${this.backendUrl}/schedule-management/edit/${schedule._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schedule })
            });
            const responseData = await editedSchedule.json();
            if (editedSchedule.ok) {
                this.message.showSuccessMessage(responseData.msg);
            } else {
                this.messageS.showError(responseData.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default ScheduleService;
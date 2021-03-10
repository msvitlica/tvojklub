import BaseService from "./base-service";

class ScheduleServices extends BaseService {
    constructor(url, service) {
        super(url, service);
    }

    async getAllSchedule(abortController) {
        const scheduleRequest = await fetch(`${this.backendUrl}/schedule-management`, abortController);
        return await scheduleRequest.json();
    }
    async deleteSchedule(id) {
        const deleteSchedule = await fetch(`${this.backendUrl}/schedule-management/delete/${id}`, {
            method: 'DELETE'
        });
        const response = await deleteSchedule.json();
        if (deleteSchedule.ok) {
            this.messageService.showSuccessMessage(response.msg);
        } else {
            this.messageService.showError(response.msg);
        }
    }
    async getScheduleById(id, abortController) { // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
        let requestSchedule = await fetch(`${this.backendUrl}/schedule-management/edit/${id}`, abortController);
        return await requestSchedule.json();
    }
    async addSchedule(schedule) {
        try {
            const postScheduleReq = await fetch(`${this.backendUrl}/schedule-management/add`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ schedule })
            });
            const response = await postScheduleReq.json();
            if (postScheduleReq.ok) {
                this.messageService.showSuccessMessage(response.msg);
            } else {
                this.messageService.showError(response.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
    async editSchedule(schedule) {
        try {
            const putScheduleReq = await fetch(`${this.backendUrl}/schedule-management/edit/${schedule._id}`, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ schedule })
            });
            const response = await putScheduleReq.json();
            if (putScheduleReq.ok) {
                this.messageService.showSuccessMessage(response.msg);
            } else {
                this.messageService.showError(response.msg);
            }
        } catch (err) {
            console.log(err);
        }
    }
}

export default ScheduleServices;
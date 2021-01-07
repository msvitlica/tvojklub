class ScheduleServices {
    constructor(backendUrl){
        this.backendUrl = backendUrl;
    }

    async getAllSchedule(abortController) {
        const scheduleRequest = await fetch(`${this.backendUrl}/schedule-management`, abortController);
        return await scheduleRequest.json();
    }
    async deleteSchedule(id) {
        await fetch(`${this.backendUrl}/schedule-management/delete/${id}`,
        {
            method: 'DELETE'
        });
    }
    async getScheduleById(id, abortController){ // <= controller unsubscribe fetch request from React DOM tree and prevents updating unmounted component
        let requestSchedule = await fetch(`${this.backendUrl}/schedule-management/edit/${id}`, abortController);
        return await requestSchedule.json();
    }
}

export default ScheduleServices;
import BaseService from "./base-service";

class TrainingServices extends BaseService {
    constructor(url, service) {
        super(url, service)
    }

    async getAllTrainings(currentDate, abortController) {
        const trainingRequest = await fetch(`${this.backendUrl}/trainings/?date=${currentDate}`);
        const trainings = await trainingRequest.json();
        return trainings.trainings;
    }
}

export default TrainingServices;
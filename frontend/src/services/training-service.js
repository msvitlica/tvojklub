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
    async saveTraining(trainingObject){
        const saveTrainingRequest = await fetch(`${this.backendUrl}/trainings`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingObject)
        });
        return await saveTrainingRequest.json();
    }
    async editTraining(trainingObject){
        const editTrainingRequest = await fetch(`${this.backendUrl}/trainings`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(trainingObject)
        });
        return await editTrainingRequest.json();
    }
}

export default TrainingServices;
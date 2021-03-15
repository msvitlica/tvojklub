import BaseService from "./base-service";
import { dateFormat } from "../helpers/helpersMethods";

class TrainingServices extends BaseService {
    constructor(url, service) {
        super(url, service)
    }

    async getAllTrainings(currentDateInMs, abortController) {
        const date = new Date(dateFormat(new Date(currentDateInMs))).getTime();
        const trainingRequest = await fetch(`${this.backendUrl}/trainings/?date=${date}`);
        const trainings = await trainingRequest.json();
        return trainings.allTrainings;
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
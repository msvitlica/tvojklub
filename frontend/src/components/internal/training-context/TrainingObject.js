class TrainingObject {
    constructor(){
        this.term = null
        this.coach = null
        this.group = null
        this.membersInGroup = null
        this.recurranceDay = null
    }

    setTraining(trainingObj){
        this.term = trainingObj.term
        this.coach = trainingObj.coach
        this.group = trainingObj.group
        this.membersInGroup = trainingObj.membersInGroup
        this.recurranceDay = trainingObj.recurranceDay
    }
    getTraining(){
        return {
            term: this.term,
            coach: this.coach,
            group: this.group,
            membersInGroup: this.membersInGroup,
            recurranceDay: this.recurranceDay
        }
    }
}

export default TrainingObject;
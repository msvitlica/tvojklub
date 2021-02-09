export class MessageService {
    constructor(onShowMessage){
        this.onShowMessage = onShowMessage;
    }

    showSuccessMessage(message){
        this.onShowMessage(message, 'success');
    }

    showError(message){
        this.onShowMessage(message, 'error')
    }
}
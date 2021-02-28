class BaseService {
    constructor(url, messageService) {
        this.backendUrl = url;
        this.messageService = messageService;
    }
}

export default BaseService;
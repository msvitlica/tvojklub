class SnackbarService {
    showSuccess(msg){
        return { showSnackbar: true, msg, severity: 'success'}
    }

    showError(msg){
        return { showSnackbar: true, msg, severity: 'error'}
    }
}

export default SnackbarService;
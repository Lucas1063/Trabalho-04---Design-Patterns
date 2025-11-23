class Logger {
    constructor() {
        if (Logger.instance) {
            return Logger.instance; // Retorna a instância existente
        }
        this.logs = [];
        Logger.instance = this;
    }

    log(message) {
        const timestamp = new Date().toISOString();
        const formattedMsg = `[${timestamp}] ${message}`;
        console.log(formattedMsg);
        this.logs.push(formattedMsg);
    }
}

module.exports = Logger;
const logContainer = document.getElementById('log-container');

document.addEventListener('DOMContentLoaded', async () => {

    try {
        const configResponse = await fetch('./assets/data/log.json');
        if (!configResponse.ok) throw new Error ('Config load failed');
        const jsonData = await configResponse.json();

        const activityLogs = jsonData.logs;
        console.log(activityLogs);

        const latestLogs = activityLogs.slice(0, 4);

        latestLogs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logContainer.appendChild(logItem);

            log.children.forEach(child => {
                const childEl = document.createElement(child.tag);
                if (child.class) childEl.className = child.class;
                if (child.text) childEl.textContent = child.text;
                if (child.datetime) childEl.datetime = child.datetime;
                logItem.appendChild(childEl);
            });
        });
            
        } catch(e){
            console.error(e)

            const errorBox = document.createElement('div');
            errorBox.className = 'error-box';
            errorBox.textContent = 'データの読み込みに失敗しました。後でもう一度お試しください。';

            document.body.appendChild(errorBox);

        }
});
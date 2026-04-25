document.addEventListener('DOMContentLoaded', () => {
    const logContainer = document.getElementById('log-container');

    if (logContainer) {
        //外部のJSONファイルを読みに行く
        fetch('./assets/data/log.json')
            .then(response => response.json())
            .then(activityLogs => {

                // latestLogsを切り出す
                const latestLogs = activityLogs.slice(0, 4);

                // 最初の[0 ~ 4]を切り出す
                latestLogs.forEach(log => {

                    // divにデータを放り込む
                    const logItem = document.createElement('div');

                    // データの送り先は <div class="log-item">
                    logItem.className = 'log-item';
                    logItem.innerHTML = `
                        <span class="log-date">${log.date}</span>
                        <span class="log-type type-feat type-fix type-work type-sys${log.type}">${log.type}</span>
                        <span class="log-msg">${log.msg}</span>
                    `;
                    logContainer.appendChild(logItem);
                });
            })
            .catch(error => console.log("ログが読めませんでした", error));
    }
});
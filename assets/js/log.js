document.addEventListener('DOMContentLoaded', () => {

    const activityLogs = [

        {
            date: "2026.03.24",
            type: "feat",
            msg: "画像を圧縮し再アップロードした"
        },

        {
            date: "2026.03.23",
            type: "feat",
            msg: "ABOUTセクションのスキル構成をアップデート"
        },

        {
            date: "2026.03.20",
            type: "fix",
            msg: "コンタクトフォームのバリデーションを修正"
        },

        {
            date: "2026.03.15",
            type: "work",
            msg: "新作MV『グッバイ宣言』をWORKSに追加"
        },

        {
            date: "2026.02.26",
            type: "sys",
            msg: "公式サイトをNext.jsへ移行開始"
        }

    ];

    // ここを小文字の logContainer で統一
    const logContainer = document.getElementById('log-container');

    if (logContainer) {
        activityLogs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.className = 'log-item';
            logItem.innerHTML = `
                <span class="log-date">${log.date}</span>
                <span class="log-type type-${log.type}">${log.type}</span>
                <span class="log-msg">${log.msg}</span>
            `;
            logContainer.appendChild(logItem);
        });
    }
});
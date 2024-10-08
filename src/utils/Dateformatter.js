Date.prototype.getNowTime = (format) => {
    let nowTime = new Date();
    let year = nowTime.getFullYear().toString();
    let month = (nowTime.getMonth() + 1).toString().padStart(2, "0");
    let date = nowTime.getDate().toString().padStart(2, "0");
    let hours = nowTime.getHours().toString().padStart(2, "0");
    let minutes = nowTime.getMinutes().toString().padStart(2, "0");
    let seconds = nowTime.getSeconds().toString().padStart(2, "0");

    // 형식에 따라 시간 포맷을 설정
    let formattedDate = format
        .replace("YYYY", year)
        .replace("MM", month)
        .replace("DD", date)
        .replace("HH", hours)
        .replace("mm", minutes)
        .replace("ss", seconds);

    return formattedDate;
}
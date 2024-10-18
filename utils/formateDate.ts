const  formatBigIntToDate = (bigIntTimestamp: bigint): string => {
    // 将 BigInt 转换为 number
    const timestamp: number = Number(bigIntTimestamp);

    // 创建日期对象
    const date = new Date(timestamp * 1000); // * 1000 转换为毫秒

    // 提取年份、月份和天数
    const year: string = String(date.getFullYear()); // 取后两位
    const month: string = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
    const day: string = String(date.getDate()).padStart(2, '0');

    // 提取小时和分钟
    const hours: string = String(date.getHours()).padStart(2, '0');
    const minutes: string = String(date.getMinutes()).padStart(2, '0');

    // 格式化输出
    return `${year}-${month}-${day} ${hours}:${minutes}`;
}
export {
    formatBigIntToDate
}
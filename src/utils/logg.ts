function log(logT: string, info: any) {
    const time = new Date().toLocaleString();
    //console根据logT打印对应类型的信息
    console.log(`${time} ${logT} ${info}`);
}

export { log }
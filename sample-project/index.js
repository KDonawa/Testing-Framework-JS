module.exports = {
    forEach(arr, func){
        for (const item of arr) {
            func(item);
        }
    },
};